import 'styled-components';
import { ThemeOptions } from '@mui/material';

declare module 'styled-components' {
  export type DefaultTheme = ThemeOptions;
}
