Esta API es para gestionar usuarios en un sistema de la UMG por darnos una idea Nos permite crear, listar, actualizar y eliminar usuarios, validando que no haya duplicados de DPI si no tira un mensaje de ususario
existente.

Mejoras: Se añadió autenticación con JWT ahora, los usuarios deben iniciar sesión para obtener un token y usarlo en las rutas protegidas (GET /users, PUT /users/:dpi, DELETE /users/:dpi).
Se creó el archivo .env para manejar el secreto de JWT y la duración del token.

aqui estan los comandos para correrlo de manera local:

descargar el contenido del reposistorio
correr el comendo npm install
crear el archivo JWT_SECRET=contraseña
inicar el servidor 
endpoints:
POST /users: Crea un nuevo usuario.

GET /users: Lista todos los usuarios.

PUT /users/: Actualiza la información de un usuario existente.

DELETE /users/ : Elimina un usuario.


Es una herramienta útil para manejar usuarios de manera sencilla y efectiva es un ejemplo de como se utilizara la api en la videa real usando render y genera token.

LINK DE LA API

https://hoja-de-trabajo-7-sm73.onrender.com

Esta echo por mi:
Brandon Josué Gómez García 9490-20-49
