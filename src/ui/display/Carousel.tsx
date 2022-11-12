import { FlatList, FlatListProps, View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React from 'react';

const ItemSeparator = () => {
  const styles = useStyles();
  return <View style={[styles.separator]} />;
};

type CarouselProps<TItem> = FlatListProps<TItem>;

export function Carousel<TItem>(props: CarouselProps<TItem>) {
  return (
    <View>
      <FlatList ItemSeparatorComponent={ItemSeparator} horizontal {...props} />
    </View>
  );
}

const useStyles = makeStyles({
  separator: {
    margin: 4
  }
});
