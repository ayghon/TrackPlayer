import {
  Button as RNEButton,
  ButtonProps as _ButtonProps,
  makeStyles
} from '@rneui/themed';
import React, { FC } from 'react';

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
    backgroundColor:
      variant === ButtonVariant.PRIMARY
        ? theme.colors.secondary
        : theme.colors.primary,
    borderRadius: 100,
    paddingHorizontal: 32
  },
  buttonTitle: {
    color:
      variant === ButtonVariant.PRIMARY
        ? theme.colors.white
        : theme.colors.black
  }
}));
