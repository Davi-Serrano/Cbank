import {useState} from "react"
import { Flex, Icon, Input } from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi"

// import coins from "../services/api"

export function SearchInput(){
   
  // const [search,setSearch] = useState(coins)

  //   const handleChange = (e)=>{
  //       setSearch(e.target.value.toLowerCase())
  //   }

  // const showCoins = coins.filter(coin => 
  //       coin.name.toLowerCase().includes(search)
  // );

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
              // onChange={handleChange}
              />

       </Flex>
    );
}
