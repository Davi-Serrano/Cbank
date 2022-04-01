import {Flex, Text, Icon, Image } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { BsArrowUp } from "react-icons/bs"
import { FaRegMoneyBillAlt } from "react-icons/fa"
import { fauna } from "../../services/fauna"
import { query as q } from "faunadb"
import { getSession } from "next-auth/react"

export default function bankCoins ({coins}:any){
  
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
            {coins.map( coin =>
              <Flex
              key={coin}
              flexDir="column"
              p="1em"
              h="45%"
              bg="#222222"
              borderRadius="16px"
            >
              <Text
                as="h2"mb="-10px"
                align="center"
              >
                {coin}
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
              
              )}                                    
       </Flex>
    )
}

export const getServerSideProps: GetServerSideProps =  async ({req})=>{
      
  const session: any = await getSession({req})
       const user = await fauna.query<any>(
          q.Get(
              q.Match(
                  q.Index('user_by_email'),
                  q.Casefold(session.user.email)
              )
          )
        )
        const coins = user.data.coin_id

        return{
              props:{
                coins
              }        
       }
}
