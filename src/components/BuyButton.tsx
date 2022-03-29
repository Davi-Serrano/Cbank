import { Flex, Text, Icon } from "@chakra-ui/react";
import { FaRegMoneyBillAlt } from "react-icons/fa";

import { fauna } from "../services/fauna";
import {  query as q } from "faunadb"
import { useSession } from "next-auth/react";

interface coinProps{
    coinName: string,
}



export function BuyButton({coinName}: coinProps){
    const {data: session}: any = useSession()

    
    async function handleAddBitCoinOnBank(coin: string){

            // const user = await fauna.query<User>(
            //     q.Get(
            //         q.Match(
            //             q.Index("user_by_email"),
            //             q.Casefold(session.user.name)
            //             )
            //         )
            //     )
                        
           
                await fauna.query(
                    q.Update(
                        q.Ref(q.Collection("users"), "daviscardoso2901@gmail.com"),
                        {
                            data: {
                                coin_id: "bitcoin",
                            }, 
                        },
                    )        
                ).then((ret) => console.log(ret))
                .catch((err) => console.error(
                  'Error: [%s] %s: %s',
                  err.name,
                  err.message,
                  err.errors()[0].description,
                ))
        
    }
    
    
    return(
        <Flex  
            align="center"
            onClick={()=>handleAddBitCoinOnBank(coinName)}
            _hover={{
                cursor: "pointer",
                color: "green"
            }}
        >
            <Icon as={FaRegMoneyBillAlt} /> 
            <Text pl="0.2em">
                Buy
            </Text>
        </Flex>
    )
}