import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { query as q} from "faunadb"
import { fauna } from "../../../services/fauna";

interface SessionProps{
    user:{
        email: string;
    };
};

interface CoinProps {
 name: string;
 quantify: number
};

interface User{
    email: string;
    ref: {
        id:string;
    };
    data:{
        coin_id:CoinProps[];
    };
};

export default async(req: NextApiRequest, res: NextApiResponse)=> {
    if (req.method === "POST"){
        const session: SessionProps | any = await getSession({req});
        const coin = req.body;
        
        Object.assign(coin,{
            quantify: 1
        });

        const user = await fauna.query<User>(
                q.Get(
                    q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(session.user.email)
                    )
                )
            ) 

        if(!user.data.coin_id){    
            await fauna.query(
                q.Update(
                q.Ref(q.Collection('users'), user.ref.id),
                {
                    data:{
                        coin_id: [coin],
                    }
                }
                )
            )
        
            return res.status(200).json("Coin created")
        } else{
            const { name } = req.body
            
            const coinAlreadyExistis = user.data.coin_id.find( coin => coin.name === name )
            
            if(coinAlreadyExistis){
                const coinIndex = user.data.coin_id.findIndex( coin => coin.name === name )
                const coinArray = user.data.coin_id

                Object.assign(coinArray[coinIndex], {
                    quantify: user.data.coin_id[coinIndex].quantify + 1
                })

                await fauna.query(
                    q.Update(
                        q.Ref(q.Collection('users'), user.ref.id),
                            {
                                data:{
                                    coin_id: coinArray,
                                }
                            }
                    )
                );

                return res.status(200).json("Coin updated")

            } else{    
                const coinArray = [...user.data.coin_id, coin]
                
                await fauna.query(
                    q.Update(
                        q.Ref(q.Collection('users'), user.ref.id),
                            {
                                data:{
                                    coin_id: coinArray,
                                }
                            }
                    )
                );
                
                return res.status(200).json("Coin created")
            }
            
        }   
            
    } 
}
