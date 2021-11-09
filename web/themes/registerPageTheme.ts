import { css } from "styled-components";

export const registerPageTheme = {
  smallScreen: (args: TemplateStringsArray) => css`
    @media screen and (max-width: 600px) {
      ${css(args)};
    }
  `,
};
