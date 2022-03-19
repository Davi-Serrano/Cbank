import { Flex } from "@chakra-ui/react";

export  function Header() {
    const logged = false
    
    return(

        <Flex
          justifyContent="space-between"
          align="center"
          p="0.5em 10em"
          bg="#032233"
          >
            <h1>CBank</h1>  {logged ? <p >Login</p> : <p> Davi</p>}
        </Flex> 
    )
     
}