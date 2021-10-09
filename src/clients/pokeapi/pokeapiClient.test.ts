import { fetchPokemonAsync } from "./pokeapiClient";
import { FetchPokemonFailure, Pokemon } from "./types";

import { Result } from "src/utility";
import { defaultPokeApiResponse, mappedResponse } from "src/__fixtures__";

import nock from "nock";

describe("pokeapiClient", () => {
  describe("Given a 200 response from the pokeapi", () => {
    beforeEach(() => {
      nock("https://pokeapi.co/api/v2/pokemon-species")
        .get("/pikachu")
        .reply(200, defaultPokeApiResponse);
    });

    describe("When fetching pokemon data", () => {
      let response: Result<Pokemon, FetchPokemonFailure>;

      beforeEach(async () => {
        response = await fetchPokemonAsync("pikachu");
      });

      test("Then response should be success", () => {
        expect(response.isSuccess).toBe(true);
      });

      test("Then success should be mapped correctly", () => {
        expect(response.success).toEqual(mappedResponse);
      });
    });
  });

  describe("Given a 404 response from the pokeapi", () => {
    beforeEach(() => {
      nock("https://pokeapi.co/api/v2/pokemon-species")
        .get("/pikachu")
        .reply(404);
    });

    describe("When fetching pokemon data", () => {
      let response: Result<Pokemon, FetchPokemonFailure>;

      beforeEach(async () => {
        response = await fetchPokemonAsync("pikachu");
      });

      test("Then response should not be success", () => {
        expect(response.isSuccess).toBe(false);
      });

      test("Then failure should be NotFound", () => {
        expect(response.failure).toBe(FetchPokemonFailure.NotFound);
      });
    });
  });

  describe("Given a 500 response from the pokeapi", () => {
    beforeEach(() => {
      nock("https://pokeapi.co/api/v2/pokemon-species")
        .get("/pikachu")
        .reply(500);
    });

    describe("When fetching pokemon data", () => {
      test("Then an error should be thrown", async () => {
        await expect(
          async () => await fetchPokemonAsync("pikachu")
        ).rejects.toThrow();
      });
    });
  });
});
