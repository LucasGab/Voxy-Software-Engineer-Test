import { Button } from '@chakra-ui/react';
import React from 'react';

function PrimaryButton({ children, typeButton, ...rest }: any) {
  return (
    <Button
      padding="10px 16px"
      borderRadius="8px"
      minHeight="40px"
      height="auto"
      wordBreak="break-word"
      whiteSpace="normal"
      fontWeight="bolder"
      fontSize=".97em"
      letterSpacing=".03em"
      backgroundColor='#1BCDDE'
      color='white'
      _hover={{
        backgroundColor: 'white',
        color: '#1BCDDE'
      }}
      borderColor="#1BCDDE"
      borderWidth={2}
      {...rest}
    >
      {children}
    </Button>
  );
}

export default PrimaryButton;