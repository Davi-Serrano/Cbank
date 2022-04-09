import { Flex, Text, Icon, Image } from "@chakra-ui/react"
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
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
    

    return (
        <Flex
              key={name}
              flexDir="column"
              minW="20%"
              p="1em"
              m="2em"
              h="45%"
              bg="#222222"
              borderRadius="16px"
            >
                <Text
                  as="h2"mb="-10px"
                  align="center"
                >
                  <Image src={image} px="15px" h="50px" w="50px" alt="Coin icon" />
                  {name}
                </Text>
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
                    
              <Text>
                  Buy Value: {price}
              </Text>
                        
              <Flex justify="space-around">
                  <Text>
                      Quantify:{quantify}
                  </Text>

                  <Flex w="100%" justify="space-around">      
                      <BuyButton 
                        name={name}
                        image={image}
                        current_price={price}
                        price_change_percentage_24h={price_change} 
                      />

                      <SellButton name={name}/>
                      
                     
                  </Flex>
                </Flex>

                <Flex  justify="center">
                    <Flex align="center">
                        <Text>
                          Amount:
                        </Text>       
                        <Text color="green"> 
                            {price}
                        </Text>
                    </Flex>
                </Flex>
        </Flex>  


    )

}