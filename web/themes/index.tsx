import { ThemeProvider } from "styled-components";

import { homePageTheme } from "./homePageTheme";
import { registerPageTheme } from "./registerPageTheme";
import { globalTheme } from "./globalTheme";

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={{ homePageTheme, globalTheme, registerPageTheme }}>
    {children}
  </ThemeProvider>
);
