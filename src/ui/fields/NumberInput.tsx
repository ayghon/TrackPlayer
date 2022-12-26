import { TextInput } from './text-input';
import React, { FC } from 'react';

export type NumberInputProps = {
  onChange: (value: number) => void;
  value?: number;
  placeholder?: string;
  label?: string;
  error?: string;
  autoFocus?: boolean;
  leftElement?: JSX.Element | JSX.Element[];
  rightElement?: JSX.Element | JSX.Element[];
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
  autoFocus = false,
  leftElement,
  rightElement,
  error,
  value,
  onChange,
  placeholder
}) => {
  const onChangeText = (text: string) => {
    const parsedText = parseText(text);

    if (parsedText) {
      return onChange(parsedText);
    }
  };

  return (
    <TextInput
      autoCapitalize="none"
      autoFocus={autoFocus}
      error={error}
      keyboardType="numeric"
      label={label}
      leftElement={leftElement}
      maxLength={10}
      onChangeText={onChangeText}
      placeholder={placeholder}
      rightElement={rightElement}
      value={value?.toFixed(0)}
    />
  );
};
