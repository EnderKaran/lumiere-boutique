import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // ÖNEMLİ: @/auth değil, auth.config
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const userRole = (req.auth?.user as any)?.role;
  const isAdmin = userRole === "ADMIN";
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  
  if (isAdminPage) {
    
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  
  matcher: ["/admin/:path*", "/login", "/register"], 
};