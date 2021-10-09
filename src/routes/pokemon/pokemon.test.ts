import { pokemonRouter } from "./pokemon";

import * as pokemonHandler from "src/handlers/getPokemonHandler/getPokemonHandler";
import * as translatedPokemonHandler from "src/handlers/getTranslatedPokemonHandler/getTranslatedPokemonHandler";

import { GetPokemonFailure, GetTranslatedPokemonFailure } from "src/handlers";
import { mappedApiResponse } from "src/__fixtures__";
import { Result } from "src/utility";
import { Pokemon } from "src/clients";

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
        jest.spyOn(pokemonHandler, "getPokemonHandler").mockResolvedValue(
          new Result<Pokemon, GetPokemonFailure>({
            failure: GetPokemonFailure.NotFound,
          })
        );
      });

      test("Then response should be 404 not found", async () => {
        const response = await request(app).get("/pokemon/pikachu");

        expect(response.status).toBe(404);
      });
    });

    describe("When pokemonApi returns a pokemon", () => {
      let response: Response;

      beforeEach(async () => {
        jest.spyOn(pokemonHandler, "getPokemonHandler").mockResolvedValue(
          new Result<Pokemon, GetPokemonFailure>({
            success: mappedApiResponse,
          })
        );

        response = await request(app).get("/pokemon/pikachu");
      });

      test("Then the status code should be 200 ok", async () => {
        expect(response.status).toBe(200);
      });

      test("Then the response body should be expected pokemon", () => {
        expect(response.body).toEqual(mappedApiResponse);
      });
    });
  });

  describe("Given a request to /pokemon/translated/:pokemonName", () => {
    describe("When pokemonApi returns not found", () => {
      beforeEach(() => {
        jest
          .spyOn(translatedPokemonHandler, "getTranslatedPokemonHandler")
          .mockResolvedValue(
            new Result<Pokemon, GetTranslatedPokemonFailure>({
              failure: GetTranslatedPokemonFailure.NotFound,
            })
          );
      });

      test("Then response should be 404 not found", async () => {
        const response = await request(app).get("/pokemon/translated/pikachu");

        expect(response.status).toBe(404);
      });
    });

    describe("When pokemonApi returns a pokemon AND description is translated", () => {
      let response: Response;

      beforeEach(() => {
        jest
          .spyOn(translatedPokemonHandler, "getTranslatedPokemonHandler")
          .mockResolvedValue(
            new Result<Pokemon, GetTranslatedPokemonFailure>({
              success: mappedApiResponse,
            })
          );
      });

      beforeEach(async () => {
        response = await request(app).get("/pokemon/translated/pikachu");
      });

      test("Then the status code should be 200 ok", async () => {
        expect(response.status).toBe(200);
      });

      test("Then the response body should be expected pokemon", () => {
        expect(response.body).toEqual(mappedApiResponse);
      });
    });
  });
});
