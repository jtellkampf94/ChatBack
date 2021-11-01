import { ThemeProvider } from "styled-components";

import { homePageTheme } from "./homePageTheme";
import { globalTheme } from "./globalTheme";

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={{ homePageTheme, globalTheme }}>
    {children}
  </ThemeProvider>
);
