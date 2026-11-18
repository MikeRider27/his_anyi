# Sistema de gestión interna del Hospital Anyi

Aplicación web para la gestión interna del Hospital Anyi. La interfaz está desarrollada con Vue 2 y Element UI; el entorno Docker incluye una API REST y MongoDB para el desarrollo local.

## Tecnologías

| Componente | Versión |
|------------|---------|
| Node.js | 20 o superior (mínimo 18) |
| Vue | 2.7 |
| Vue Router / Vuex | 3.6 |
| Element UI | 2.15 |
| Vite | 5 |

## Instalación y compilación

``` bash
# instalar dependencias
npm install

# servidor de desarrollo con recarga en caliente en localhost:8080
npm run dev

# compilar para producción en dist/
npm run build

# previsualizar la compilación de producción
npm run preview
```

En modo desarrollo local (`npm run dev`), los datos se leen de los JSON de [public/static/](public/static/). Con Docker, Vite sirve la interfaz con recarga en caliente y envía las peticiones de datos a la API respaldada por MongoDB.

## Docker

El proyecto se puede levantar completo con Docker Compose en modo desarrollo. Arranca tres servicios:

| Servicio | Imagen | Función |
|----------|--------|---------|
| `web` | Node 20 + Vite | Sirve la interfaz de desarrollo con recarga en caliente y envía las peticiones de datos a la API |
| `api` | Node 20 + Express | API REST que lee y escribe los datos en MongoDB |
| `db` | MongoDB 7 | Base de datos; los datos se guardan en el volumen `mongo-data` |

``` bash
# arrancar el entorno de desarrollo
docker compose up -d --build

# abrir http://localhost:8070
# los cambios en src/, public/ y los archivos montados se reflejan al guardar;
# basta con refrescar el navegador

# ver logs
docker compose logs -f

# parar
docker compose down

# parar y borrar la base de datos (se volverá a cargar desde public/static/ al arrancar)
docker compose down -v
```

El puerto se puede cambiar con la variable `WEB_PORT` (por ejemplo `WEB_PORT=9000 docker compose up -d`).

Para servir la compilación de producción con Nginx, detén primero el entorno de desarrollo y arranca el perfil de producción:

``` bash
docker compose stop web
docker compose --profile production up -d --build web-prod
```

La versión de producción no tiene recarga en caliente: después de cambiar el código hay que volver a construir la imagen con `docker compose --profile production up -d --build web-prod`.

La red de Compose usa la subred fija `10.60.10.0/24` porque los rangos por defecto de Docker estaban agotados en el equipo de desarrollo. Si choca con otra red, cámbiala en [docker-compose.yml](docker-compose.yml).

### Base de datos

Al arrancar por primera vez, la API carga en MongoDB (base `his`, colección `datasets`) cada archivo JSON de [public/static/](public/static/) como un documento, con el nombre del archivo como `_id` (por ejemplo `doctor/doctor`). El frontend sigue pidiendo `/static/<nombre>.json`; Vite redirige esas peticiones a la API en desarrollo y Nginx lo hace en producción, así que no hubo que cambiar los componentes.

Endpoints de la API:

- `GET /api/datasets`: lista los conjuntos de datos.
- `GET /api/datasets/<nombre>`: devuelve un conjunto (por ejemplo `/api/datasets/doctor/doctor`).
- `PUT /api/datasets/<nombre>`: reemplaza un conjunto con el cuerpo JSON de la petición.

## Documentación

La carpeta [docs/](docs/) contiene la documentación original del proyecto (en chino):

- [docs/delivery-templates/](docs/delivery-templates/): plantillas de los documentos de entrega.
- [docs/project-docs/](docs/project-docs/): documentación interna del proyecto (requisitos, diseño, manual de usuario, informes).

Estado: estructura básica del proyecto terminada.

## Autor

**Miguel Villaba** — [mike.mavc27@gmail.com](mailto:mike.mavc27@gmail.com)

## Licencia

Este proyecto se distribuye bajo la licencia [MIT](LICENSE).
