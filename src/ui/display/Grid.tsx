import { FlatList, FlatListProps, View } from 'react-native';
import React from 'react';
import { makeStyles } from '@rneui/themed';

type GridProps<TItem> = FlatListProps<TItem>;

export function Grid<TItem>(props: GridProps<TItem>) {
  const styles = useStyles();

  return (
    <View>
      <FlatList<TItem>
        key={2}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        {...props}
      />
    </View>
  );
}

const useStyles = makeStyles({
  column: {
    justifyContent: 'space-evenly',
    marginVertical: 6
  }
});
