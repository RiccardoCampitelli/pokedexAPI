import { TranslationApiResponse } from "src/clients";

export const successfulTranslation: TranslationApiResponse = {
  success: {
    total: 1,
  },
  contents: {
    translated: "there hello",
    text: "hello there",
    translation: "yoda",
  },
};

export const failedTranslation: TranslationApiResponse = {
  success: {
    total: 0,
  },
  contents: {
    translated: "",
    text: "",
    translation: "yoda",
  },
};
