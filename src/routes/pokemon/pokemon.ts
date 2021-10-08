import { Router } from "express";

const pokemonRouter = Router();

pokemonRouter.get("/pokemon/:pokemonname", (req, res) => {
  res.send({ pokemonname: req.params.pokemonname });
});

pokemonRouter.get("/pokemon/translated/:pokemonname", (req, res) => {
  res.send({ pokemonname: req.params.pokemonname });
});

export { pokemonRouter };
