import { IPressableProps, Icon, Pressable, Text } from 'native-base';
import { testIds } from '../../../../utils';
import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';

export type AndroidBackButtonProps = IPressableProps & {
  label?: string;
  tintColor?: string;
  canGoBack: boolean;
  onPress?: () => void;
};

export const BackButton: FC<AndroidBackButtonProps> = ({
  label,
  tintColor,
  canGoBack,
  onPress,
  ...rest
}) => {
  const { goBack } = useNavigation();

  return (
    <Pressable
      alignItems="center"
      marginRight={8}
      onPress={() => {
        if (onPress) {
          onPress();
        }
        goBack();
      }}
      {...rest}
    >
      <Icon
        color={tintColor}
        disabled={canGoBack}
        name="arrow-back-ios"
        size={6}
        testID={testIds.button.back}
      />
      {label && <Text color={tintColor}>{label}</Text>}
    </Pressable>
  );
};
