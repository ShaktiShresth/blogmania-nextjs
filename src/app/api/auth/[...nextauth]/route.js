import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import connectDB from "@/utils/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      async authorize(credentials) {
        //Check if the user exists.

        try {
          await connectDB();

          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password,
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          console.error("authorize error:", err.message);

          throw new Error(err.message || "Authentication failed!");
        }
      },
    }),
  ],
  pages: {
    signIn: "/dashboard/login",
    error: "/dashboard/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/models/User";
// import connect from "@/utils/db";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "Credentials",
//       async authorize(credentials) {
//         //Check if the user exists.
//         await connect();

//         try {
//           const user = await User.findOne({
//             email: credentials.email,
//           });

//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials.password,
//               user.password
//             );

//             if (isPasswordCorrect) {
//               return user;
//             } else {
//               throw new Error("Wrong Credentials!");
//             }
//           } else {
//             throw new Error("User not found!");
//           }
//         } catch (err) {
//           throw new Error(err);
//         }
//       },
//     }),
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   pages: {
//     error: "/dashboard/login",
//   },

// });

// export { handler as GET, handler as POST };
