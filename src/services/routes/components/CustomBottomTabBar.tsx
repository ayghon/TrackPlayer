import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { FloatingPlayer } from './FloatingPlayer';
import React from 'react';

export const CustomBottomTabBar = (props: BottomTabBarProps) => (
  <View>
    <FloatingPlayer />
    <BottomTabBar {...props} />
  </View>
);
