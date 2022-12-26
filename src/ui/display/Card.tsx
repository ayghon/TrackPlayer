import { Box, IBoxProps, Row } from 'native-base';
import React, { FC, PropsWithChildren } from 'react';

export type CardProps = PropsWithChildren &
  IBoxProps & {
    row?: boolean;
  };

const commonStyles = {
  backgroundColor: 'primary.opaque',
  borderColor: 'primary.dark',
  borderRadius: 'md',
  borderStyle: 'solid',
  borderWidth: 1,
  paddingX: 4,
  paddingY: 1,
  width: '100%'
};

export const Card: FC<CardProps> = ({ children, row = false, ...rest }) => {
  if (row) {
    return (
      <Row alignItems="center" {...commonStyles} {...rest}>
        {children}
      </Row>
    );
  }

  return (
    <Box {...commonStyles} {...rest}>
      {children}
    </Box>
  );
};
