import { Textarea } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

const StyledTextarea = forwardRef<HTMLTextAreaElement, any>((props, ref) => {
  return (
    <Textarea
      ref={ref}
      fontWeight="400"
      color="#07233D"
      fontSize="14px"
      padding="10px 16px"
      borderRadius="8px"
      border="1px solid #B2BFCA"
      focusBorderColor="#1BCDDE"
      backgroundColor='white'
      _hover={{ border: '1px solid #1BCDDE' }}
      _focus={{ border: '1px solid #1BCDDE' }}
      _selected={{ border: '1px solid #1BCDDE' }}
      {...props}
    />
  );
});

export default StyledTextarea;