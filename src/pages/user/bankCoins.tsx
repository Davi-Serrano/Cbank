import { GetServerSideProps } from "next"

import { Box, Flex, Icon } from "@chakra-ui/react"

import { fauna } from "../../services/fauna"
import { query as q } from "faunadb"
import { getSession } from "next-auth/react"

import { Card } from "../../components/Card"

import {AiFillEye,  AiFillEyeInvisible} from "react-icons/ai" 
import { useState } from "react"

interface CoinProps{
    name: string;
    image: string;
    current_price: number,
    price_change_percentage_24h:number 
    quantify:number;
  }
  
interface CoinsProps {
  coins: CoinProps[];
}

export default function bankCoins ({coins}: CoinsProps){

  const [icon, setIcon]= useState("none")

    const amount = coins.reduce( (acc, coin)=>{
      return acc + coin.current_price * coin.quantify
    }, 0)
 
      return(
        <Box
          mx="auto"
          mt="2em"
          maxW="80%"
          >
            <Flex
              justify="end"
              align="center"
              fontSize="22px"
              fontWeight="bold"
              >
                Amount: U$ <Box display={icon}>{amount.toFixed(2)}  </Box>

              { icon === "none" ? 
                <Icon as={AiFillEye} 
                px="0.5em"
                onClick={()=> setIcon("show")}
                _hover={{
                  cursor: "pointer"
                }}
                /> :
                <Icon as={AiFillEyeInvisible} 
                px="0.5em"
                onClick={()=> setIcon("none")}
                _hover={{
                  cursor: "pointer"
                }}
                />
              }
            
            </Flex>

            <Flex
              justify="space-around"
              align="center"
              fontWeight="bold"
              maxW="100%"
              bg="#2C2C2C"
              
              py="2em"
              flexWrap="wrap"
              zIndex="-1"
            >
                        
                {coins.map(( coin: CoinProps) =>
      
                  <Card
                    key={coin.name}
                    name={coin.name}
                    image={coin.image}
                    price={coin.current_price}
                    price_change={coin.price_change_percentage_24h}
                    quantify={coin.quantify}
                  />
                )}           


                            
          </Flex>
            
       </Box>
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


  if(user.data.coin_id | user.data.coin_id.length > 0 ){

    const coins = user.data.coin_id
    
    return{
      props:{
        coins,
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
