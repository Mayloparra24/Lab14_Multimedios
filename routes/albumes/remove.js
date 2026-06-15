import * as albumes from "../../data/albumes.js";

const notFound = (res, message) => res.status(404).json({ error: message });

export const remove = (req, res) => {
  const existing = albumes.getBySlug(req.params.slug);
  if (!existing) return notFound(res, "Álbum no encontrado");

  albumes.remove(req.params.slug);
  res.status(204).send();
};
