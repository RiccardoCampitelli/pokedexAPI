import { fetchPokemon } from "./pokeapiClient";
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
        response = await fetchPokemon("pikachu");
      });

      test("Then response should be success", () => {
        expect(response.isSuccess).toBe(true);
      });

      test("Then success should be mapped correctly", () => {
        expect(response.success).toEqual(mappedResponse);
      });
    });
  });

  describe("Given a 400 response from the pokeapi", () => {
    beforeEach(() => {
      nock("https://pokeapi.co/api/v2/pokemon-species")
        .get("/pikachu")
        .reply(400, {});
    });

    describe("When fetching pokemon data", () => {
      let response: Result<Pokemon, FetchPokemonFailure>;

      beforeEach(async () => {
        response = await fetchPokemon("pikachu");
      });

      test("Then response should not be success", () => {
        expect(response.isSuccess).toBe(false);
      });

      test("Then failure should be NotFound", () => {
        expect(response.failure).toBe(FetchPokemonFailure.NotFound);
      });
    });
  });
});
