import { Row, Stack, Switch, Text } from 'native-base';
import React, { FC } from 'react';

export type SwitchInputProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  helperText?: string;
};

export const SwitchInput: FC<SwitchInputProps> = ({
  label,
  value,
  onChange,
  helperText = ''
}) => {
  return (
    <Stack>
      <Row alignItems="center" justifyContent="space-between">
        <Text variant="body2">{label}</Text>
        <Switch onValueChange={onChange} value={value} />
      </Row>
      {helperText && (
        <Text marginTop={2} variant="caption">
          {helperText}
        </Text>
      )}
    </Stack>
  );
};
