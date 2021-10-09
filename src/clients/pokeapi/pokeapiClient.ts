import { Pokemon, PokemonApiResponse, FetchPokemonFailure } from "./types";

import { Result } from "src/utility";

import axios, { AxiosError } from "axios";

export const fetchPokemonAsync = async (
  pokemonName: string
): Promise<Result<Pokemon, FetchPokemonFailure>> => {
  try {
    const response = await axios.get<PokemonApiResponse>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`
    );

    return new Result<Pokemon, FetchPokemonFailure>({
      success: mapResult(response.data),
    });
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return new Result<Pokemon, FetchPokemonFailure>({
        failure: FetchPokemonFailure.NotFound,
      });
    }

    throw error;
  }
};

const findEscapedCharacters = new RegExp(/(\n|\f)/g);

const mapResult = (response: PokemonApiResponse): Pokemon => {
  const mappedResult: Partial<Pokemon> = {
    habitat: response.habitat.name,
    isLegendary: response.is_legendary,
    name: response.name,
  };

  const description =
    response.flavor_text_entries.find(
      (flavorText) => flavorText.language.name === "en"
    )?.flavor_text ?? "";

  const unescapedDescription = description.replace(findEscapedCharacters, " ");

  return { ...mappedResult, description: unescapedDescription } as Pokemon;
};
