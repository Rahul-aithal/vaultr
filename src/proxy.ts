import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login"];
const protectedRoutes = ["/dashboard","/upload"];
export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
  const path = request.nextUrl.pathname;
  const isPublic = publicRoutes.includes(path);
  const isProtected = protectedRoutes.includes(path);

    if(isProtected&&!session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if(isPublic&&session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard","/login","/upload"], // Specify the routes the middleware applies to
};
