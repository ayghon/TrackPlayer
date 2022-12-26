import { View, ViewProps } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React, { FC } from 'react';

export type HorizontalProps = ViewProps & { alignCenter?: boolean };

export const Horizontal: FC<HorizontalProps> = ({
  children,
  alignCenter = false,
  ...props
}) => {
  const styles = useStyles({ alignCenter });

  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

const useStyles = makeStyles((_, { alignCenter }: HorizontalProps) => ({
  container: {
    alignItems: alignCenter ? 'center' : undefined,
    display: 'flex',
    flexDirection: 'row'
  }
}));
