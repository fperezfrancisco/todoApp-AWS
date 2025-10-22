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
          scope: "openid profile email offline_access",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        // Auth0 "sub" is the stable user id (e.g., "auth0|abc" or "google-oauth2|123")
        token.sub =
          token.sub ?? (profile as any)?.sub ?? account.providerAccountId;
        token.accessToken = account.access_token; // <-- for calling your API
        token.idToken = account.id_token; // optional
      }
      // Keep a few useful fields
      if (profile) {
        token.name = profile.name ?? token.name;
        token.email = (profile as any).email ?? token.email;
        token.picture = (profile as any).picture ?? token.picture;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.sub as string, // <- use as your app's userId
          email: token.email as string | undefined,
          name: token.name as string | undefined,
          image: token.picture as string | undefined,
        };
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
