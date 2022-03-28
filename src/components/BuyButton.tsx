import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

interface coinProps{
    coinName: string,
}

export function BuyButton({coinName}: coinProps){
    return(
        <Flex  
            align="center"
            onClick={()=>{alert(coinName)}}
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