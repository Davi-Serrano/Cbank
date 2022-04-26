import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { query as q } from "faunadb"
import { fauna } from "../../../services/fauna"

interface User {
  user:{
    email: string
  } 
};

declare module "next-auth" {
  interface Session {
    user:{
      email: string;  
    }
  }
}

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET, 
  //Configuration of providers 
  providers: [
    //Github
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
  ],
  //When user signIn callback function is called
  callbacks: {
    async signIn({user}: any){
      const  { email } = user
      //Save on faunaDB the user email 
        try{
            await fauna.query<User>(
              //If don't exits create a index 
                q.If(
                  q.Not(
                    q.Exists(
                      q.Match(
                        q.Index("user_by_email"),
                        q.Casefold(user.email) 
                      )
                    )
                  ),
                  q.Create(
                    q.Collection("users"),
                      { data: { email }}
                  ),
                  //If exits get the email
                  q.Get(
                    q.Match(
                      q.Index("user_by_email"),
                      q.Casefold(user.email)
                    )
                  )
                )
            ); 
          return true
        }catch{
          return false
        }
    },
  }
})