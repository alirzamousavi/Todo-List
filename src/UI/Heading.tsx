import { useContext } from "react";
import styles from "./Heading.module.scss";
import ThemeContext from "../context/theme-context";
import { useTranslation } from "react-i18next";

const Heading = () => {
  const themeCtx = useContext(ThemeContext);

  const { t } = useTranslation();

  return <h1 className={styles[themeCtx.theme]}>{t("heading")}</h1>;
};

export default Heading;
