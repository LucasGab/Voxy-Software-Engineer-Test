import { Box } from '@chakra-ui/react'
import React from 'react'

export default function BlurCard({children, ...rest}: any) {
  return (
    <Box
      padding="24px" 
      borderRadius="10px" 
      backgroundColor="rgb(255,255,255, 0.5)"
      boxShadow="0 15px 25px rgba(129, 124, 124, 0.2)"
      backdropFilter="blur(14px)"
      {...rest}
    >
      {children}
    </Box>
  )
}
