import { Icon, makeStyles, Text } from '@rneui/themed';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React, { FC } from 'react';
import { Horizontal } from '../../../ui';

export const AddTracksButton: FC<TouchableOpacityProps> = (props) => {
  const styles = useStyles();

  return (
    <TouchableOpacity {...props}>
      <Horizontal alignCenter>
        <Icon name="add" style={styles.iconContainer} iconStyle={styles.icon} />
        <Text>Add tracks</Text>
      </Horizontal>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  iconContainer: {
    backgroundColor: theme.colors.black,
    opacity: 0.8,
    borderRadius: 4,
    marginEnd: 8
  },
  icon: {
    color: theme.colors.primary
  }
}));
