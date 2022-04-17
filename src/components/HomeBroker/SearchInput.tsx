import {useCoins} from "../../context/coins"

import { Flex, Icon, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"

export function SearchInput(){
   //SetSearch on search Context
  const { setSearch }= useCoins()
  //When Element in Search Input change add on search for filtred coins on HomeBroker display
  const handleChange = (e:  React.FormEvent<HTMLInputElement>)=>{
    setSearch(e.currentTarget.value.toLowerCase())
  }
     
    return(
      <Flex
          as='label'
          bg="#C4C4C4"
          flex="1"
          py='4'
          px='8'
          m="auto"
          mt={["6em", "3em"]}
          w="50%"
          alignSelf="center"
          position="relative"
           borderRadius="full"
       >
        <Icon as={BiSearch} color="black" fontSize='25' />
        <Input
          variant="unstyled"
          px="4"
          border="none"
          fontWeight="bold"
          onChange={handleChange}
        />
      </Flex>
    );
}