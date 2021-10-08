import { fetchPokemon, Pokemon } from "src/clients";
import { Result } from "src/utility";

export enum GetPokemonFailure {
  NotFound,
}

export const getPokemonHandler = async (
  pokemonName: string
): Promise<Result<Pokemon, GetPokemonFailure>> => {
  const getPokemonResult = await fetchPokemon(pokemonName);

  if (getPokemonResult.isSuccess === false) {
    return new Result<Pokemon, GetPokemonFailure>({
      failure: GetPokemonFailure.NotFound,
    });
  }

  return new Result<Pokemon, GetPokemonFailure>({
    success: getPokemonResult.success as Pokemon,
  });
};
