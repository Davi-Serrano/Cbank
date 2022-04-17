import { Flex, Text, Icon, Image } from "@chakra-ui/react"
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { BuyButton } from "./BuyButton";

import { SellButton } from "./SellButton"

interface CoinProps{
    name: string;
    image: string;
    price: number,
    price_change:number 
    quantify:number;
  }

export function Card({name, image, price, price_change, quantify}:CoinProps){
  //Calculate the total amount off each coin
  const coinAmount = price * quantify

  return (
    <Flex
      flexDir="column"
      w="200px"
      p="1em"
      m="2em"
      h="45%"
      bg="#222222"
      borderRadius="16px"
    >
      {/* Coin image and name */}
        <Text
          as="h2"mb="-10px"
          align="center"
        >
          <Image src={image} px="15px" h="50px" w="50px" alt="Coin icon" />
            {name}
        </Text>
      {/* Show price change and verfication if your value is positve or negative for chose your color, green and red respectively*/}
        <Flex >
          {price_change > 0 ?
            <Flex w="100%"  justify="space-around">
                <Text color="green"><Icon as={BsArrowUp} color="white" /> {price_change}</Text>
                <Text>{price}</Text> 
            </Flex>
              :
            <Flex w="100%" justify="space-around">
                <Text color="red">
                  <Icon as={BsArrowDown}
                    color="white" 
                    /> 
                      {price_change}
                </Text>
                <Text>{price}</Text> 
            </Flex>
          }
        </Flex>
      {/* Buy value of coins */}
        <Text>
            Buy Value: U${price}
        </Text>
      {/* Quantify, and Buttons */}
        <Flex justify="space-around">
            <Text>
                Quantify:{quantify}
            </Text>
            {/* Buy Button and Sale Buton */}
            <Flex
              w="100%"
              justify="space-around"
            >     
                <BuyButton 
                  name={name}
                  image={image}
                  current_price={price}
                  price_change_percentage_24h={price_change} 
                />
                <SellButton name={name}/> 
            </Flex>
        </Flex>
      {/* Coin amount */}
        <Flex
          justify="center"
          align="center"
        >
            <Text>
              Amount:
            </Text>       
            <Text color="green"> 
                U${coinAmount.toFixed(2)}
            </Text>
        </Flex>
    </Flex>  
  )
}