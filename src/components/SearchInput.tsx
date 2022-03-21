import useState from "react"
import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchEyeLine } from "react-icons/ri";

import coins from "../services/api"

export function SearchBox(){
   
  const [search,setSearch] = useState(coins)

    const handleChange = (e)=>{
        setSearch(e.target.value.toLowerCase())
    }

  const showCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(search)
  );

    return(
        <Flex
           as='label'
           flex="1"
           py='4'
           px='8'
           ml='6'
           maxWidth={400}
           alignSelf="center"
           color="gray.200"
           position="relative"
           bg="gray.800"
           borderRadius="full"
       >
            <Input
              color="gray.50"
              variant="unstyled"
              px="4"
              mr="4" 
              placeholder="Buscar na plataforma"
              onChange={handleChange}
              _placeholder={{
                    color: 'gray.400'}}
              />

            <Icon as={RiSearchEyeLine} fontSize='20' />
       </Flex>
    );
}
