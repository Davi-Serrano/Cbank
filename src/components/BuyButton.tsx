import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

export function BuyButton(){
    return(
        <Flex  
            align="center"
            onClick={()=>{alert("Hello Word")}}
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