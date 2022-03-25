import {useEffect, useState} from "react"
import {useCoins} from "../context/coins"
import { Flex, Icon, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"
import {api} from "../services/api"


export function SearchInput(){
   
  const { setCoins }= useCoins()

    const handleChange = (e:  React.FormEvent<HTMLInputElement>)=>{
      
      setCoins(e.currentTarget.value.toLowerCase())

      }
     

        
   

    return(
        <Flex
           as='label'
           bg="#C4C4C4"
           flex="1"
           py='4'
           px='8'
           m="auto"
           mt="3em"
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