# DiscoStore API

API REST para catálogo de álbumes musicales, construida con Node.js, Express y SQLite.

## Requisitos

- Node.js 22+ (para soporte nativo de SQLite)
- pnpm

## Instalación

```bash
pnpm install
```

## Poblar la base de datos

```bash
pnpm createdb
```

Esto crea el archivo `data/albumes.db` con los datos de los 6 álbumes iniciales.

## Ejecutar

### Modo desarrollo (con recarga automática)

```bash
pnpm run dev
```

### Modo producción

```bash
pnpm run start
```

El servidor se ejecuta en `http://localhost:4321/`.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Información de la API |
| GET | `/albumes` | Lista de slugs de los álbumes |
| GET | `/albumes?include=full` | Lista completa con todos los datos |
| GET | `/album/:slug` | Datos de un álbum por slug |
| GET | `/genero/:genero` | Slugs de álbumes por género |
| GET | `/search/:text` | Busca álbumes por texto (mín. 3 caracteres) |
| POST | `/albumes` | Crea un nuevo álbum |
| PUT | `/album/:slug` | Actualiza un álbum existente |
| DELETE | `/album/:slug` | Elimina un álbum |
| GET | `/imagenes/*` | Imágenes de los álbumes |

## Códigos de respuesta

- `200 OK` — Petición exitosa o actualización exitosa
- `201 Created` — Recurso creado exitosamente (incluye cabecera `Location`)
- `204 No Content` — Eliminación exitosa
- `400 Bad Request` — Validación de entrada falló (Zod)
- `404 Not Found` — Recurso no encontrado o ruta no definida
- `409 Conflict` — Intenta crear un álbum con slug ya existente

## Estructura del proyecto

```
├── index.js                  # Servidor Express
├── data/
│   ├── CREATE.SQL            # Esquema SQLite
│   ├── createdb.js           # Script para poblar BD
│   ├── albumes.db            # Base de datos SQLite (generada)
│   ├── albumes.js            # Repositorio (consultas SQL)
│   └── albumes.json          # Datos de origen
├── routes/albumes/
│   ├── getAll.js             # GET /albumes
│   ├── getBySlug.js          # GET /album/:slug
│   ├── getByGenero.js        # GET /genero/:genero
│   ├── search.js             # GET /search/:text
│   ├── create.js             # POST /albumes
│   ├── update.js             # PUT /album/:slug
│   ├── remove.js             # DELETE /album/:slug
│   └── schemas.js            # Validación Zod
├── public/imagenes/          # Imágenes de los álbumes
├── .env                      # Variables de entorno
├── .gitignore
├── package.json
├── README.md
└── REFERENCIAS.md
```

## Pruebas con xh/httpie

```bash
# Información de la API
xh GET :4321/

# Listar álbumes
xh GET :4321/albumes

# Listar álbumes con datos completos
xh GET :4321/albumes include==full

# Detalle de un álbum
xh GET :4321/album/thriller

# Álbum inexistente (404)
xh GET :4321/album/inexistente

# Filtrar por género
xh GET :4321/genero/Rock

# Buscar álbumes
xh GET :4321/search/thriller

# Búsqueda corta (400)
xh GET :4321/search/ab

# Crear álbum
xh POST :4321/albumes \
  titulo="Nuevo Album" \
  artista="Nuevo Artista" \
  genero="Pop" \
  anio:=2024 \
  sello="Sello" \
  pistas:=10 \
  imagen="nuevo.avif" \
  slug="nuevo-album" \
  resumen="Resumen" \
  descripcion="Descripción"

# Actualizar álbum
xh PUT :4321/album/nuevo-album titulo="Album Actualizado"

# Eliminar álbum
xh DELETE :4321/album/nuevo-album

# Ver imágenes
xh GET :4321/imagenes/thriller.avif
```
