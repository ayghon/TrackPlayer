import React, { FC } from 'react';
import {
  Button as _Button,
  ButtonProps as _ButtonProps,
  makeStyles
} from '@rneui/themed';

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
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
    <_Button
      {...props}
      buttonStyle={[styles.button, props.buttonStyle]}
      titleStyle={[styles.buttonTitle, props.titleStyle]}>
      {children}
    </_Button>
  );
};

const useStyles = makeStyles((theme, { variant }: ButtonProps) => ({
  button: {
    paddingHorizontal: 32,
    backgroundColor:
      variant === ButtonVariant.PRIMARY
        ? theme.colors.secondary
        : theme.colors.primary,
    borderRadius: 100
  },
  buttonTitle: {
    color:
      variant === ButtonVariant.PRIMARY
        ? theme.colors.white
        : theme.colors.black
  }
}));