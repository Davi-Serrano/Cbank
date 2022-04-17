import { Flex, Text, Icon } from "@chakra-ui/react";
import axios from "axios";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useRouter } from "next/router"

interface CoinProps {
    name: string;
    image: string;
    price_change_percentage_24h: number;
    current_price: number;
}

export function BuyButton({name, image, current_price, price_change_percentage_24h}: CoinProps){ 
    const router = useRouter()
    //Data for POST in faunaDB API
    const coin = {
        name,
        image,
        price_change_percentage_24h,
        current_price,
    }
    //POST in faunaDB API 
    const handleCoinOnBank = async(coin: CoinProps)=>{
        await axios.post("/api/create", coin)
        router.reload()
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