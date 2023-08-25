import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Flex, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import StyledTextarea from '@/components/StyledComponents/Input/StyledTextarea'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { wordsSchema } from '@/schemas/wordsSchemas'
import PrimaryButton from '@/components/StyledComponents/Button/PrimaryButton'
import StyledSelect from '@/components/StyledComponents/Select/StyledSelect'
import Image from 'next/image'
import VoxyLogo from '@/../public/voxy_l.png'
import BlurCard from '@/components/StyledComponents/Card/BlurCard'
import FrontHistory from '@/components/ControlledComponents/FrontHistory/FrontHistory'
import BackHistory from '@/components/ControlledComponents/BackHistory/BackHistory'
import { useEffect, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'
import { WordsHistory, newBackWord, newFrontWord } from '@/connector/words'
import { useMutation, useQueryClient } from 'react-query'

const inter = Inter({ subsets: ['latin'] })

type FormValues = {
  type: 'FRONT' | 'BACK'; 
  text: string;
};

export default function Home() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currResult, setCurrResult] = useState<WordsHistory | null>(null);
  const queryClient = useQueryClient();

  const mutationFront = useMutation(newFrontWord, {
    onSuccess: (newRes) => {
      // Invalidate and refetch
      setShowResult(true);
      setCurrResult(newRes);
      setValue('text','');
      queryClient.invalidateQueries(['words', 'front']);
    },
  });

  const mutationBack = useMutation(newBackWord, {
    onSuccess: (newRes) => {
      // Invalidate and refetch
      setShowResult(true);
      setCurrResult(newRes);
      setValue('text','');
      queryClient.invalidateQueries(['words', 'back']);
    },
  })

  const {
    handleSubmit,
    register,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(wordsSchema),
    defaultValues: {
      text: '',
      type: 'BACK'
    }
  });

  watch();

  useEffect(() => {
    setShowResult(false);
    setValue('text','');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getValues('type')])
  


  const onSubmit = (validatedData: FormValues) => {
    if(validatedData.type === 'FRONT') {
      mutationFront.mutate(validatedData.text);
    } else {
      mutationBack.mutate(validatedData.text);
    }
  }

  
  return (
    <>
      <Head>
        <title>Voxy Test</title>
        <meta name="description" content="Voxy Interview Test Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <BlurCard>
          <Image src={VoxyLogo} alt='Voxy Logo'></Image>
        </BlurCard>
        <BlurCard w="100%" >
          <Flex w="100%" flexDirection="column">
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
              <Flex
                w="100%"
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap="12px"
              >
                <FormControl isInvalid={Boolean(errors.type)}>
                  <FormLabel
                    fontSize="16px"
                    fontWeight="500"
                    color='#302d68'
                  >
                    <Flex alignItems='center' gap={2}>
                      Request Type
                      <Tooltip label='Defines how the request will be processed: Frontend or Backend' fontSize='medium'>
                        <QuestionIcon />
                      </Tooltip>
                    </Flex>
                  </FormLabel>
                  <StyledSelect placeholder="Select" {...register('type')}>
                    {Object.values(['BACK', 'FRONT']).map((typeValue) => (
                      <option key={typeValue} value={typeValue}>
                        {typeValue.toLocaleLowerCase()}
                      </option>
                    ))}
                  </StyledSelect>
                  <FormErrorMessage>
                    {errors.type && String(errors.type.message)}
                  </FormErrorMessage>
                </FormControl>
                <FormControl flex={1} isInvalid={Boolean(errors.text)}>
                  <FormLabel
                    fontSize="16px"
                    fontWeight="500"
                    color='#302d68'
                  >
                    Text
                  </FormLabel>
                  <StyledTextarea 
                    rows={8}
                    placeholder="Write a text to have the words quantity"
                    {...register('text')} 
                  />
                  <FormErrorMessage>
                    {errors.text && String(errors.text.message)}
                  </FormErrorMessage>
                </FormControl>
                <Flex justifyContent="flex-end" w="100%">
                  <PrimaryButton
                    my={2}
                    isLoading={isSubmitting || mutationFront.isLoading}
                    type="submit"
                    marginTop="12px"
                    minW="15%"
                  >
                    Search
                  </PrimaryButton>
                </Flex>
              </Flex>
            </form>
            {currResult && showResult && (
              <Flex w="100%" justifyContent='center' marginBottom="12px">
                <Text
                  fontSize="26px"
                  fontWeight="bolder"
                  color='white'  
                >
                  Total Words {currResult?.wordsQtd}
                </Text>
              </Flex>
            )}
          </Flex>
        </BlurCard>
        {getValues('type') === 'FRONT' ? <FrontHistory /> : <BackHistory />}
      </main>
    </>
  )
}
