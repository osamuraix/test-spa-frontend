import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: require("./locales/en.json") },
    th: { translation: require("./locales/th.json") },
  },
});

export default i18n;
