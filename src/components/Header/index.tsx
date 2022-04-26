import NextLink  from "next/link"
import { Flex, Box ,Button, Image,Text, Icon} from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io"

import {Logo} from "./Logo" 
import { SingInButton } from "../SingInButton";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export  function Header() {
    const {data: session}: any = useSession()
    const [hidden, setHidden] = useState("none")

    return(
        <Flex
          justify="space-between"
          align="center"
          px={["1em", "10em"]}
          py="1em"
          bg="#032233"
          >
            <Logo />   
            {/* Verify if user is logged */}
            {session ?
                <Flex
                    align="center"
                    justify="space-around"
                    fontSize={15}
                    position="relative"
                    onClick={()=> hidden == "none" ? setHidden("show") : setHidden("none")}
                    _hover={{
                    cursor: "pointer"
                    }}
                >
                    <Image src={session?.user?.image} w="30px" borderRadius="100%" alt="User image" />
                    <Text px="0.5em"> {session?.user?.name}</Text>
                    <Icon as={IoMdArrowDropdown}
                        fontSize="30px" 
                    />

                    <Box
                        position="absolute"
                        top="100%"
                        display={hidden}
                    >
                        <Flex
                            flexDir="column"
                            align="center"
                            bg="#f5f5f5"
                            borderRadius="10px"
                            fontSize="20px"
                            p="0.5em"
                            fontWeight="bold"
                            _hover={{
                                cursor: "pointer"
                            }}
                        >
                            <Box
                                textAlign="center"
                                w="100%"
                                borderBottom="2px solid gray"
                                transition="0.5s"
                                _hover={{
                                cursor:"pointer",
                                opacity: "0.5",
                                text: "dasdasdsa"
                                }}
                                onClick={()=>setHidden("none")}
                                >
                                <NextLink href="/user/bankCoins" passHref> Bank </NextLink>
                            </Box>
                        
                            <Box
                                textAlign="center"
                                w="100%"
                                borderBottom="2px solid gray"
                                transition="0.5s"
                                _hover={{
                                cursor:"pointer",
                                opacity: "0.5"
                                }}
                                onClick={()=>setHidden("none")}
                                >
                                <NextLink href="/user/homeBroker" passHref> HomeBroker </NextLink>
                            </Box>
                        
                            <Box textAlign="center" w="100%">
                                <Button 
                                variant="unstyled"
                                border="none"
                                color="black"
                                transition="0.5s"
                                onClick={()=>signOut()}
                                _hover={{
                                    cursor:"pointer",
                                    opacity: "0.5"
                                }}
                                > SignOut 
                                </Button>
                            </Box>
                        </Flex>
                    </Box>
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
