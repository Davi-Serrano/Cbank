import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { query as q} from "faunadb"
import { fauna } from "../../../services/fauna";

interface CoinProps {
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
        coin_id: CoinProps[];
    };
};

export default async(req: NextApiRequest, res: NextApiResponse)=> {
    if(req.method === "POST"){
        const session: SessionProps | any = await getSession({req})
        const  {name}  = req.body;

        const user = await fauna.query<User>(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email)
                )
            )
        );

        const coins = user.data.coin_id;

        const coinIndex = coins.findIndex( coin => coin.name === name);

        if(coinIndex === -1){
            console.log("coinIndex not found")
        }else{

            console.log(coinIndex)
            coins.splice(coinIndex, 1);
            console.log(coins)
    
            const coinArray = [...coins]
            
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
    
            return res.status(200).json("Coin deleted with success");
        }

   }
}
