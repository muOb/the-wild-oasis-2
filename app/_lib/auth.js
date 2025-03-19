import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRERT,
    }),
  ],

  //this callback executed if user match the /accout url in middleware.js
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user; // !! to convert anythign to boolean in this case  mean Ther is user?
    },
    //this signIn run before the actual signup process happens
    async signIn({ user, accoutn, profile }) {
      try {
        const exisitingGuest = await getGuest(user.email);
        if (!exisitingGuest)
          await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch {
        return false;
      }
    },
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
