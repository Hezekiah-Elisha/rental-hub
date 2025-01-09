import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },

  //   pages: {
  //     signIn: "/signin",
  //   },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "e.g. jsmith@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "e.g. 12345678",
        },
      },
      async authorize(credentials, req) {
        const { csrfToken, ...credentialsWithoutCsrf } = credentials;

        const res = await fetch("https://api.rental.hub.ke/users/auth/login", {
          method: "POST",
          body: JSON.stringify(credentialsWithoutCsrf),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log(user);
        if (res.ok) {
          return {
            access_token: user.access_token,
            refresh_token: user.refresh_token,
            user: user.user,
          };
        } else {
          return null;
        }
        // return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };

// import React from "react";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username",
//           type: "text",
//           placeholder: "jsmith",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       async authorize(credentials, req) {
//         const res = await fetch("https://api.rental.hub.ke/users/auth/login", {
//           method: "POST",
//           body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" },
//         });
//         const user = await res.json();

//         if (res.ok) {
//           return user;
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],
//   // callbacks: {
//   //     async jwt({ token, user }) {
//   //         return { ...token, ...user }
//   //     },
//   //     async session({ session, token, user }) {
//   //         session.user = token
//   //         return session
//   //     }
//   // },
//   // pages: {
//   //     signIn: "/login"
//   // },
//   secret: process.env.NEXTAUTH_SECRET,
// };
// const handler = NextAuth(authOptions);
