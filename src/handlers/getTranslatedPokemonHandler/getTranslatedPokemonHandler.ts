import {
  fetchPokemonAsync,
  Pokemon,
  translateTextAsync,
  TranslationType,
} from "src/clients";
import { Result } from "src/utility";

export enum GetTranslatedPokemonFailure {
  NotFound,
}

export const getTranslatedPokemonHandler = async (
  pokemonName: string
): Promise<Result<Pokemon, GetTranslatedPokemonFailure>> => {
  const getPokemonResult = await fetchPokemonAsync(pokemonName);

  if (getPokemonResult.isSuccess === false) {
    return new Result<Pokemon, GetTranslatedPokemonFailure>({
      failure: GetTranslatedPokemonFailure.NotFound,
    });
  }

  const pokemon = getPokemonResult.success;

  const translationType = getTranslationType(pokemon);

  const translatedResponse = await translateTextAsync(
    pokemon.description,
    translationType
  );

  let description = pokemon.description;

  if (translatedResponse.isSuccess) {
    description = translatedResponse.success;
  }

  return new Result<Pokemon, GetTranslatedPokemonFailure>({
    success: {
      ...pokemon,
      description: description,
    },
  });
};

const getTranslationType = ({
  habitat,
  isLegendary,
}: Pokemon): TranslationType => {
  const isHabitatCave = habitat === "cave";

  if (isHabitatCave || isLegendary) {
    return TranslationType.Yoda;
  }

  return TranslationType.Shakespeare;
};
