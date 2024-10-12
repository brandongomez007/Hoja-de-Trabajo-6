Esta API es para gestionar usuarios en un sistema de la UMG por darnos una idea Nos permite crear, listar, actualizar y eliminar usuarios, validando que no haya duplicados de DPI si no tira un mensaje de ususario ahora se implemento lo siguiente:
Se añadió autenticación con JWT para proteger las rutas. Ahora los usuarios deben iniciar sesión para obtener un token y usarlo en las rutas
GET /users
PUT /users/:dpi
DELETE /users/:dpi

aqui estan los comandos:

primero se deve inicar secion en el usuario con el metodo post: generara un token y luego se pueden realizar los siguientes comandos.
tendremos que crear un archivos con env. con los siguintes parametros
contrasenaa=CodiGOSecreTroxd
teimpoo=30s


POST /users: Crea un nuevo usuario.

GET /users: Lista todos los usuarios.

PUT /users/: Actualiza la información de un usuario existente.

DELETE /users/ : Elimina un usuario.


Es una herramienta útil para manejar usuarios de manera sencilla y efectiva es un ejemplo de como se utilizara la api en la videa real usando render.

LINK DE LA API

https://hoja-de-trabajo-7-sm73.onrender.com

Esta echo por mi:
Brandon Josué Gómez García 9490-20-49
