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

    if(req.method === "DELETE"){
        const session = await getSession({req});
        const { name } = req.body;

        const user = await fauna.query(
            q.Get(
                q.Match(
                    q.Index('user_by_email'),
                    q.Casefold(session.user.email);
                )
            )
        );

        const coins = user.data.coin_id;

        const coinIndex = coins.findIndex( coin => coin.name === name);

        if(coinIndex === -1){
            return response.status(400).json({error: "Coin not found"}) 
        };

        coins.slice(coinIndex, 1);

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

        return response.status(200).json("Coin deleted with success");

   }
}
