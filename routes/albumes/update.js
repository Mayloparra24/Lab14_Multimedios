import * as albumes from "../../data/albumes.js";
import { albumUpdateSchema } from "./schemas.js";

const notFound = (res, message) => res.status(404).json({ error: message });

export const update = (req, res) => {
  const existing = albumes.getBySlug(req.params.slug);
  if (!existing) return notFound(res, "Álbum no encontrado");

  const parsed = albumUpdateSchema.safeParse(req.body);
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message || "Datos inválidos";
    return res.status(400).json({ error });
  }

  const { id, ...rest } = existing;
  const updated = { ...rest, ...parsed.data };
  albumes.update(req.params.slug, updated);
  res.json(albumes.getBySlug(req.params.slug));
};
