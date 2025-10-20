import { Session, User } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: User & { id: string }; // Extend user with id
    accessToken?: string; // Add accessToken to session
  }

  interface User {
    id?: string; // Add id to user
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string; // Add id to token
    accessToken?: string; // Add accessToken to token
  }
}
