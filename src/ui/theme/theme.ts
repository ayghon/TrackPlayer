import { DeviceEventEmitter } from 'react-native';
import { StorageEvent, StorageKeys } from '../../services';
import { ThemeColorScheme, getColorSchemeConfiguration } from './schemes';
import { colors } from './values/colors';
import { extendTheme } from 'native-base';
import { fontConfig, fontSizes, fonts } from './values/font';
import { headingVariants } from './variants/heading';
import { textVariants } from './variants/text';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export enum ThemeMode {
  DARK = 'dark',
  LIGHT = 'light'
}

export const DEFAULT_THEME_MODE: ThemeMode = ThemeMode.DARK;

const componentsOverrides = {
  Button: {
    defaultProps: {
      variant: 'primary'
    },
    variants: {
      borderless: {
        _text: { color: 'text.primary', variant: 'button' },
        backgroundColor: 'transparent'
      },
      primary: {
        _text: { color: 'text.secondary', variant: 'button' },
        backgroundColor: 'secondary.normal',
        borderRadius: 'full'
      },
      secondary: {
        _text: { color: 'text.primary', variant: 'button' },
        backgroundColor: 'primary.light',
        borderRadius: 'full'
      }
    }
  },
  Checkbox: {
    defaultProps: {
      _checked: {
        backgroundColor: 'secondary.normal',
        borderColor: 'secondary.normal'
      }
    }
  },
  FlatList: {
    defaultProps: {
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false
    }
  },
  Heading: {
    defaultProps: {
      variant: 'headline'
    },
    variants: headingVariants
  },
  Icon: {
    baseStyle: {
      color: 'text.primary'
    },
    defaultProps: {
      as: MaterialIcons,
      size: 'xl'
    }
  },
  Input: {
    defaultProps: {
      autoCapitalize: 'none',
      color: 'text.primary',
      cursorColor: 'secondary.normal',
      focusOutlineColor: 'secondary.normal',
      placeholderTextColor: 'text.subtitle.primary',
      selectionColor: 'secondary.normal',
      size: 'lg',
      variant: 'underlined'
    }
  },
  Pressable: {
    defaultProps: {
      _pressed: {
        opacity: 0.75
      }
    }
  },
  Progress: {
    baseStyle: {
      _filledTrack: { backgroundColor: 'secondary.normal' },
      backgroundColor: 'primary.light'
    }
  },
  SliderFilledTrack: {
    baseStyle: {
      backgroundColor: 'secondary.dark'
    }
  },
  SliderThumb: {
    baseStyle: {
      backgroundColor: 'secondary.normal'
    }
  },
  SliderTrack: {
    baseStyle: {
      backgroundColor: 'primary.light'
    }
  },
  Spinner: {
    baseStyle: {
      bgColor: 'primary.normal',
      color: 'secondary.normal',
      height: '100%',
      width: '100%'
    }
  },
  Switch: {
    defaultProps: {
      offThumbColor: 'white',
      offTrackColor: 'primary.light',
      onThumbColor: 'primary.normal',
      onTrackColor: 'secondary.normal'
    }
  },
  Text: {
    defaultProps: {
      variant: 'body1'
    },
    variants: textVariants
  }
};

export const defaultThemeOverrides = {
  components: componentsOverrides,
  fontConfig,
  fontSizes,
  fonts
};

export const initialTheme = extendTheme({
  colors,
  components: componentsOverrides,
  config: {
    initialColorMode: DEFAULT_THEME_MODE,
    useSystemColorMode: false
  },
  fontConfig,
  fontSizes,
  fonts
});

export type CustomTheme = typeof initialTheme;

export const useThemeManager = () => {
  const [theme, setTheme] = useState<CustomTheme>(initialTheme);

  const changeTheme = useCallback(async (scheme: ThemeColorScheme) => {
    const { theme: newTheme } = await getColorSchemeConfiguration(scheme);

    setTheme(newTheme);
    DeviceEventEmitter.emit(StorageEvent.COLOR_SCHEME_CHANGE, newTheme);
  }, []);

  useEffect(() => {
    const getStorageColorScheme = async () => {
      const storageColorScheme = (await AsyncStorage.getItem(
        StorageKeys.COLOR_SCHEME
      )) as ThemeColorScheme | null;

      if (storageColorScheme) {
        await changeTheme(storageColorScheme);
      }
    };

    getStorageColorScheme();
  }, [changeTheme]);

  return { changeTheme, theme };
};
