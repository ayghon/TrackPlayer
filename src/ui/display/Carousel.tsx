import { Box, FlatList, useTheme } from 'native-base';
import { IFlatListProps } from 'native-base/lib/typescript/components/basic/FlatList';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

type CarouselProps<TItem> = IFlatListProps<TItem> & {
  enableGradient?: boolean;
};

const ItemSeparator = () => <Box margin={1} />;

export function Carousel<TItem>({
  enableGradient = false,
  ...props
}: CarouselProps<TItem>) {
  const theme = useTheme();

  return (
    <Box>
      <FlatList ItemSeparatorComponent={ItemSeparator} horizontal {...props} />
      {enableGradient && (
        <LinearGradient
          colors={['transparent', theme.colors.primary.opaque]}
          end={{ x: 1, y: 0 }}
          start={{ x: 0, y: 0 }}
          style={styles.linearGradient}
        />
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 6,
    bottom: 0,
    left: 300,
    position: 'absolute',
    right: 0,
    top: 0
  }
});
