import React, { useState, useContext, ChangeEvent } from "react";
import styles from "./SwitchLanguage.module.scss";
import ThemeContext from "../context/theme-context";
import { FaLanguage } from "react-icons/fa";
import Modal from "../UI/Modal";
import useLanguage from "../Hooks/useLanguage";

const SUPPORTED_LANGUAGES: {
  name: string;
  code: string;
}[] = [
  {
    name: "English",
    code: "en",
  },
  {
    name: "فارسی",
    code: "fa",
  },
  {
    name: "Português",
    code: "pt",
  },
  {
    name: "Français",
    code: "fr",
  },
];

const SwitchLanguage: React.FC<{
  onReload: (lang: string) => void;
  className: string;
}> = (props) => {
  // Shows that we are changing the language or not.
  const [isChanging, setIsChanging] = useState(false);

  const themeCtx = useContext(ThemeContext);

  const { language, changeLanguage } = useLanguage();

  // When user clicks on language button in the menu, it means that language is going to change,
  // so we set this to true and allow user to change language.
  const openLanguageListHandler = (): void => {
    setIsChanging(true);
  };

  // Declare what language is selected and updates the language context value by calling onChangeLanguage
  // and passing the seleted language to it.
  const changeLanguageHandler = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const lang = event.target.value;
    props.onReload(lang);
    changeLanguage(lang);
    setIsChanging(false);
  };

  // It will close the modal and does not allow user to change the language anymore.
  const hideModalHandler = (): void => {
    setIsChanging(false);
  };

  const languageSelector = (
    <Modal onHideModal={hideModalHandler}>
      <select
        className={`${styles["language-list"]}`}
        lang={language}
        onChange={changeLanguageHandler}
        defaultValue={language}
      >
        {SUPPORTED_LANGUAGES.map((lang, index) => (
          <option key={index} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </Modal>
  );

  return (
    <React.Fragment>
      <button
        className={`${styles["language-btn"]} ${styles[themeCtx.theme]} ${
          styles[props.className]
        }`}
        onClick={openLanguageListHandler}
      >
        <FaLanguage />
      </button>
      <div className={styles.backdrop}>
        <div className={styles.modal}>{isChanging && languageSelector}</div>
      </div>
    </React.Fragment>
  );
};

export default SwitchLanguage;
