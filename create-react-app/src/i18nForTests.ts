import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import hourlyWeather from "../public/locales/en/hourlyWeather.json";
import offices from "../public/locales/en/offices.json";
import products from "../public/locales/en/products.json";
import todaysWeather from "../public/locales/en/todaysWeather.json";

i18n.use(initReactI18next).init({
  debug: false,
  defaultNS: "common",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // Not needed for react because it escapes by default.
  },
  lng: "en",
  ns: ["common"],
  resources: {
    en: { hourlyWeather, offices, products, todaysWeather },
  },
});

export default i18n;
