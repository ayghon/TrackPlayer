import { ListItem, useTheme } from '@rneui/themed';
import React, { FC, ReactNode } from 'react';

export type CheckboxListItemProps = {
  title: string;
  rightContent?: ReactNode;
  checked: boolean;
  onPress: () => void;
  bottomDivider?: boolean;
};

export const CheckboxListItem: FC<CheckboxListItemProps> = ({
  title,
  rightContent,
  checked,
  onPress,
  bottomDivider
}) => {
  const { theme } = useTheme();

  return (
    <ListItem bottomDivider={bottomDivider}>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
      </ListItem.Content>
      {rightContent}
      <ListItem.CheckBox
        checked={checked}
        checkedColor={theme.colors.secondary}
        onPress={onPress}
        uncheckedColor={theme.colors.black}
      />
    </ListItem>
  );
};
