import { Flex ,Button, Image,Text} from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import {Logo} from "./Logo" 
import { SingInButton } from "./SingInButton";

export  function Header() {
    const {data: session}: any = useSession()
    return(

        <Flex
          justify="space-between"
          align="center"
          p="1em 10em"
          bg="#032233"
          >
            <Logo />   
            {session ?
                 <Flex
                 align="center"
                 justify="space-around"
                 fontSize={25}
               >
                   <Image src={session?.user?.image} w="50px" borderRadius="100%" />
                   <Text px="0.5em"> {session?.user?.name}</Text>
                   <Button
                     bg="#000000"
                     color="#ffffff"
                     border="none"
                     borderRadius="10px"
                     m="auto"
                     px="2em"
                     onClick={()=> signOut()} 
                     _hover={{
                             cursor:"pointer",
                             bg:"#999999"
                         }
                      }
                     >
                      signOut
                   </Button>
               </Flex>
                :  
                <Flex
                 align="center"
                 justify="space-around"
                 fontSize={25}
               >

               <SingInButton />
                </Flex>
            }
        </Flex> 
    )
     
}
