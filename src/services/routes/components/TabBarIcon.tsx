import { Icon } from '@rneui/base';
import React from 'react';

export const TabBarIcon = (props: {
  focused: boolean;
  color: string;
  size: number;
  name: string;
}) => <Icon {...props} />;
