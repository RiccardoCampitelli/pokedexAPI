import { PokemonFailure } from "./failures";
import { PokemonApiResponse } from "./interfaces";

import { Result } from "src/utility";

import axios, { AxiosError } from "axios";

export const fetchPokemon = async (
  pokemonname: string
): Promise<Result<PokemonApiResponse, PokemonFailure>> => {
  try {
    const response = await axios.get<PokemonApiResponse>(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonname}`
    );
    return new Result<PokemonApiResponse, PokemonFailure>({
      success: response.data,
    });
  } catch (error: unknown | AxiosError) {
    if (axios.isAxiosError(error)) {
      return new Result<PokemonApiResponse, PokemonFailure>({
        failure: PokemonFailure.NotFound,
      });
    }

    throw error;
  }
};
