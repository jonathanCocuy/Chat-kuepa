# Chat Kuepa

Bienvenido! Este proyecto es una aplicación desarrollada para una simulación de un chat en vivo, con autenticación. Sigue los pasos a continuación para configurar y ejecutar el proyecto en tu entorno local.


## Instrucciones de Configuración

1. Clonar el repositorio
    git clone [URL_DEL_REPOSITORIO]

2. Navega a la carpeta client:
    cd client

3. Instala las dependencias:
    npm install

4. Navega a la carpeta server
    cd ../server

5. Instalar las dependencias:
    npm install

6. Configurar la base de datos:
    6.1 Abre el archivo index.js ubicado en la carpeta server.
    6.2 Busca la variable url y reemplázala con la dirección local de tu base de datos.

    let url = "TU_URL_LOCAL_DE_BASE_DE_DATOS"

7. Ejecutar el proyecto (SERVER):
    npm run dev

8. Ejercutar el proyecto (CLIENT):
    npm start
