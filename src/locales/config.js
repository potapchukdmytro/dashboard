import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./en/translation.json";
import ukTranslation from "./uk/translation.json";
import frTranslation from "./fr/translation.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: enTranslation },
        uk: { translation: ukTranslation },
        fr: { translation: frTranslation }
    },
    lng: navigator.language,
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});