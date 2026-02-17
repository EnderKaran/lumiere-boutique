import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    // Admin paneli koruması buraya gelir
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = (auth?.user as any)?.role === "ADMIN";
      const isAdminPage = nextUrl.pathname.startsWith("/admin");

      if (isAdminPage) {
        return isLoggedIn && isAdmin;
      }
      return true;
    },
  },
  providers: [], // Burası boş kalacak, auth.ts içinde dolduracağız
} satisfies NextAuthConfig;