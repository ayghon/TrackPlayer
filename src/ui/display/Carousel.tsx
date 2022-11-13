import { FlatList, FlatListProps, View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const ItemSeparator = () => {
  const styles = useStyles();
  return <View style={[styles.separator]} />;
};

type CarouselProps<TItem> = FlatListProps<TItem> & {
  enableGradient?: boolean;
};

export function Carousel<TItem>({
  enableGradient = true,
  ...props
}: CarouselProps<TItem>) {
  const styles = useStyles();
  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={ItemSeparator}
        horizontal
        {...props}
      />
      {enableGradient && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.linearGradient}
          colors={['transparent', 'rgba(0,0,0,0.85)']}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles({
  linearGradient: {
    position: 'absolute',
    top: 0,
    left: 300,
    borderRadius: 6,
    right: 0,
    bottom: 0
  },
  separator: {
    margin: 4
  }
});
