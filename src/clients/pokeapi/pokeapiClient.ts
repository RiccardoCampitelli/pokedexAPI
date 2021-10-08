import { Pokemon, PokemonApiResponse, FetchPokemonFailure } from "./types";

import { Result } from "src/utility";

import axios, { AxiosError } from "axios";

export const fetchPokemon = async (
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
    if (axios.isAxiosError(error)) {
      return new Result<Pokemon, FetchPokemonFailure>({
        failure: FetchPokemonFailure.NotFound,
      });
    }

    throw error;
  }
};

const mapResult = (response: PokemonApiResponse): Pokemon => {
  return {
    habitat: response.habitat.name,
    isLegendary: response.is_legendary,
    name: response.name,
    description:
      response.flavor_text_entries.find(
        (flavorText) => flavorText.language.name === "en"
      )?.flavor_text ?? "",
  };
};
