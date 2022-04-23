import  NextLink  from "next/link"

import  {Flex, Image, Text, Icon} from "@chakra-ui/react"
import { FaRegListAlt } from 'react-icons/fa'
import { BsArrowDown, BsArrowUp } from 'react-icons/bs'

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

export function CardCoins({id, symbol, name, image, total_volume, price_change_percentage_24h, current_price}: CoinProps){
    return (
        <Flex 
            key={id}
            flexDir="column"
            align='center'
            justify="center"
            w="80%"
            bg="#222222"
            borderRadius="16px"
            m="auto"
            mt="5%"
            pb="2em"
        >
            {/* Coin image and name */}
            <Text
                as="h2" 
                align="center"
            >
                <Image src={image} px="15px" h="50px" w="50px" alt="    Coin Icon" />
                {name}
            </Text>
            {/* Price change percentage */}   
            <Flex 
                w="100%"
                fontWeight="bold"
            >
            {/* Verfication if coin price is positve or negative for chose your color, green and red respectively*/}
                {price_change_percentage_24h > 0 ?
                    <Flex w="100%"  justify="space-around">
                        <Text color="green"><Icon as={BsArrowUp} color="white" /> {price_change_percentage_24h}</Text>
                        <Text>U${current_price}</Text> 
                    </Flex>
                    :
                    <Flex w="100%" justify="space-around">
                        <Text color="red">
                        <Icon as={BsArrowDown}
                        color="white" 
                    /> 
                        {price_change_percentage_24h}
                        </Text>
                        <Text>U${current_price}</Text> 
                    </Flex>
                }
            </Flex>
              {/* BuyButton and Informations Link*/}
            <Flex> 
                <BuyButton 
                  name={id}
                  image={image}
                  current_price={current_price}
                  price_change_percentage_24h={price_change_percentage_24h} 
                />                 
                <NextLink
                  key={id}
                  href={`/user/coin/${id}`}
                  passHref
                >
                    <a>
                        <Flex
                            align="center"
                            ml="1em"
                        >
                            <Icon as={FaRegListAlt} color="white"/> 
                            <Text pl="0.2em" color="white">
                                Informations
                            </Text>
                        </Flex>
                    </a>
                </NextLink> 
            
            </Flex>
        </Flex>
    )
}