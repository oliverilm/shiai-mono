/* eslint-disable @typescript-eslint/no-empty-interface -- Default theme just has to Extend the Theme, nothing else */
import { Theme } from '@mui/material';
import { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

type Shade = {
  '1000': '#000000';
  '900': '#1A1A1A';
  '800': '#333333';
  '700': '#4D4D4D';
  '600': '#666666';
  '500': '#808080';
  '400': '#999999';
  '300': '#B3B3B3';
  '200': '#CCCCCC';
  '100': '#E6E6E6';
  '50': '#F2F2F2';
  '25': '#F9F9F9';
  '0': '#FFFFFF';
};

declare module '@mui/material/styles/createTheme' {
  interface PaletteOptions {
    tertiary?: PaletteColor;
    shade: Shade;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    tertiary: PaletteColor;
    shade: Shade;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
    shade: Shade;
  }
}
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}
declare module '@mui/material/OverridableComponent' {
  interface CommonProps {
    [key: `data-${string}`]: string;
  }
}
/* eslint-enable @typescript-eslint/no-empty-interface -- Default theme just has to Extend the Theme, nothing else */
