import { Checkbox, Divider, List, Row, Stack, Text } from 'native-base';
import React, { FC, ReactNode } from 'react';

export type CheckboxListItemProps = {
  title: string;
  rightContent?: ReactNode;
  value: string;
  checked: boolean;
  onPress: () => void;
  bottomDivider?: boolean;
  checkedColor?: string;
  uncheckedColor?: string;
};

export const CheckboxListItem: FC<CheckboxListItemProps> = ({
  title,
  rightContent,
  value,
  onPress,
  bottomDivider = false,
  checkedColor,
  uncheckedColor,
  checked
}) => {
  return (
    <Stack>
      <List.Item>
        <Row alignItems="center" justifyContent="space-between" width="100%">
          <Text variant="subheader">{title}</Text>
          <Row space={4}>
            {rightContent}
            <Checkbox
              _checked={{
                backgroundColor: checkedColor,
                borderColor: checkedColor
              }}
              _unchecked={{
                backgroundColor: uncheckedColor,
                borderColor: uncheckedColor
              }}
              accessibilityLabel={title}
              isChecked={checked}
              onChange={onPress}
              value={value}
            />
          </Row>
        </Row>
      </List.Item>
      {bottomDivider && <Divider />}
    </Stack>
  );
};
