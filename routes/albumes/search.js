import * as albumes from "../../data/albumes.js";
import { searchSchema } from "./schemas.js";

export const search = (req, res) => {
  const parsed = searchSchema.safeParse(req.params);

  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message || "Búsqueda inválida";
    return res.status(400).json({ error });
  }

  const query = parsed.data.text;
  const results = albumes.search(query);
  res.json(results);
};
