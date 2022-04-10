import { GetServerSideProps } from "next"

import { Box, Flex } from "@chakra-ui/react"

import { fauna } from "../../services/fauna"
import { query as q } from "faunadb"
import { getSession } from "next-auth/react"

import { Card } from "../../components/Card"

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
  
              <Card
                key={coin.name}
                name={coin.name}
                image={coin.image}
                price={coin.current_price}
                price_change={coin.price_change_percentage_24h}
                quantify={coin.quantify}
              />
             )}           

            <Box>Amount: U$: 00,00</Box>
                         
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
