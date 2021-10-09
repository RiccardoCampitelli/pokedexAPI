import {
  getTranslatedPokemonHandler,
  GetTranslatedPokemonFailure,
} from "./getTranslatedPokemonHandler";

import { TranslationApiFailure, TranslationType } from "src/clients";
import { mappedApiResponse } from "src/__fixtures__";
import { FetchPokemonFailure, Pokemon } from "src/clients/pokeapi";
import { Result } from "src/utility";

import * as pokeapiClient from "src/clients/pokeapi/pokeapiClient";
import * as translation from "src/clients/funtranslations/funtranslationtsClient";

describe("getTranslatedPokemonHandler", () => {
  let pokeApiSpy: jest.SpyInstance;
  let translationApiSpy: jest.SpyInstance;

  beforeEach(() => {
    pokeApiSpy = jest.spyOn(pokeapiClient, "fetchPokemonAsync");
    translationApiSpy = jest.spyOn(translation, "translateTextAsync");
  });

  describe("Given a failure occurs when fetching pokemon data", () => {
    let result: Result<Pokemon, GetTranslatedPokemonFailure>;

    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          failure: FetchPokemonFailure.NotFound,
        })
      );
    });

    describe("When getTranslatedPokemonHandler is called", () => {
      beforeEach(async () => {
        result = await getTranslatedPokemonHandler("pikachu");
      });

      test("Then a failure response is returned", async () => {
        expect(result.isSuccess).toBe(false);
      });

      test("Then failure response is NotFound", () => {
        expect(result.failure).toBe(GetTranslatedPokemonFailure.NotFound);
      });
    });
  });

  describe("Given fetched pokemon is legendary", () => {
    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          success: { ...mappedApiResponse, isLegendary: true },
        })
      );
      translationApiSpy.mockResolvedValueOnce(
        new Result<string, TranslationApiFailure>({
          success: "yoda translation",
        })
      );
    });

    describe("When getTranslatedPokemonHandler is called", () => {
      let result: Result<Pokemon, GetTranslatedPokemonFailure>;

      beforeEach(async () => {
        result = await getTranslatedPokemonHandler("pikachu");
      });

      test("Then translationApi is called with yoda translation", () => {
        expect(translationApiSpy).toHaveBeenCalledWith(
          mappedApiResponse.description,
          TranslationType.Yoda
        );
      });

      test("Then returned pokemon has yoda translated description", () => {
        expect(result.success.description).toBe("yoda translation");
      });
    });
  });

  describe("Given fetched pokemon is from cave habitat", () => {
    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          success: { ...mappedApiResponse, habitat: "cave" },
        })
      );
      translationApiSpy.mockResolvedValueOnce(
        new Result<string, TranslationApiFailure>({
          success: "yoda translation",
        })
      );
    });

    describe("When getTranslatedPokemonHandler is called", () => {
      let result: Result<Pokemon, GetTranslatedPokemonFailure>;

      beforeEach(async () => {
        result = await getTranslatedPokemonHandler("pikachu");
      });

      test("Then translationApi is called with yoda translation", () => {
        expect(translationApiSpy).toHaveBeenCalledWith(
          mappedApiResponse.description,
          TranslationType.Yoda
        );
      });

      test("Then returned pokemon has yoda translated description", () => {
        expect(result.success.description).toBe("yoda translation");
      });
    });
  });

  describe("Given fetched pokemon is not legendary and not from cave habitat", () => {
    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          success: { ...mappedApiResponse },
        })
      );
      translationApiSpy.mockResolvedValueOnce(
        new Result<string, TranslationApiFailure>({
          success: "shakespeare translation",
        })
      );
    });

    describe("When getTranslatedPokemonHandler is called", () => {
      let result: Result<Pokemon, GetTranslatedPokemonFailure>;

      beforeEach(async () => {
        result = await getTranslatedPokemonHandler("pikachu");
      });

      test("Then translationApi is called with shakespeare translation", () => {
        expect(translationApiSpy).toBeCalledWith(
          mappedApiResponse.description,
          TranslationType.Shakespeare
        );
      });

      test("Then returned pokemon has shakespeare translated description", () => {
        expect(result.success.description).toBe("shakespeare translation");
      });
    });
  });

  describe("Given translating description fails", () => {
    beforeEach(async () => {
      pokeApiSpy.mockResolvedValueOnce(
        new Result<Pokemon, FetchPokemonFailure>({
          success: { ...mappedApiResponse, habitat: "cave" },
        })
      );
      translationApiSpy.mockResolvedValueOnce(
        new Result<string, TranslationApiFailure>({
          failure: TranslationApiFailure.UnableToTranslate,
        })
      );
    });

    describe("When getTranslatedPokemonHandler is called", () => {
      let result: Result<Pokemon, GetTranslatedPokemonFailure>;

      beforeEach(async () => {
        result = await getTranslatedPokemonHandler("pikachu");
      });

      test("Then original description is used for pokemon", () => {
        expect(result.success.description).toBe(mappedApiResponse.description);
      });
    });
  });
});
