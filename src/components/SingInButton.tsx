import { Button, Text } from "@chakra-ui/react";
import { signIn, useSession } from 'next-auth/react'
import { DiGithubBadge } from "react-icons/di";

export function SingInButton(){
    const {data: session} = useSession()

    console.log(session)

    return(
    
        <Button
            m="auto"
            bg="#000000"
            color="#999999"
            border="none"
            px="2em"
            onClick={()=> signIn()} 
        >
            <DiGithubBadge size={30}/> 
            <Text pl="1em"> 
                Login with Github 
            </Text>
        </Button>    
    )
}