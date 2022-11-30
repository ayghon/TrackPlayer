import {
  Button as RNEButton,
  ButtonProps as _ButtonProps,
  makeStyles
} from '@rneui/themed';
import { getStyleByVariant } from './button.utils';
import React, { FC } from 'react';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  BORDERLESS = 'borderless'
}

export type ButtonProps = _ButtonProps & {
  variant?: ButtonVariant;
};

export const Button: FC<ButtonProps> = ({
  children,
  variant = ButtonVariant.PRIMARY,
  ...props
}) => {
  const styles = useStyles({ variant });

  return (
    <RNEButton
      {...props}
      buttonStyle={[styles.button, props.buttonStyle]}
      titleStyle={[styles.buttonTitle, props.titleStyle]}
    >
      {children}
    </RNEButton>
  );
};

const useStyles = makeStyles((theme, { variant }: ButtonProps) => ({
  button: {
    ...getStyleByVariant(theme, variant).button,
    paddingHorizontal: 32
  },
  buttonTitle: getStyleByVariant(theme, variant).buttonTitle
}));
