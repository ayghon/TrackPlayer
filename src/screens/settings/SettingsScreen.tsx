import { Button, Horizontal, ScreenContainer } from '../../ui';
import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon, makeStyles, Text } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '../../services/routes/routes.types';
import { useColorScheme } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../utils';

export const SettingsScreen: FC<
  NativeStackScreenProps<RootStackParamList, Routes.SETTINGS>
> = ({ navigation: { navigate } }) => {
  const styles = useStyles();
  const { activeColorSchemeText } = useColorScheme();

  return (
    <ScreenContainer>
      <Horizontal alignCenter style={styles.setting}>
        <Text style={styles.switchTitle}>Color scheme</Text>
        <TouchableOpacity
          style={styles.settingAction}
          onPress={() => navigate(Routes.COLOR_SCHEME)}
        >
          <Text style={styles.settingValue}>{activeColorSchemeText}</Text>
          <Icon name="chevron-right" />
        </TouchableOpacity>
      </Horizontal>
      <Horizontal alignCenter style={styles.setting}>
        <Text style={styles.switchTitle}>Playlists in storage</Text>
        <Button onPress={() => AsyncStorage.removeItem(StorageKeys.PLAYLISTS)}>
          Clear
        </Button>
      </Horizontal>
      <Horizontal alignCenter style={styles.setting}>
        <Text style={styles.switchTitle}>Color scheme in storage</Text>
        <Button
          onPress={() => AsyncStorage.removeItem(StorageKeys.COLOR_SCHEME)}
        >
          Clear
        </Button>
      </Horizontal>
    </ScreenContainer>
  );
};

const useStyles = makeStyles((theme) => ({
  settingAction: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  settingValue: {
    marginEnd: 4,
    color: theme.colors.secondary
  },
  setting: {
    justifyContent: 'space-between',
    marginBottom: 32
  },
  switchTitle: {
    fontWeight: 'bold'
  }
}));
