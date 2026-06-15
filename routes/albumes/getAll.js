import * as albumes from "../../data/albumes.js";

export const getAll = (req, res) => {
  const isFull = req.query.include === "full";
  const contents = isFull ? albumes.getAll().map(slug => albumes.getBySlug(slug.slug)) : albumes.getAll();
  res.json(contents);
};
