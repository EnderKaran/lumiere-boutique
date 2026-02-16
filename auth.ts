// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" }, // JWT (JSON Web Token) kullanacağız
  pages: {
    signIn: '/login', // Giriş sayfası için kendi özel sayfamızı kurgulayacağız
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 1. Kullanıcıyı veritabanında bul
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // 2. Kullanıcı yoksa veya şifresi yoksa reddet
        if (!user || !user.password) {
          return null;
        }

        // 3. Şifreleri karşılaştır
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // 4. Her şey doğruysa kullanıcıyı döndür
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // Admin paneli için bu çok önemli
        };
      }
    })
  ],
  callbacks: {
    // Token içine rol bilgisini gömüyoruz (Admin kontrolü için)
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    // Frontend'de (Client) session içinde rolü okuyabilmek için aktarıyoruz
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    }
  }
})