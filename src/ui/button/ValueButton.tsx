import { Horizontal } from '../display';
import { Icon, Text, makeStyles } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';

export type ValueButtonProps = {
  onPress: () => void;
  value: string;
};

export const ValueButton: FC<PropsWithChildren<ValueButtonProps>> = ({
  onPress,
  value,
  children
}) => {
  const styles = useStyles();

  return (
    <Horizontal alignCenter style={styles.container}>
      <Text style={styles.title}>{children}</Text>
      <TouchableOpacity onPress={onPress} style={styles.action}>
        <Text style={styles.value}>{value}</Text>
        <Icon name="chevron-right" />
      </TouchableOpacity>
    </Horizontal>
  );
};

const useStyles = makeStyles((theme) => ({
  action: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    justifyContent: 'space-between',
    marginBottom: 32
  },
  title: {
    fontWeight: 'bold'
  },
  value: {
    color: theme.colors.secondary,
    marginEnd: 4
  }
}));
