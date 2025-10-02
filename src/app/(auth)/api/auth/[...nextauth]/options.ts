import { Session, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        return {
          id: "1",
          email: credentials.email,
          password: credentials.password,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, }: { session: Session; }) {
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
