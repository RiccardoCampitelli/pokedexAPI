import { fetchPokemon } from "./pokeapiClient";
import { FetchPokemonFailure, Pokemon } from "./types";

import { Result } from "src/utility";

import nock from "nock";

const defaultPokeApiResponse = {
  habitat: {
    name: "forest",
  },
  is_legendary: false,
  name: "pikachu",
  flavor_text_entries: [
    {
      flavor_text: "hello",
      language: {
        name: "en",
      },
    },
  ],
};

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
        const expectedResponse: Pokemon = {
          description: "hello",
          habitat: "forest",
          isLegendary: false,
          name: "pikachu",
        };

        expect(response.success).toEqual(expectedResponse);
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
        console.log(response);
        expect(response.isSuccess).toBe(false);
      });

      test("Then failure should be NotFound", () => {
        expect(response.failure).toBe(FetchPokemonFailure.NotFound);
      });
    });
  });
});
