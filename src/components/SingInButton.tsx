import { Button, Text } from "@chakra-ui/react";
import { signIn, useSession } from 'next-auth/react'
import { DiGithubBadge } from "react-icons/di";

export function SingInButton(){
    const {data: session} = useSession()

    return(
    
        <Button 
        bg="#000000"
        color="#ffffff"
        border="none"
        borderRadius="10px"
        m="auto"
        px="2em"
        onClick={()=> signIn()} 
        _hover={{
                cursor:"pointer",
                bg:"#999999"
            }
        }
        >
            <DiGithubBadge size={30}/> 
            <Text pl="1em"> 
                Login with Github 
            </Text>
        </Button>    
    )
}