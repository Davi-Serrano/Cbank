import NextLink from "next/link"

import  {Flex, Td, Tr, Image, Text, Icon} from "@chakra-ui/react"

import {BsArrowUp, BsArrowDown} from "react-icons/bs"
import {FaRegListAlt} from "react-icons/fa"

import { BuyButton } from "../BuyButton"

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
            color="black"
            fontWeight="bold"
            fontSize="20px"
            bg="#C4C4C4"
            borderBottom="9px solid #2C2C2C"
        >
            {/* Image and Coin name */}
            <Td w="200px">
                <Flex align="center">
                    <Image src={image} w="50px" alt="Icon coin" />
                    <Text pl="1em">{name}</Text>
                </Flex>
            </Td>
            {/* Price coin */}
            <Td w="100px" >
                U${current_price}
            </Td>
           {/* Verfication if coin price is positve or negative for chose your color, green and red respectively*/}
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
            {/* Buy Buton*/}
            <Td w="50px" >
                <BuyButton
                    name={id}
                    image={image}
                    current_price={current_price}
                    price_change_percentage_24h={price_change_percentage_24h} 
                />
            </Td>
            {/* Informations Link*/}
            <Td w="200px" >
                <NextLink key={id} href={`/user/coin/${id}`} passHref>     
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
                                Informations
                            </Text>
                        </Flex>
                    </a>
                </NextLink> 
            </Td>
        </Tr>
   )   
}
