import {
  translateTextAsync,
  TranslationApiFailure,
  TranslationType,
} from "./funtranslationtsClient";

import { Result } from "src/utility";
import { successfulTranslation, failedTranslation } from "src/__fixtures__";

import nock from "nock";

describe("funtranslationsClient", () => {
  describe("Given a successful translation", () => {
    beforeEach(() => {
      nock(`https://api.funtranslations.com/translate`)
        .post("/yoda.json")
        .query({ text: "hello there" })
        .reply(200, successfulTranslation);
    });

    describe("When translating text", () => {
      let response: Result<string, TranslationApiFailure>;

      beforeEach(async () => {
        response = await translateTextAsync(
          "hello there",
          TranslationType.Yoda
        );
      });

      test("Then response should be success", () => {
        expect(response.isSuccess).toBe(true);
      });

      test("Then success value should be translated text", () => {
        expect(response.success).toEqual("there hello");
      });
    });
  });

  describe("Given a failed translation", () => {
    beforeEach(() => {
      nock(`https://api.funtranslations.com/translate`)
        .post("/yoda.json")
        .query({ text: "hello there" })
        .reply(200, failedTranslation);
    });

    describe("When translating text", () => {
      let response: Result<string, TranslationApiFailure>;

      beforeEach(async () => {
        response = await translateTextAsync(
          "hello there",
          TranslationType.Yoda
        );
      });

      test("Then response should not be success", () => {
        expect(response.isSuccess).toBe(false);
      });

      test("Then failure should be UnableToTranslate", () => {
        expect(response.failure).toBe(TranslationApiFailure.UnableToTranslate);
      });
    });
  });

  describe("Given a failure status code response from the funtranslationsApi", () => {
    beforeEach(() => {
      nock(`https://api.funtranslations.com/translate`)
        .post("/yoda.json")
        .query({ text: "hello there" })
        .reply(500);
    });

    describe("When translating text", () => {
      test("Then an error should be thrown", async () => {
        await expect(
          async () =>
            await translateTextAsync("hello there", TranslationType.Yoda)
        ).rejects.toThrow();
      });
    });
  });
});
