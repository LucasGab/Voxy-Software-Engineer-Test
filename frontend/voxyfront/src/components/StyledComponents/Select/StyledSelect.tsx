import { Select } from '@chakra-ui/react';
import React, { forwardRef } from 'react';

const StyledSelect = forwardRef<HTMLSelectElement, any>((props, ref) => {
  return (
    <Select
      ref={ref}
      fontFamily="Inter"
      fontWeight="400"
      color="#07233D"
      fontSize="14px"
      borderRadius="8px"
      border="1px solid #B2BFCA"
      focusBorderColor="#1BCDDE"
      backgroundColor='white'
      _hover={{ border: '1px solid #1BCDDE' }}
      _focus={{ border: '1px solid #1BCDDE' }}
      _selected={{ border: '1px solid #1BCDDE' }}
      {...props}
    >
      {props.children}
    </Select>
  );
});

export default StyledSelect;