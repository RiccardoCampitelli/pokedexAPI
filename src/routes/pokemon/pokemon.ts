import { Router } from "express";
import { getPokemonHandler, getTranslatedPokemonHandler } from "src/handlers";

const pokemonRouter = Router();

pokemonRouter.get("/pokemon/:pokemonName", async (req, res) => {
  const { pokemonName } = req.params;

  let getPokemonQueryResult = await getPokemonHandler(pokemonName);

  if (getPokemonQueryResult.isSuccess === false) {
    return res.status(404).send();
  }

  res.send({ ...getPokemonQueryResult.success });
});

pokemonRouter.get("/pokemon/translated/:pokemonName", async (req, res) => {
  const { pokemonName } = req.params;

  let getPokemonQueryResult = await getTranslatedPokemonHandler(pokemonName);

  if (getPokemonQueryResult.isSuccess === false) {
    return res.status(404);
  }

  res.send({ ...getPokemonQueryResult.success });
});

export { pokemonRouter };
