import { IconNode } from '@rneui/base';
import { Input, useTheme } from '@rneui/themed';
import { StyleProp, TextStyle } from 'react-native';
import React, { FC } from 'react';

export type TextInputProps = {
  onChange: (text: string) => void;
  value: string;
  placeholder?: string;
  label?: string;
  error?: string;
  autoFocus?: boolean;
  leftIcon?: IconNode;
  rightIcon?: IconNode;
  labelStyle?: StyleProp<TextStyle>;
};

export const TextInput: FC<TextInputProps> = ({
  placeholder,
  value,
  onChange,
  label,
  error,
  autoFocus = false,
  leftIcon,
  rightIcon,
  labelStyle
}) => {
  const { theme } = useTheme();

  return (
    <Input
      autoCapitalize="none"
      autoFocus={autoFocus}
      errorMessage={error}
      label={label}
      labelStyle={labelStyle}
      leftIcon={leftIcon}
      onChangeText={onChange}
      placeholder={placeholder}
      rightIcon={rightIcon}
      selectionColor={theme.colors.secondary}
      value={value}
    />
  );
};
