import { Button, Horizontal, ScreenContainer } from '../../ui';
import { Icon, Text, makeStyles } from '@rneui/themed';
import { RootStackScreenProps, Routes, useColorScheme } from '../../services';
import { StorageKeys } from '../../utils';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { FC } from 'react';

export const SettingsScreen: FC<RootStackScreenProps<Routes.SETTINGS>> = ({
  navigation: { navigate }
}) => {
  const styles = useStyles();
  const { activeColorSchemeText } = useColorScheme();

  return (
    <ScreenContainer>
      <Horizontal alignCenter style={styles.setting}>
        <Text style={styles.switchTitle}>Color scheme</Text>
        <TouchableOpacity
          onPress={() => navigate(Routes.COLOR_SCHEME)}
          style={styles.settingAction}
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
  setting: {
    justifyContent: 'space-between',
    marginBottom: 32
  },
  settingAction: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  settingValue: {
    color: theme.colors.secondary,
    marginEnd: 4
  },
  switchTitle: {
    fontWeight: 'bold'
  }
}));
