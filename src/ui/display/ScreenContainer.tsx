import { BackButton } from '../../services/routes/components/BackButton';
import { Column, Icon, useTheme } from 'native-base';
import { SafeAreaView } from 'react-native';
import { ScreenStatusBar } from './ScreenStatusBar';
import { useNavigation } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';

export type ScreenContainerProps = {
  hasCloseButton?: boolean;
  hasBackButton?: boolean;
  onClose?: () => void;
};

export const ScreenContainer: FC<PropsWithChildren<ScreenContainerProps>> = ({
  children,
  hasCloseButton = false,
  hasBackButton = false,
  onClose
}) => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <ScreenStatusBar />
      <Column height="100%" paddingX={4} paddingY={3} space="lg">
        {hasBackButton && (
          <BackButton
            alignSelf="flex-start"
            canGoBack
            onPress={onClose}
            tintColor={colors.white}
          />
        )}
        {hasCloseButton && (
          <Icon
            accessibilityLabel="close"
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
      </Column>
    </SafeAreaView>
  );
};
