import { GetServerSideProps } from "next"

import { Flex, Text, Icon, Image } from "@chakra-ui/react"
import { MdAttachMoney } from "react-icons/md"
import { BsArrowDown, BsArrowUp } from "react-icons/bs"
import { FaRegMoneyBillAlt } from "react-icons/fa"


import { fauna } from "../../services/fauna"
import { query as q } from "faunadb"
import { getSession } from "next-auth/react"

interface CoinProps{
    name: string;
    image: string;
    current_price: number,
    price_change_percentage_24h:number
    totalValue: number
}

interface CoinsProps {
  coins: Array<CoinProps>;
}


export default function bankCoins ({coins, totalValue}: CoinsProps){
  
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
          zIndex="-1"
         >
                    
            {coins.map(( coin: CoinProps) =>
              <Flex
              key={coin.name}
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
                  <Image src={coin.image} px="15px" h="50px" w="50px" />
                  {coin.name}
                </Text>
              <Flex >
                  {coin.price_change_percentage_24h > 0 ?
                    <Flex w="100%"  justify="space-around">
                        <Text color="green"><Icon as={BsArrowUp} color="white" /> {coin.price_change_percentage_24h}</Text>
                        <Text>{coin.current_price}</Text> 
                    </Flex>
                      :
                    <Flex w="100%" justify="space-around">
                        <Text color="red"><Icon as={BsArrowDown} color="white" /> {coin.price_change_percentage_24h}</Text>
                        <Text>{coin.current_price}</Text> 
                    </Flex>
                  }
              </Flex>
                    
              <Text>
                  Valor da Compra: {coin.current_price}
              </Text>
                        
              <Flex justify="space-around">
                  <Text>
                      Quantidade:1
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
                            {coin.current_price}
                        </Text>
                    </Flex>
                </Flex>
            </Flex>  
              
              )}           

              <Flex
            align="center"
            fontSize="20px"
            >

            <Text>
              Amount :
            </Text>
              <Icon
                as={MdAttachMoney}
                p="5px" 
              />

            <Text>
              {totalValue}
            </Text>

          </Flex> 
                         
       </Flex>
    )
}

export const getServerSideProps: GetServerSideProps =  async ({req})=>{
  const session:any = await getSession({req})

  if(!session){
    return{
      redirect:{
        destination: "/",
        permanent: false
      }
    }
  }
  const user = await fauna.query<any>(
    q.Get(
        q.Match(
            q.Index('user_by_email'),
            q.Casefold(session.user.email)
        )
    )
  )


  if(user.data.coin_id){

    const coins = user.data.coin_id
    
    const coinsPrice = coins.map((a: any)=>{
      const formtatSintd = a.current_price.replace("$", "").replace(",", ".")
      return parseFloat(formtatSintd)
    })

    const totalValue = coinsPrice.reduce((a: number, b: number)=>{
       const total = a + b
       return total
    })

    
    
    return{
      props:{
        coins,
        totalValue
      }        
    }
  }

  return{
    redirect:{
      destination: "/user/homeBroker",
      permanent: false
    }
  }

}
