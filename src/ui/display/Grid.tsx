import { FlatList, FlatListProps, View } from 'react-native';
import { makeStyles } from '@rneui/themed';
import React from 'react';

type GridProps<TItem> = FlatListProps<TItem>;

export function Grid<TItem>(props: GridProps<TItem>) {
  const styles = useStyles();

  return (
    <View>
      <FlatList<TItem>
        columnWrapperStyle={styles.column}
        key={2}
        numColumns={2}
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
