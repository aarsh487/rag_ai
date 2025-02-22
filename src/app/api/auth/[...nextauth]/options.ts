import prisma from "@/db/connectDb";
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          
          credentials: {
            email: { label: "email", type: "text"},
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req): Promise<any> {
           try {
            if(!credentials){
                throw new Error ("Email and password are required"); 
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: credentials.email
                }
            })
            if(!user){
                throw new Error("No user found with this email")
            }
            const isComparePassword = await bcrypt.compare(credentials.password, user.password)
            if(!isComparePassword){
                throw new Error("Incorrect password")
            }
            return user;
           } catch (error: any) {
                throw new Error(error.message || "Authentication failed");
           }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }){
            if(user){
                token.id = user.id,
                token.username = user.username,
                token.email = user.email
            }
            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user = {
                    id: token.id,
                    email: token.email,
                    username: token.username
                };
            }
            return session;
        }
      },
      session: {
        strategy: 'jwt'
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/signin"
      }
}