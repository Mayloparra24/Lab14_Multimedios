import * as albumes from "../../data/albumes.js";
import { albumSchema } from "./schemas.js";

export const create = (req, res) => {
  const parsed = albumSchema.safeParse(req.body);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message || "Datos inválidos";
    return res.status(400).json({ error });
  }

  const album = parsed.data;

  if (albumes.slugExists(album.slug)) {
    return res.status(409).json({ error: "Ya existe un álbum con ese slug" });
  }

  albumes.create(album);
  res.status(201).location(`/album/${album.slug}`).json({ slug: album.slug });
};
