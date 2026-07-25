---
title: "Las 3 preguntas que todos mezclan: cookies, JWT y bearer tokens"
description: "Cookies vs JWT no es una decisión, son tres preguntas independientes: qué te dan, dónde lo guardas y cómo lo transmites. El mapa completo de ataques, mitigaciones, rendimiento y los patrones reales que se usan en producción."
pubDate: 2026-07-25
tags: ["auth", "seguridad", "jwt", "cookies", "webdev"]
---

"¿Cookies o JWT?" Es como preguntar: ¿mochila o pasaporte? No compiten. Nunca compitieron. Son respuestas a preguntas distintas, y mezclarlas es por lo que este tema se siente imposible de entender.

## Por qué confunde

HTTP no recuerda nada. Cada request es un desconocido tocando la puerta. Así que hace falta darle al usuario algo que lleve encima para probar quién es. Y ahí es donde casi todo el mundo lo explica mal, porque presenta como **una sola decisión** lo que en realidad son **tres**, y cada una tiene sus propias consecuencias de seguridad y rendimiento.

## Las 3 preguntas

Imagina un parque de diversiones. Pagaste la entrada. Ahora:

1. **¿Qué te dan?** ¿Un número, o una credencial con tus datos escritos?
2. **¿Dónde lo guardas?** ¿Una pulsera pegada al brazo, o un ticket suelto en el bolsillo?
3. **¿Cómo lo muestras?** ¿Se ve solo al pasar, o lo sacas tú?

Tres preguntas. Tres respuestas. Independientes entre sí: puedes combinar cualquier respuesta de una con cualquier respuesta de otra. El resto del artículo es desarrollar cada una, con sus implicancias reales en producción.

## Pregunta 1: ¿qué te dan?

Hay dos arquitecturas posibles, y determinan cómo tu servidor valida cada request.

### Opción A: sesión con estado (session ID)

El servidor guarda un registro de la sesión, en memoria, en una base de datos o en Redis. Al usuario solo le entrega una referencia: "ticket #4471". El número no dice nada por sí solo, así que en cada request el servidor tiene que buscar el 4471 en su libreta para saber quién eres.

```
1. Login       → servidor crea el registro de sesión y guarda un ID
2. Cada request → cliente envía el ID → servidor busca la sesión → responde
```

Esa búsqueda es el costo: cada request autenticado implica una consulta a donde sea que vivan las sesiones. A cambio, revocar es trivial.

### Opción B: token sin estado (JWT)

El servidor no guarda nada. En vez de una referencia, te entrega una credencial ya escrita: "Ana · VIP · vence 18:00", con un sello anti-falsificación. Se explica sola. Esto es un **JSON Web Token**: tus datos ("claims") van dentro, firmados criptográficamente.

```
1. Login       → servidor firma un token con tus datos y te lo entrega
2. Cada request → cliente envía el token → servidor verifica la firma y lee los datos directo
```

Nada de lookup: verificar una firma es una operación de CPU, no una consulta a una base de datos. Es la razón por la que los JWT escalan bien. El costo se paga en otro lado: el token crece con cada dato que le agregues, y viaja completo en cada request.

```
Session ID → a3f9d2e1b7c4     (opaco, no dice nada por sí solo)
JWT        → eyJhbGci...       (auto-descriptivo y firmado, más pesado)
```

### La revocación es la consecuencia real

Esta elección decide algo enorme: ¿puedes cerrar una sesión al instante?

- Con un **session ID**, borras la línea de la libreta y listo, fuera. Inmediato.
- Con un **JWT**, el ticket ya está impreso. Vale hasta que expire, no lo puedes "desimprimir".

Hay tres formas de mitigar esto último, ninguna gratis:

- **Expiración corta** (5 a 15 minutos): limita la ventana de daño, pero no da revocación instantánea real.
- **Lista negra de tokens revocados**: en la práctica te devuelve la libreta que el JWT prometía evitar, porque vuelves a necesitar una consulta por request.
- **Rotación de refresh tokens**: cada vez que usas un refresh token para pedir uno nuevo, el anterior se invalida. Si alguien reutiliza uno ya rotado, es señal de robo y puedes cortar toda la cadena.

### Un JWT no está cifrado, está firmado

