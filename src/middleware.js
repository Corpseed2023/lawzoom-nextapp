import { NextResponse } from "next/server";

export function middleware(req) {
  console.log("middleware");
//   const { pathname } = req.nextUrl;

//   if (pathname != "/login")
//     return NextResponse.redirect(new URL("/login", req.url));
}
