import { Flex , Text} from "@chakra-ui/react";
import { BsFillPersonFill } from  "react-icons/bs"

export  function Header() {
    const logged = false
    
    return(

        <Flex
          justify="space-between"
          align="center"
          p="0 10em"
          bg="#032233"
          >
            <h1>CBank</h1>   
            {logged ?
                 <p >Login</p> :  
                <Flex
                  align="center"
                  justify="space-around"
                  fontSize={25}
                >
                    <BsFillPersonFill/>
                    <Text px="0.5em">  Davi</Text>
                </Flex>
            }
        </Flex> 
    )
     
}
