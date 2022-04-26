import { useState } from "react"
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"

import { fauna } from "../../services/fauna"
import { query as q } from "faunadb"

import { Box, Flex, Text,Icon} from "@chakra-ui/react"
import {AiFillEye,  AiFillEyeInvisible} from "react-icons/ai" 

import { Card } from "../../components/Card"
import { Session } from "next-auth"

interface CoinProps{
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h:number 
    quantify:number;
};
  
interface CoinsProps {
  coins: CoinProps[];
};

export default function BankCoins ({coins}: CoinsProps){
  //State of Icon. 
  const [IconEyes, SetIcon] = useState<DocumentVisibilityState>("hidden");
  //Calculate amount of coins value.
  const amount = coins.reduce( (acc, coin)=>{
    return acc + coin.current_price * coin.quantify
  }, 0);
  //Formatted amount.
  const amountFormatted = new Intl.NumberFormat('en-US', {
                                  style: "currency", 
                                  currency: "USD", 
                                  minimumFractionDigits: 2,
                                }).format(amount);
  //If user dont have any coin in bank. 
  if(coins.length === 0){
    return(
      <>
        <Head>
            <title>Bank | CBank</title>
        </Head>
        
            <Flex
                justify="center"
                align="center"
                fontSize="large"
                fontWeight="bold"
              >

                <Text>When you buy a coin it will display here.</Text>
              </Flex>
      
      </>
    )
  }                           
//If user have any coin in bank. 
  return (
    <>
       <Head>
            <title>Bank | CBank</title>
        </Head>

        <Box
          mx="auto"
          mt="2em"
          maxW="80%"
        >
              {/* Amount all of value coins */}
              <Flex
                justify="end"
                align="center"
                fontSize="22px"
                fontWeight="bold"
              >
                  Amount:
                      <Box visibility={IconEyes}>
                        U{amountFormatted}  
                      </Box>     

                  {/* Verifiction if icon eyes is hidden or not */}                  
                  { IconEyes === "hidden" ? 
                    <Icon as={AiFillEye} 
                        px="0.5em"
                        onClick={()=> SetIcon("visible")}
                        _hover={{
                          cursor: "pointer"
                        }}
                    /> 
                      :
                    <Icon as={AiFillEyeInvisible} 
                      px="0.5em"
                      onClick={()=> SetIcon("hidden")}
                      _hover={{
                        cursor: "pointer"
                      }}
                    />
                  }
              </Flex>
              {/* Show all coin onthe bank */}
              <Flex
                justify="space-around"
                align="center"
                fontWeight="bold"
                maxW="100%"
                bg="#2C2C2C"
                
                py="2em"
                flexWrap="wrap"
              >  
                  {coins.map((coin: CoinProps) =>
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
    </>
  )
}

interface User{
  data:{
    coin_id: CoinProps[];
  }
}

export const getServerSideProps: GetServerSideProps =  async ({req})=>{
  const session: Session | null = await getSession({req})
  //Verifcion if user is logged, else redirect to home.
  if(!session){
    return{
      redirect:{
        destination: "/",
        permanent: false
      }
    }
  };
  //Get the data on faunadb.
  const user = await fauna.query<User>(
    q.Get(
        q.Match(
            q.Index('user_by_email'),
            q.Casefold(session.user.email)
        )
    )
  );
  //Verification if user has coin on the bank, else redirect to home.
  if(user.data.coin_id){
    if(user.data.coin_id.length > 0){
      const coins = user.data.coin_id

      return{
        props:{
        coins,
      }        
    }
  }
  };
  //If user haven´t coin on the bank show a messager.
  return {
    props:{
      coins: []
    }        
  };
};
