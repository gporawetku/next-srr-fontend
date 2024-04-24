import axios from "axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) return null;
          const response: any = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/users/signin", credentials);
          const responseData = response?.data;

          if (responseData) {
            return responseData;
          } else {
            return null;
          }
        } catch (errors) {
          console.error(errors);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.accessToken = user.token.access_token;
        token.id = user.user.id;
        token.user = user.user;
      }
      return token;
    },
    session: async ({ session, token, user }: any) => {
      if (token) {
        session.accessToken = token.accessToken;
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  debug: false,
});

export { handler as GET, handler as POST };
