import { useState } from "react";
import i18next from "i18next";

const useLanguage = () => {
  const [language, setLanguage] = useState(
    // If no language was already saved in local storage, set the default language to English(en), otherwise
    // set it to the saved value in local storage.
    localStorage.getItem("i18nextLng") === null
      ? localStorage.setItem("i18nextLng", "en")!
      : localStorage.getItem("i18nextLng")!
  );

  // This function set the language to the selected one and stores it to local storage.
  const changeLanguage = (lang: string): void => {
    setLanguage(lang);
    i18next.changeLanguage(lang);
    localStorage.setItem("i18nextLng", lang);
  };

  return { language, changeLanguage };
};

export default useLanguage;
