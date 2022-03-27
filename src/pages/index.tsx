import {  Flex, Text } from '@chakra-ui/react'
import { SingInButton } from '../components/SingInButton'

export default function Home() {
  
   return (
    <Flex
      flexDir="column"
      justify="center"
      align="center"
      bg="#032233"
      fontWeight="bold"
      border="3px solid #707070"
      borderRadius="16px"
      w="35%"
      h="400px"
      m="auto"
      mt="5em"
    >
      <Text fontSize={30}> Welcome to CBank </Text>

      <Flex
        w='100%'
        flexDir="column"
        justify="space-around"
        align="flex-start"
        >
          <Text fontSize={20} pl="2em">Login : </Text>
          <SingInButton />
        </Flex>

    </Flex>
  )
}