Vale la pena adelantar algo que retomamos más abajo: firmado no es lo mismo que cifrado. Si de verdad necesitas ocultar el contenido de un token (no solo garantizar que nadie lo falsifique), la respuesta no es "confía en que nadie lo va a leer": es usar **JWE** (JSON Web Encryption) en vez de un JWT firmado normal (JWS). Son estándares distintos dentro de la misma familia.

## Pregunta 2: ¿dónde lo guardas?

Una cookie es como la pulsera pegada al brazo: la pone el servidor, y puede llevar el atributo `HttpOnly`. `localStorage` (o `sessionStorage`) es el ticket suelto en el bolsillo: cualquier script que corra en tu página lo puede sacar y leer, sin excepción.

| | Cookie | localStorage |
|---|---|---|
| Se envía sola en cada request | Sí | No |
| JavaScript la puede leer | Solo si no tiene `HttpOnly` | Siempre |
| Tamaño aproximado | ~4 KB | ~5-10 MB |

Aquí es donde la confusión suele aparecer, porque cualquiera de las dos respuestas de la pregunta 1 puede guardarse en cualquiera de estos dos lugares. Un JWT cabe perfecto en una cookie, y un session ID cabe perfecto en `localStorage`. La elección de almacenamiento no depende de qué tipo de credencial es, depende de qué garantías de seguridad necesitas.

## Pregunta 3: ¿cómo lo transmites?

El header `Cookie` es la pulsera que se ve sola: el navegador la adjunta en cada request al dominio correspondiente sin que tu código haga nada.

```
Servidor  → Set-Cookie: auth=xxx
Navegador → Cookie: auth=xxx     ← automático, siempre
```

El header `Authorization` es el ticket que tú mismo sacas del bolsillo: tu código lo escribe a mano en cada llamada.

```js
fetch('/api/perfil', {
  headers: { Authorization: `Bearer ${token}` },
});
```

Casi siempre las preguntas 2 y 3 van juntas: si guardas en cookie, normalmente viaja como cookie. Pero son separables, y cuando se separan sin querer aparecen los bugs raros de auth que cuestan una tarde entera de debugging.

## El mapa de ataques

Cada vulnerabilidad conocida en este espacio depende de una sola de las tres preguntas, no de las tres a la vez.

### XSS depende de dónde lo guardas (pregunta 2)

Con `localStorage`, un script inyectado te roba el ticket del bolsillo sin esfuerzo: una sola línea de JavaScript malicioso y el atacante tiene tu credencial completa. Con una cookie `HttpOnly`, ese mismo script no puede leerla directamente.

Pero ojo: ninguna ubicación de almacenamiento te protege completamente de un XSS bien ejecutado (más sobre esto en el mito 1, abajo). Las mitigaciones reales atacan la causa, no el síntoma:

- Sanitizar cualquier entrada de usuario antes de renderizarla.
- Content Security Policy (CSP) para restringir qué scripts puede ejecutar tu página.
- Evitar `innerHTML` / `dangerouslySetInnerHTML` con contenido no controlado.

### CSRF depende de cómo lo transmites (pregunta 3)

Una cookie se envía sola, también cuando un sitio malicioso provoca el request desde otra pestaña: por defecto, el navegador no distingue si el request "legítimo" lo disparó tu app o un `<img>` escondido en una página ajena. Un header `Authorization` no lo adjunta nadie por ti: ningún atacante externo puede leer tu `localStorage` desde su propio dominio para forzarlo, así que este vector queda cerrado por diseño.

Mitigaciones para cookies:

- `SameSite=Lax` (el default en navegadores modernos): bloquea que requests cross-site tipo POST lleven la cookie, y alcanza para la mayoría de aplicaciones.
- `SameSite=Strict`: protección más fuerte, pero rompe flujos legítimos, como llegar desde un link externo (un correo, por ejemplo) ya autenticado.
- Tokens CSRF explícitos: una capa extra de defensa en profundidad, útil cuando `SameSite` solo no te da suficiente margen.

### La revocación depende de qué te dan (pregunta 1)

Ya lo vimos arriba: session ID es instantáneo, JWT necesita expiración corta, lista negra o rotación de refresh tokens.

