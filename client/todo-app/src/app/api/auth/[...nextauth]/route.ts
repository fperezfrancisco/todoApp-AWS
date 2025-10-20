import NextAuth from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER, // e.g., https://your-tenant.us.auth0.com
      authorization: {
        params: {
          audience: "https://dev-51fgf5hduh0noq18.us.auth0.com/api/v2/",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = (user as { sub?: string }).sub; // Cast user to include sub
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
