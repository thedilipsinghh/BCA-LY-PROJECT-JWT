import { NextRequest, NextResponse } from "next/server";

export const proxy = (req: NextRequest) => {
    // step 1 check for cookie
    const token = req.cookies.get("USER")?.value
    const all = req.cookies.getAll()
    console.log(token);
    console.log(all);

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url)) //
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/admin/:path*"] // any route matches /admin/anything
}