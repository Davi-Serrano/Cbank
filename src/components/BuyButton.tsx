import { Flex, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";

interface CoinProps {
    name: string,
    image: string,
    price_change_percentage_24h: number,
    current_price: number,
}

export function BuyButton({name, image, current_price, price_change_percentage_24h}: CoinProps){ 

    const coin = {
        name,
        image,
        price_change_percentage_24h,
        current_price
    }

     async function handleCoinOnBank(coin: CoinProps){
        const response = await axios.post("/api/auth/subscribe", coin)

    }
    
    
    return(
        <Flex  
            align="center"
            onClick={()=>handleCoinOnBank(coin)}
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