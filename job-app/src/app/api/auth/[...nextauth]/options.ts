import NextAuth, { AuthOptions,  Session } from "next-auth";
import {JWT} from "next-auth/jwt"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const options: AuthOptions = {
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: "text",
          label: "email",
        },
        password: {
          type: "password",
          label: "password",
        },
      },
      async authorize(credentials) {
        try {
          const response = await fetch(
            "https://akil-backend.onrender.com/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Login failed");
          }

          const data = await response.json();

          if (data.success && data.data) {
            const user = {
              id: data.data.id,
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
              name: data.data.name,
              email: data.data.email,
              profilePicUrl: data.data.profilePicUrl,
              role: data.data.role,
              profileComplete: data.data.profileComplete,
              profileStatus: data.data.profileStatus,
              
            };

            console.log("Authorized user:", user);
            return user;
          } else {
            throw new Error("User data not found");
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.accessToken
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.accessToken = token.accessToken
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
}
export default options;
