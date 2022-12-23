import { Icon, Pressable, Row, Text } from 'native-base';
import React, { FC, PropsWithChildren } from 'react';

export type ValueButtonProps = {
  onPress: () => void;
  value?: string;
};

export const ValueButton: FC<PropsWithChildren<ValueButtonProps>> = ({
  onPress,
  value,
  children
}) => {
  return (
    <Row alignContent="center" justifyContent="space-between" marginBottom={6}>
      <Text variant="body2">{children}</Text>
      <Pressable onPress={onPress}>
        <Row alignItems="center">
          <Text color="text.accent" marginRight={1} variant="body2">
            {value}
          </Text>
          <Icon name="chevron-right" />
        </Row>
      </Pressable>
    </Row>
  );
};
