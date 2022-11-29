import React, { useContext } from "react";
import styles from "./SwitchTheme.module.scss";
import { FaMoon, FaSun } from "react-icons/fa";
import ThemeContext from "../context/theme-context";

const SwitchTheme: React.FC<{ className: string }> = (props) => {
  const themeCtx = useContext(ThemeContext);

  return (
    <button
      className={`${styles["theme-btn"]} ${styles[themeCtx.theme]} ${
        styles[props.className]
      }`}
      onClick={themeCtx.onChangeTheme}
    >
      {themeCtx.theme === "dark" ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default SwitchTheme;
