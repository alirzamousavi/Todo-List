import React, { useState, useContext } from "react";
import styles from "./Menu.module.scss";
import ThemeContext from "../context/theme-context";
import SwitchTheme from "./SwitchTheme";
import SwitchLanguage from "./SwitchLanguage";

const Menu: React.FC<{ onReload: (lang: string) => void }> = (props) => {
  // It indicates that menu is open or not. If it's true, means that the menu is open
  // and if it's false, menu is close.
  const [isOpen, setIsOpen] = useState(false);

  const themeCtx = useContext(ThemeContext);

  // When user clicks on the menu button, state changes and if the menu is open, it will be closed and vice versa.
  const openMenuHandler = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <SwitchTheme className={isOpen ? "open" : ""} />
      <SwitchLanguage
        onReload={props.onReload}
        className={isOpen ? "open" : ""}
      />
      <div
        className={`${styles.menu} ${styles[themeCtx.theme]}`}
        onClick={openMenuHandler}
      >
        <span
          className={`${styles["menu-bar"]} ${styles[themeCtx.theme]} ${
            isOpen ? styles.open : ""
          }`}
        ></span>
      </div>
    </React.Fragment>
  );
};

export default Menu;
