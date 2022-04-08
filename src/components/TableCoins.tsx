import Link from "next/link"

import  {Flex, Td, Tr, Image, Text, Icon} from "@chakra-ui/react"


import {BsArrowUp, BsArrowDown} from "react-icons/bs"
import {FaRegListAlt} from "react-icons/fa"

import { BuyButton } from "./BuyButton"

interface CoinProps {
    id: string,
    symbol: string,
    name: string,
    image: string,
    total_volume: number,
    price_change_percentage_24h: number,
    current_price: number,
}

export function TableCoin({id, symbol, name, image, total_volume, price_change_percentage_24h, current_price}: CoinProps){
   
   return(
        <Tr
            key={id}
            color="black"
            fontWeight="bold"
            fontSize="20px"
            bg="#C4C4C4"
            borderBottom="9px solid #2C2C2C"
        >
                <Td>
                    <Flex align="center">
                        <Image src={image} w="50px" />
                        <Text pl="1em">{name}</Text>
                    </Flex>
                </Td  >
                <Td w="100px" >U{current_price}</Td>
            
                    {price_change_percentage_24h > 0 ? 
                    
                        <Td w="50px" color="#1BAE2A">
                            <Flex align="center">
                                <Icon as={BsArrowUp}  /> 
                                <Text>
                                    {price_change_percentage_24h}
                                </Text>
                            </Flex>
                        </Td> 
                        :
                        <Td w="50px" color="red">
                            <Flex align="center">
                            <Icon as={BsArrowDown} rotate="180" /> 
                                <Text>
                                    {price_change_percentage_24h}
                                </Text>
                            </Flex>
                        </Td>
                        }   
                
                <Td w="50px" >
                        <BuyButton name={id} image={image} current_price={current_price} price_change_percentage_24h={price_change_percentage_24h}     />
                </Td>
                <Td w="50px" >
                    <Link key={id} href={`/user/coin/${id}`}>    
                        <a>
                            <Flex
                                align="center"
                                _hover={{
                                cursor: "pointer",
                                color: "#07a5fa"
                            }}
                                >
                                <Icon as={FaRegListAlt} /> 
                                <Text pl="0.2em">
                                    Informartions
                                </Text>
                            </Flex>
                        </a>
                    </Link> 
                </Td>
        </Tr>
   )   
}