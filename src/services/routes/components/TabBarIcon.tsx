import { Icon } from '@rneui/themed';
import React from 'react';

export const TabBarIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
  name: string;
}) => <Icon {...props} />;
