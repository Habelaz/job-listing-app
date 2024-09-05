// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      role?: string;
      profileComplete?: boolean;
      profileStatus?: string;
    };
  }

  interface User extends DefaultUser {
    role?: string; // Adding the role property to the user object
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
  }
}
