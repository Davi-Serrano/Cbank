import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { query as q} from "faunadb"
import { fauna } from "../../../services/fauna";
interface CoinsFiltredProps {
 name: string;
};

interface SessionProps{
    user:{
        email: string;
    };
};



interface User{
    email: string;
    ref: {
        id:string;
    };
    data:{
        coin_id:[];
    };
};

export default async(req: NextApiRequest, res: NextApiResponse)=> {
    if (req.method === "POST"){
        const session: SessionProps | any = await getSession({req})

        const user = await fauna.query<User>(
                q.Get(
                    q.Match(
                        q.Index('user_by_email'),
                        q.Casefold(session?.user?.email)
                    )
                )
            ) 

        if(!user.data.coin_id){
            await fauna.query(
                q.Update(
                q.Ref(q.Collection('users'), user.ref.id),
                {
                    data:{
                        coin_id: [req.body],
                    }
                }
                )
            )
        
            res.status(200).json("SUCCESS")
        } else{
            const coinsAlreadyExistis = user.data.coin_id.filter((coin: CoinsFiltredProps )=>{
                return coin.name == req.body.name
            })
            

            if(coinsAlreadyExistis.length === 0){
                const coinArray = [...user.data.coin_id, req.body]

                await fauna.query(
                    q.Update(
                    q.Ref(q.Collection('users'), user.ref.id),
                    {
                        data:{
                            coin_id: coinArray,
                        }
                    }
                    )
                )
            
                res.status(200).json("SUCCESS")
            } 
        
        }   
            
    } 
}
