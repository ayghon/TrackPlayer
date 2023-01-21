import { Carousel } from '../../../ui';
import { IFlatListProps } from 'native-base/lib/typescript/components/basic/FlatList';
import { Text } from 'native-base';
import React from 'react';

export type SectionProps<TItem> = {
  title: string;
  list: TItem[];
  keyExtractor: IFlatListProps<TItem>['keyExtractor'];
  renderItem: IFlatListProps<TItem>['renderItem'];
};

export function Section<TItem>({
  title,
  list,
  keyExtractor,
  renderItem
}: SectionProps<TItem>) {
  return (
    <>
      <Text marginBottom={2} variant="title">
        {title}
      </Text>
      <Carousel<TItem>
        data={list}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </>
  );
}
