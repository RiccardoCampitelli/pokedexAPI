import { fetchPokemon, FetchPokemonFailure, Pokemon } from "src/clients";
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
      failure: mapFailures(getPokemonResult.failure),
    });
  }

  return new Result<Pokemon, GetPokemonFailure>({
    success: getPokemonResult.success,
  });
};

const mapFailures = (fetchPokemonFailure: FetchPokemonFailure) => {
  switch (fetchPokemonFailure) {
    case FetchPokemonFailure.NotFound:
      return GetPokemonFailure.NotFound;
  }
};
