import { Flex, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";

interface coinProps{
    coinName: string,
}

export function BuyButton({coinName}: coinProps){ 
     async function handleAddBitCoinOnBank(){
         await axios.post("/api/auth/subscribe")

    }
    
    
    return(
        <Flex  
            align="center"
            onClick={()=>handleAddBitCoinOnBank()}
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