import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { fauna } from "../services/fauna";
import {  query as q } from "faunadb"
import { useSession } from "next-auth/react";

interface coinProps{
    coinName: string,
}

interface User{
    user:{
        ref:{
            email: string
        }
    }
}

export function BuyButton({coinName}: coinProps){
    const {data: session}: any = useSession()

    
     function handleAddBitCoinOnBank(coin: string){
        alert(coin)
    }
    
    
    return(
        <Flex  
            align="center"
            onClick={()=>handleAddBitCoinOnBank(coinName)}
            _hover={{
                cursor: "pointer",
                color: "green"
            }}
        >
            <Icon as={FaRegMoneyBillAlt} /> 
            <Text pl="0.2em">
                Buy
            </Text>
        </Flex>
    )
}