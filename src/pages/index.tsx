import { Button, Flex, Text } from '@chakra-ui/react'
import { DiGithubBadge } from "react-icons/di"

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
        <Text fontSize={20} pl="2em">Register : </Text>
        <Button
          m="auto"
          bg="#000000"
          color="#999999"
          border="none"
          
          >
          <DiGithubBadge size={30}/> <Text pl="1em"> Register with Github </Text></Button>
      </Flex>

      <Flex
        w='100%'
        flexDir="column"
        justify="space-around"
        align="flex-start"
        >
        <Text fontSize={20} pl="2em">Login : </Text>
        <Button
          m="auto"
          bg="#000000"
          color="#999999"
          border="none"
          px="2em"
          >
          <DiGithubBadge size={30}/> <Text pl="1em">  Login with Github </Text></Button>
      </Flex>

    </Flex>
  )
}

