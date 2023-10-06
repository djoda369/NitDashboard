import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import Admin from "@/models/Admin";
import bcrypt from "bcrypt";
import db from "@/helpers/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

db.connectDb();

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        // const username = credentials.username;

        const user = await Admin.findOne({ email });
        if (user) {
          return SignInUser({ password, user });
        } else {
          throw new Error("Wrong email or password.");
        }
      },
    }),
  ],

  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const SignInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Please enter your password.");
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Email or password is wrong!");
  }
  return user;
};
