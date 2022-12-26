import { Box, Row, StyledProps, Text, View } from 'native-base';
import React from 'react';

export type TrackTitleProps = StyledProps & {
  title: string;
  artist: string;
  minimal?: boolean;
};

export const TrackTitle = ({
  title,
  artist,
  minimal = false,
  ...rest
}: TrackTitleProps) => {
  if (minimal) {
    return (
      <Row alignItems="center" {...rest}>
        <Text variant="body2">{title}</Text>
        <View
          bgColor="text.primary"
          borderRadius="full"
          height={1}
          marginX={2}
          width={1}
        />
        <Text variant="caption">{artist}</Text>
      </Row>
    );
  }

  return (
    <Box {...rest}>
      <Text variant="title">{title}</Text>
      <Text variant="subheader">{artist}</Text>
    </Box>
  );
};
