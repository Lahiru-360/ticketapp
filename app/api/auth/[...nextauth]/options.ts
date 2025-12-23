import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {
  pages: {
    signIn: "/api/auth/login",
  },
  providers: [
    CredentialsProvider({
      id: "password",
      name: "Username and Password",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username..",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const user = await prisma.user.findUnique({
          where: { username: credentials!.username },
        });
        if (!user) {
          return null;
        }

        console.log("User: ", user);

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!match) {
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
        token.username = (user as any).username;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as number;
        session.user.role = (token.role as string) || "USER";
        session.user.username =
          (token.username as string) || session.user.username;
      }
      return session;
    },
  },
};

export default options;
