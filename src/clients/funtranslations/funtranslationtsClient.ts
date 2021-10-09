import { Result } from "src/utility";

import axios from "axios";

export enum TranslationType {
  Yoda = "yoda",
  Shakespeare = "shakespeare",
}

export enum TranslationApiFailure {
  UnableToTranslate,
}

export interface TranslationApiResponse {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: string;
  };
}

export const translateTextAsync = async (text: string, translation: TranslationType) => {
  const response = await axios.post<TranslationApiResponse>(
    `https://api.funtranslations.com/translate/${translation}.json?text=${encodeURIComponent(
      text
    )}`
  );

  if (response.data.success.total < 1) {
    return new Result<string, TranslationApiFailure>({
      failure: TranslationApiFailure.UnableToTranslate,
    });
  }

  return new Result<string, TranslationApiFailure>({
    success: response.data.contents.translated,
  });
};
