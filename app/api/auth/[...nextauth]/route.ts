import NextAuth from "next-auth";
import options from "./options";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(options);

export { handler as GET, handler as POST };
