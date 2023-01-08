# Huxle

## Team Members
* Girkinger Matthias
* Kräutl Philip
* Schickmair Verena


## Setup

### `npm install`
In the project directory and "huxle-backend".
Installs the packages which are used in the project.

### `npm start`
In the directory "huxle-backend" to start the Strapi Server.
A registration may be required and the API-Key may be generated. This API-Key must then be set in the file "src/api/ApiConfig.ts".
It may also be necessary to set the permissions in the Strapi administration panel to get and post Words. This could be done in Settings -> Users & Permissions -> Public/Authenticated -> Word -> tick allowed actions (find/findOne and create).

### `npm run dev`
Runs the app in the development mode.
