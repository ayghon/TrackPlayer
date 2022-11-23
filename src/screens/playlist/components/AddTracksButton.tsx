import { Horizontal } from '../../../ui';
import { Icon, Text, makeStyles } from '@rneui/themed';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React, { FC } from 'react';

export const AddTracksButton: FC<TouchableOpacityProps> = (props) => {
  const styles = useStyles();

  return (
    <TouchableOpacity {...props}>
      <Horizontal alignCenter>
        <Icon iconStyle={styles.icon} name="add" style={styles.iconContainer} />
        <Text>Add tracks</Text>
      </Horizontal>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.colors.white
  },
  iconContainer: {
    backgroundColor: theme.colors.black,
    borderRadius: 4,
    marginEnd: 8,
    opacity: 0.8
  }
}));
