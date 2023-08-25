import PrimaryButton from '@/components/StyledComponents/Button/PrimaryButton';
import BlurCard from '@/components/StyledComponents/Card/BlurCard';
import { clearBackWord, clearFrontWord, getBackWords, getFrontWords } from '@/connector/words';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function FrontHistory() {
  const { data: history, isLoading } = useQuery(['words', 'back'], () => getBackWords());
  const queryClient = useQueryClient();

  const mutationDelete = useMutation(clearBackWord, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['words', 'back']);
    },
  });

  if (isLoading)
    return (
      <Flex
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  
    return (
      <BlurCard w="100%">
        <Flex w="100%" flexDirection='column' gap='16px'>
          <Flex w="100%" justifyContent='center' marginBottom="12px">
            <Text
              fontSize="26px"
              fontWeight="bolder"
              color='white'  
            >
              Back History
            </Text>
          </Flex>
          <Flex w="100%" gap={5}>
            <Box
              flex={1}
              textAlign="center"
              fontSize="20px"
              fontWeight="500"
              color='#302d68'
            >
              Text
            </Box>
            <Box
              flex={1}
              textAlign="center"
              fontSize="20px"
              fontWeight="500"
              color='#302d68'
            >
              N° 
            </Box>
            <Box
              flex={1}
              textAlign="center"
              fontSize="20px"
              fontWeight="500"
              color='#302d68'
            >
              Words Qtd.
            </Box>
          </Flex>
          {(history || []).map((value) => (
            <Flex key={value.id} w="100%" gap={5}>
              <Box 
                flex={1}
                textAlign="center"
                fontSize="16px"
                fontWeight="500"
                color='#302d68'
                overflow='hidden'
              >
                {value.text}
              </Box>
              <Box 
                flex={1}
                textAlign="center"
                fontSize="16px"
                fontWeight="500"
                color='#302d68'
              >
                {value.id}
              </Box>
              <Box
                flex={1} 
                textAlign="center"
                fontSize="16px"
                fontWeight="500"
                color='#302d68'
              >
                {value.wordsQtd}
              </Box>
            </Flex>
          ))}
          <Flex justifyContent="flex-end" w="100%">
            <PrimaryButton
              my={2}
              onClick={() => mutationDelete.mutate()}
              isLoading={mutationDelete.isLoading}
              type="submit"
              marginTop="12px"
              minW="15%"
            >
              Clear
            </PrimaryButton>
          </Flex>
        </Flex>
      </BlurCard>
    )
}
