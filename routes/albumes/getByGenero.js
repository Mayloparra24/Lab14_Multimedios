import * as albumes from "../../data/albumes.js";

export const getByGenero = (req, res) => {
  const results = albumes.getByGenero(req.params.genero);
  res.json(results);
};
