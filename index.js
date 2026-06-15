import express from "express";
import { env, loadEnvFile } from "node:process";

import { getAll } from "./routes/albumes/getAll.js";
import { getBySlug } from "./routes/albumes/getBySlug.js";
import { getByGenero } from "./routes/albumes/getByGenero.js";
import { search } from "./routes/albumes/search.js";
import { create } from "./routes/albumes/create.js";
import { update } from "./routes/albumes/update.js";
import { remove } from "./routes/albumes/remove.js";

loadEnvFile("./.env");

const { HOST, PORT } = env;

const app = express();
app.use(express.json());
app.enable("strict routing");

app.get("/", (req, res) => {
  res.json({
    name: "DiscoStore API",
    version: "1.0.0",
    description: "API REST para catálogo de álbumes musicales",
    endpoints: {
      "GET /albumes": "Lista de álbumes (slugs). Query ?include=full para datos completos",
      "GET /album/:slug": "Datos de un álbum específico",
      "GET /genero/:genero": "Álbumes por género (slugs)",
      "GET /search/:text": "Búsqueda por texto (mín. 3 caracteres)",
      "POST /albumes": "Crear un nuevo álbum",
      "PUT /album/:slug": "Actualizar un álbum existente",
      "DELETE /album/:slug": "Eliminar un álbum",
      "GET /imagenes/*": "Imágenes de los álbumes"
    }
  });
});

app.get("/albumes", getAll);
app.get("/album/:slug", getBySlug);
app.get("/genero/:genero", getByGenero);
app.get("/search/:text", search);
app.post("/albumes", create);
app.put("/album/:slug", update);
app.delete("/album/:slug", remove);

app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.listen(PORT, HOST, () => {
  console.log(`DiscoStore API en http://${HOST}:${PORT}/`);
});
