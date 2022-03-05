import React, { ReactNode } from 'react';

export type ThemeProps = {
  (props: { children: ReactNode }): React.ReactElement;
};
