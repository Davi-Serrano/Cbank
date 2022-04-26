import { FaRegMoneyBillAlt } from "react-icons/fa";
import { useRouter } from "next/router";

import axios from "axios";

import { Flex, Text, Icon, useToast } from "@chakra-ui/react";

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
    //Toastfy mensage
    const toast = useToast();
    //POST in faunaDB API 
    const handleCoinOnBank = async(coin: CoinProps)=>{
        try{
            await axios.post("/api/create", coin)
            toast({
                title: 'Your Purchase are OK!.',
                description: `${name} was add in your bank.`,
                status: 'success',
                duration: 4000, //4 seconds
                isClosable: true,
            })
            router.reload();
        } catch {
            toast({
                title: 'Sorry Your Purchase Failed.',
                description: "We cant concluision your purchase, try again later.",
                status: 'error',
                duration: 4000, //4 seconds
                isClosable: true,
            })
            router.reload();
        };
    };
    
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