import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import LoadingSpinner from "./UI/LoadingSpinner";

i18n
  //pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // It detects user language in the browser with the order we prepared with "order" option.
  .use(LanguageDetector)
  .use(Backend)
  .init({
    // Language to use if translations in user language are not available.
    fallbackLng: "en",
    // Array of allowed languages in our app
    supportedLngs: ["en", "fa", "pt", "fr"],
    detection: {
      // Detect language based on order given.
      order: ["localStorage", "htmlTag", "cookie", "querystring"],
      // Cashe user language on given options.
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <React.Suspense fallback={<LoadingSpinner />}>
      <App />
    </React.Suspense>
  </Provider>
);
