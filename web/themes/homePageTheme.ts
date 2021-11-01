import { css } from "styled-components";

export const homePageTheme = {
  largeScreen: (args: TemplateStringsArray) => css`
    @media screen and (min-width: 1301px) {
      ${css(args)}
    }
  `,
  mediumScreen: (args: TemplateStringsArray) => css`
    @media screen and (min-width: 990px) {
      ${css(args)}
    }
  `,
  smallScreen: (args: TemplateStringsArray) => css`
    @media screen and (max-width: 900px) {
      ${css(args)};
    }
  `,
};
