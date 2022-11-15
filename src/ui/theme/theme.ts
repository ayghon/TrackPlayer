import {
  createTheme,
  CreateThemeOptions,
  ThemeMode,
  useTheme
} from '@rneui/themed';
import { DEFAULT_THEME_MODE } from '../../utils';
import { useCallback, useState } from 'react';
import {
  defaultSchemeColors,
  getColorSchemeConfiguration,
  ThemeColorScheme
} from './schemes';

export const initialTheme = createTheme({
  ...defaultSchemeColors,
  mode: DEFAULT_THEME_MODE
});

export const useThemeManager = () => {
  const [theme, setTheme] = useState<CreateThemeOptions>(initialTheme);
  const { updateTheme } = useTheme();

  const changeTheme = useCallback(
    (scheme: ThemeColorScheme, mode?: ThemeMode) => {
      const { theme: themeByColorScheme } = getColorSchemeConfiguration(scheme);
      const newTheme = createTheme({ ...themeByColorScheme, mode });
      updateTheme(newTheme);
      setTheme(newTheme);
    },
    [updateTheme]
  );

  return { theme, changeTheme };
};
