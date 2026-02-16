import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAdmin = (req.auth?.user as any)?.role === "ADMIN";
  const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage) {
    if (!isLoggedIn) return NextResponse.redirect(new URL("/login", req.nextUrl));
    if (!isAdmin) return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  
  return NextResponse.next();
})

export const config = {
  matcher: ["/admin/:path*"], 
}