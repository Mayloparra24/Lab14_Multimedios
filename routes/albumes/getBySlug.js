import * as albumes from "../../data/albumes.js";

const notFound = (res, message) => res.status(404).json({ error: message });

export const getBySlug = (req, res) => {
  const album = albumes.getBySlug(req.params.slug);
  if (!album) return notFound(res, "Álbum no encontrado");
  res.json(album);
};
