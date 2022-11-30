import { ButtonVariant } from './Button';
import { Colors } from '@rneui/themed/dist/config/colors';
import { Theme } from '@rneui/themed';

export const getStyleByVariant = (
  theme: { colors: Colors } & Theme,
  variant?: ButtonVariant
) => {
  switch (variant) {
    case ButtonVariant.BORDERLESS:
      return {
        button: {
          backgroundColor: 'transparent',
          borderWidth: 0
        },
        buttonTitle: {
          color: theme.colors.black
        }
      };
    case ButtonVariant.SECONDARY:
      return {
        button: {
          backgroundColor: theme.colors.primary,
          borderRadius: 100,
          borderWidth: 1
        },
        buttonTitle: {
          color: theme.colors.black
        }
      };
    case ButtonVariant.PRIMARY:
    default:
      return {
        button: {
          backgroundColor: theme.colors.secondary,
          borderRadius: 100,
          borderWidth: 1
        },
        buttonTitle: {
          color: theme.colors.white
        }
      };
  }
};
