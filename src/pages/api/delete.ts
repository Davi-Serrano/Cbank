import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { query as q} from "faunadb"
import { fauna } from "../../services/fauna";

interface CoinProps {
 name: string;
 quantify: number;
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
    //Verify if method is equal POST.
    if(req.method === "POST"){
        const session: SessionProps | any = await getSession({req}); ///Get the user data of session.
        const { name }  = req.body; //Get the coin name of the body.

        //Get user data in faunaDB.
        const user = await fauna.query<User>(
                                q.Get(
                                    q.Match(
                                        q.Index('user_by_email'),
                                        q.Casefold(session.user.email)
                                    )
                                )
                            );

        //All coins in faunaDB.
        const coins = user.data.coin_id;  

         //Find the index in array coins.
        const coinIndex = coins.findIndex( coin => coin.name === name);
        
        //Verify if coin exists on array.
        if(coinIndex === -1){

            return res.status(400).json({error: "Coin not found"});   
        //Verify if is the last coin on bank and delete.
        }else if(coins[coinIndex].quantify === 1){
            //Delete coin.
            coins.splice(coinIndex, 1);

            //Update the array without the coin.
            const coinArrayUpdated = [...coins] 

            //Save coins updated on faunaDB.
            await fauna.query(
                    q.Update(
                        q.Ref(q.Collection('users'), user.ref.id),
                        {
                            data:{
                                coin_id: coinArrayUpdated,
                            }
                        }
                    )
                );
                
            return res.status(200).json("Coin deleted with success");
        } else {
                const coinArrayUpdated = user.data.coin_id; // Get the array of coins. 

                //Updated quantify of coins in the bank.
                Object.assign(coinArrayUpdated[coinIndex], {
                    quantify: user.data.coin_id[coinIndex].quantify - 1
                })

                //Updated the coins datas in faunaDB.
                await fauna.query(
                            q.Update(
                                q.Ref(q.Collection('users'), user.ref.id),
                                    {
                                        data:{
                                            coin_id: coinArrayUpdated,
                                        }
                                    }
                            )
                        );

                return res.status(200).json("Coin updated")
            }
   }
}

