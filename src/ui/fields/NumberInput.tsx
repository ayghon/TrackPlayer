import { IconNode } from '@rneui/base';
import { Input, useTheme } from '@rneui/themed';
import { StyleProp, TextStyle } from 'react-native';
import React, { FC } from 'react';

export type NumberInputProps = {
  onChange: (value: number) => void;
  value?: number;
  placeholder?: string;
  label?: string;
  error?: string;
  autoFocus?: boolean;
  leftIcon?: IconNode;
  rightIcon?: IconNode;
  labelStyle?: StyleProp<TextStyle>;
};

const parseText = (text: string): number | null => {
  const textRemoved = text.replace(/[^0-9]/g, '');
  const parsedValue = parseInt(textRemoved, 10);

  if (isNaN(parsedValue)) {
    return null;
  }

  return parsedValue;
};

export const NumberInput: FC<NumberInputProps> = ({
  label,
  labelStyle,
  autoFocus = false,
  leftIcon,
  rightIcon,
  error,
  value,
  onChange,
  placeholder
}) => {
  const { theme } = useTheme();

  const onChangeText = (text: string) => {
    const parsedText = parseText(text);

    if (parsedText) {
      return onChange(parsedText);
    }
  };

  return (
    <Input
      autoCapitalize="none"
      autoFocus={autoFocus}
      errorMessage={error}
      keyboardType="numeric"
      label={label}
      labelStyle={labelStyle}
      leftIcon={leftIcon}
      maxLength={10}
      onChangeText={onChangeText}
      placeholder={placeholder}
      rightIcon={rightIcon}
      selectionColor={theme.colors.secondary}
      value={value?.toFixed(0)}
    />
  );
};
