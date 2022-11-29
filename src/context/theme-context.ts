import React from "react";

// Purpose of this context is to define what theme user is currently using and whenever
// user clicks on the toggle theme button, theme gets change with onChangeTheme function.

type themeContextType = {
  theme: string;
  onChangeTheme: () => void;
};

const ThemeContext = React.createContext<themeContextType>({
  // If no theme was already saved in local storage, set the default theme to light, otherwise
  // set it to the saved value in local storage.
  theme:
    localStorage.getItem("theme") === null
      ? localStorage.setItem("theme", "light")!
      : localStorage.getItem("theme")!,
  // The reason why this function is written here is just for better IDE auto-completion and
  // the main changes happens in App component.
  onChangeTheme: () => {},
});

export default ThemeContext;
