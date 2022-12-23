import { FormControl, IInputProps, Input } from 'native-base';
import React, { FC } from 'react';

export type TextInputProps = Omit<IInputProps, 'onChange'> & {
  label?: string;
  error?: string;
  autoFocus?: boolean;
  leftElement?: JSX.Element | JSX.Element[];
  rightElement?: JSX.Element | JSX.Element[];
};

export const TextInput: FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  label,
  error,
  autoFocus = false,
  leftElement,
  rightElement,
  ...rest
}) => {
  return (
    <FormControl isInvalid={!!error} {...rest}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        autoFocus={autoFocus}
        leftElement={leftElement}
        onChangeText={onChangeText}
        placeholder={placeholder}
        rightElement={rightElement}
        value={value}
      />
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
