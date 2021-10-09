import { getPokemonHandler, GetPokemonFailure } from "./getPokemonHandler";

import { FetchPokemonFailure, Pokemon } from "src/clients/pokeapi";
import { mappedApiResponse } from "src/__fixtures__";
import { Result } from "src/utility";

import * as pokeapiClient from "src/clients/pokeapi/pokeapiClient";

describe("getPokemonHandler", () => {
  let pokeApiSpy: jest.SpyInstance;

  beforeEach(() => {
    pokeApiSpy = jest.spyOn(pokeapiClient, "fetchPokemonAsync");
  });

  describe("Given a failure occurs when fetching pokemon data", () => {
    let result: Result<Pokemon, GetPokemonFailure>;

    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          failure: FetchPokemonFailure.NotFound,
        })
      );
    });

    describe("When getPokemonHandler is called", () => {
      beforeEach(async () => {
        result = await getPokemonHandler("pikachu");
      });

      test("Then a failure response is returned", async () => {
        expect(result.isSuccess).toBe(false);
      });

      test("Then failure response is NotFound", () => {
        expect(result.failure).toBe(GetPokemonFailure.NotFound);
      });
    });
  });

  describe("Given pokemon data is fetched successfully", () => {
    let result: Result<Pokemon, GetPokemonFailure>;

    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          success: mappedApiResponse,
        })
      );
    });

    describe("When getPokemonHandler is called", () => {
      beforeEach(async () => {
        result = await getPokemonHandler("pikachu");
      });

      test("Then a success response is returned", async () => {
        expect(result.isSuccess).toBe(true);
      });

      test("Then pokemon is returned", () => {
        expect(result.success).toEqual(mappedApiResponse);
      });
    });
  });
});