## Dos mitos que conviene matar

**Mito 1: "`HttpOnly` te salva del XSS".** Falso. `HttpOnly` evita que un script **robe** la cookie leyéndola, pero un script inyectado en tu página puede seguir **usándola**, porque cualquier request que ese script dispare desde tu propio navegador la lleva pegada automáticamente. No te quitan la pulsera: te arrastran por los tornos con ella puesta. Esto se conoce como *session riding*, y es la razón por la que ninguna ubicación de almacenamiento reemplaza a sanitizar tu input.

**Mito 2: "El JWT está cifrado".** Falso. Un JWT está **firmado**, no cifrado. El payload va en base64, así que cualquiera lo copia en jwt.io y lo lee sin esfuerzo. Firmado significa que nadie lo puede falsificar; no significa que nadie lo pueda leer. Si necesitas esconder el contenido, la herramienta correcta es JWE, no "confiar" en que nadie va a mirar.

## Los 4 patrones reales

En producción, casi todo se reduce a una de estas cuatro combinaciones.

1. **Sesión clásica.** Session ID + cookie `HttpOnly`. El patrón de Django, Rails o PHP: simple, revocación instantánea, el default sano para la mayoría de apps con servidor. La contrapartida aparece cuando escalas horizontalmente: todos tus servidores necesitan ver el mismo almacén de sesiones (Redis, típicamente), porque si el usuario cae en otra instancia y esta no conoce su sesión, lo deslogueas por accidente.
2. **JWT en cookie `HttpOnly`.** El patrón moderno más común: escala horizontalmente sin estado compartido entre servidores, porque cualquier instancia puede verificar la firma sin consultar a nadie más. Conviene sumarle `SameSite=Lax` para cerrar el hueco de CSRF. El problema de la revocación sigue ahí, sin importar cuántos servidores tengas.
3. **Access + refresh token.** Lo mejor de los dos mundos: un access token corto (5-15 minutos) que viaja stateless y no pide lookup, más un refresh token largo guardado en cookie `HttpOnly` que sí es revocable en el servidor. Es más código y más piezas móviles, pero es el patrón que usan la mayoría de plataformas grandes porque separa rendimiento de capacidad de revocar.
4. **`localStorage` + header `Authorization`.** Habitual en SPAs puras y en integraciones donde no hay navegador de por medio. Cero CSRF, pero totalmente expuesto a robo por XSS. Solo tiene sentido si controlas bien las fuentes de scripts que corren en tu página y aceptas ese riesgo de forma consciente, no por default.

## Cómo decidir

Si tienes que elegir rápido, estas tres preguntas en orden de prioridad suelen bastar:

- **¿Necesitas poder revocar acceso al instante?** Ve con sesión clásica o con el patrón access + refresh. Un JWT plano sin infraestructura extra no te lo da.
- **¿Necesitas escalar horizontalmente sin compartir estado entre servidores?** Un JWT (en cookie o en header, según si hay navegador) te lo resuelve sin Redis de por medio.
- **¿No estás seguro?** El default razonable para la mayoría de apps web es cookie `HttpOnly` + `Secure` + `SameSite=Lax`, sea que adentro pongas un session ID o un JWT. Te protege de robo por XSS y de CSRF con la mínima complejidad posible, y puedes decidir stateful vs stateless después, como un detalle de implementación.

## El verdadera pregunta

La pregunta correcta nunca fue "¿cuál es más seguro?". Es: **¿hay un navegador de por medio?**

- **Si hay navegador**, usa cookie `HttpOnly` + `Secure` + `SameSite=Lax`. Adentro puedes poner lo que quieras: un session ID o un JWT, ya es un detalle de implementación.
- **Si no hay navegador** (una app móvil, un CLI, una llamada servidor a servidor), usa el header `Authorization`. Ahí no existe el XSS de un DOM ni un navegador que adjunte cookies por ti.

Todo lo demás, `HttpOnly`, `SameSite`, session ID vs JWT, revocación, es responder bien esas tres preguntas por separado, no elegir un bando.

---

*Basado en [wempe.dev/blog/authentication-cookie-vs-token-based](https://wempe.dev/blog/authentication-cookie-vs-token-based), de Jannik Wempe.*
