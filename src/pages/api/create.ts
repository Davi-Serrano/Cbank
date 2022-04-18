import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { query as q} from "faunadb"
import { fauna } from "../../services/fauna";

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
    //Verify if method is equal POST.
    if (req.method === "POST"){
        const session: SessionProps | any = await getSession({req}); //Get the user data of session.
        const coin = req.body; //Get the coin of the body.
        
        Object.assign(coin,{
            quantify: 1
        });

        //Get user data in faunaDB.
        const user = await fauna.query<User>(
                                q.Get(
                                    q.Match(
                                        q.Index('user_by_email'),
                                        q.Casefold(session.user.email)
                                    )
                                )
                            ); 

        //If user hasn't a coin_id index, first time add a coin, on faunaDB create a coin_id index and add coin.
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
            );
        
            return res.status(200).json("Coin created");
        } else{
            //Get the coin name of body.
            const { name } = req.body;
            //Verify if user just has the coin on bank.
            const coinAlreadyExistis = user.data.coin_id.find( coin => coin.name === name);
            
            //If user has the coin add + 1 for quantify.
            if(coinAlreadyExistis){
                const coinIndex = user.data.coin_id.findIndex( coin => coin.name === name); //Get the index of coin in coin_id array.
                const coinArray = user.data.coin_id; //coin_id, bank of faunaDB.
                
                //Add + 1 in the quantify in the object of coin.
                Object.assign(coinArray[coinIndex], {
                    quantify: user.data.coin_id[coinIndex].quantify + 1
                });
                //Add the coin on faunaDB with quantify actualized.
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

                return res.status(200).json("Coin updated");
            } else{    
                //If coin dont exist on coin_id add with quatify equal 1.
                const coinArray = [...user.data.coin_id, coin]
                //Save coin on coin_id.
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
};
