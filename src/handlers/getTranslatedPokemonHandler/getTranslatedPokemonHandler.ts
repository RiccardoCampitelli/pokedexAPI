import { fetchPokemon, Pokemon } from "src/clients";
import { Result } from "src/utility";

export enum GetTranslatedPokemonQueryFailure {
  NotFound,
}

export const getTranslatedPokemonHandler = async (
  pokemonName: string
): Promise<Result<Pokemon, GetTranslatedPokemonQueryFailure>> => {
  const getPokemonResult = await fetchPokemon(pokemonName);

  if (getPokemonResult.isSuccess === false) {
    return new Result<Pokemon, GetTranslatedPokemonQueryFailure>({
      failure: GetTranslatedPokemonQueryFailure.NotFound,
    });
  }

  return new Result<Pokemon, GetTranslatedPokemonQueryFailure>({
    success: getPokemonResult.success as Pokemon,
  });
};
