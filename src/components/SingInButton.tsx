import { Button, Text } from "@chakra-ui/react";
import { signIn } from 'next-auth/react'
import { DiGithubBadge } from "react-icons/di";

export function SingInButton(){

    return(
    
        <Button 
        bg="#000000"
        color="#ffffff"
        border="none"
        borderRadius="10px"
        m="auto"
        px={["0.5em","2em"]}
        onClick={()=> signIn('github')} 
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