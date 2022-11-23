import { FlatList, FlatListProps, View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

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
        ItemSeparatorComponent={ItemSeparator}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...props}
      />
      {enableGradient && (
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.85)']}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={styles.linearGradient}
        />
      )}
    </View>
  );
}

const useStyles = makeStyles({
  linearGradient: {
    borderRadius: 6,
    bottom: 0,
    left: 300,
    position: 'absolute',
    right: 0,
    top: 0
  },
  separator: {
    margin: 4
  }
});
