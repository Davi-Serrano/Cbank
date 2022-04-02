import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react"
import { query as q} from "faunadb"
import { fauna } from "../../../services/fauna";

export default async(req: NextApiRequest, res: NextApiResponse)=> {
    if (req.method === "POST"){
        const session = await getSession({req})

        // const user = await fauna.query<any>(
        //         q.Get(
        //             q.Match(
        //                 q.Index('user_by_email'),
        //                 q.Casefold(session.user.id)
        //             )
        //         )
        //     )

            await fauna.query(
                q.Update(
                  q.Ref(q.Collection('users'), "327505244514680899"),
                  {
                      data:{
                          coin_id: "ethreum",
                      }
                  }
                )
              )
    } 
}
