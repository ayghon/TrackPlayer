import { Icon, View } from 'native-base';
import { SafeAreaView } from 'react-native';
import { ScreenStatusBar } from './ScreenStatusBar';
import { useNavigation } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';

export type ScreenContainerProps = {
  hasCloseButton?: boolean;
  onClose?: () => void;
};

export const ScreenContainer: FC<PropsWithChildren<ScreenContainerProps>> = ({
  children,
  hasCloseButton = false,
  onClose
}) => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView>
      <ScreenStatusBar />
      <View height="100%" paddingX={4} paddingY={3}>
        {hasCloseButton && (
          <Icon
            alignSelf="flex-end"
            name="close"
            onPress={() => {
              if (onClose) {
                onClose();
              }
              goBack();
            }}
          />
        )}
        {children}
      </View>
    </SafeAreaView>
  );
};
