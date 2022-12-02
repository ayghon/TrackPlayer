import { Horizontal } from '../display';
import { Switch, Text, makeStyles, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import React, { FC } from 'react';

export type SwitchInputProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
  helperText?: string;
};

export const SwitchInput: FC<SwitchInputProps> = ({
  label,
  value,
  onChange,
  helperText = ''
}) => {
  const { theme } = useTheme();
  const styles = useStyles();

  return (
    <View>
      <Horizontal alignCenter style={styles.horizontalContainer}>
        <Text style={styles.label}>{label}</Text>
        <Switch
          color={theme.colors.secondary}
          onValueChange={onChange}
          value={value}
        />
      </Horizontal>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  helperText: { color: theme.colors.grey1, fontSize: 14, marginTop: 8 },
  horizontalContainer: {
    justifyContent: 'space-between'
  },
  label: { fontSize: 16, fontWeight: 'bold' }
}));
