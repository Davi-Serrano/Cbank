import {Flex, Text, Icon, Image } from "@chakra-ui/react"
import { BsArrowUp } from "react-icons/bs"
import { FaRegMoneyBillAlt } from "react-icons/fa"

export default function bankCoins (){
      return(
        <Flex
          justify="space-around"
          align="center"
          fontWeight="bold"
          maxW="80%"
          bg="#2C2C2C"
          mx="auto"
          mt="2em"
          py="2em"
          flexWrap="wrap"
         >
            <Flex
              flexDir="column"
              p="1em"
              h="45%"
              bg="#222222"
            >
              <Text
                as="h2"mb="-10px"
                align="center"
              >
                Bitcoin
              </Text>
              <Flex>
                
                    <Image src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" mt="-30px" h="50px" w="50px" />
                
                    <Flex w="100%" justify="space-around">
                      <Text color="green"><Icon as={BsArrowUp} color="white" /> 6.85</Text>
                      <Text>U$42658,00</Text>
                    </Flex>
              </Flex>
                    
              <Text>
                  Valor da Compra: U$42558.85
              </Text>
                        
              <Flex justify="space-around">
                  <Text>
                      Quantidade:2
                  </Text>

                  <Flex w="100%" justify="space-around">      
                      <Flex  align="center">
                          <Icon color="green" as={FaRegMoneyBillAlt} /> 
                          Buy
                      </Flex>
                      
                      <Flex    align="center">
                          <Icon color="red" as={FaRegMoneyBillAlt} /> 
                          Sell
                      </Flex>
                  </Flex>
                </Flex>

                <Flex  justify="center">
                    <Flex align="center">
                        <Text>
                          Total:
                        </Text>       
                        <Text color="green"> 
                            U$35.251,00
                        </Text>
                    </Flex>
                </Flex>
            </Flex>                                      
       </Flex>
    )
}

export const getServerSideProps: GetServerSideProps =  async ({req})=>{
       const user = await fauna.query(
          q.Get(
              q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(session.user.email)
              )
          )
        )
                                                        
      const userCoins = await fauana.query(
        q.Get(
          q.Ref(q.Collection("users), user))
        )
      )
        return:{
              props:{
                    userCoins
              }        
       }
}
