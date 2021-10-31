import { ThemeProvider } from "styled-components";
import { homePageTheme } from "./homePageTheme";

export const Theme: React.FC = ({ children }) => (
  <ThemeProvider theme={{ homePageTheme }}>{children}</ThemeProvider>
);
