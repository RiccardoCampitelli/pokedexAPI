import { pokemonRouter } from "./pokemon";

import { defaultPokeApiResponse, mappedResponse } from "src/__fixtures__";

import express, { Express } from "express";
import request, { Response } from "supertest";
import nock from "nock";

describe("pokemon routes", () => {
  let app: Express;
  
  beforeAll(() => {
    app = express();
    app.use(pokemonRouter);
  });

  beforeEach(() => {
    // We are blocking all requests to non mocked endpoints in our setupTests
    // This enables us to bypass the block to test our handlers.
    nock.enableNetConnect("127.0.0.1");
  });

  describe("Given a request to /pokemon/:pokemonName", () => {
    describe("When pokemonApi returns not found", () => {
      beforeEach(() => {
        nock("https://pokeapi.co/api/v2/pokemon-species")
          .get("/pikachu")
          .reply(404);
      });

      test("Then response should be 404 not found", async () => {
        const response = await request(app).get("/pokemon/pikachu");

        expect(response.status).toBe(404);
      });
    });

    describe("When pokemonApi returns a pokemon", () => {
      let response: Response;

      beforeEach(async () => {
        nock("https://pokeapi.co/api/v2/pokemon-species")
          .get("/pikachu")
          .reply(200, defaultPokeApiResponse);

        response = await request(app).get("/pokemon/pikachu");
      });

      test("Then the status code should be 200 ok", async () => {
        expect(response.status).toBe(200);
      });

      test("Then the response body should be expected pokemon", () => {
        expect(response.body).toEqual(mappedResponse);
      });
    });
  });
});
