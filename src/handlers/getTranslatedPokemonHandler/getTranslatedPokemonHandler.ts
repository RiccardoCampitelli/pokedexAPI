import {
  fetchPokemonAsync,
  Pokemon,
  translateTextAsync,
  TranslationType,
} from "src/clients";
import { Result } from "src/utility";

export enum GetTranslatedPokemonQueryFailure {
  NotFound,
}

export const getTranslatedPokemonHandler = async (
  pokemonName: string
): Promise<Result<Pokemon, GetTranslatedPokemonQueryFailure>> => {
  const getPokemonResult = await fetchPokemonAsync(pokemonName);

  if (getPokemonResult.isSuccess === false) {
    return new Result<Pokemon, GetTranslatedPokemonQueryFailure>({
      failure: GetTranslatedPokemonQueryFailure.NotFound,
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

  return new Result<Pokemon, GetTranslatedPokemonQueryFailure>({
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
