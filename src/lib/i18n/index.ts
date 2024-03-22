import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi, { HttpBackendOptions } from "i18next-http-backend";

// type LanguageDict = typeof import("../../../public/lang/en.json");

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    // resources: {
    //   en: LanguageDict;
    // };
  }
}

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init<HttpBackendOptions>({
    supportedLngs: ["en", "es", "fr"],
    backend: {
      loadPath: "/lang/{{lng}}.json?v=Oct29",
    },
    fallbackLng: "en",
  });

export default i18n;
