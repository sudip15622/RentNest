import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";


export default async function middleware(req: NextRequest) {
    const session = await getSession();
    
    if(!session || !session?.user) {
        // Get the current pathname
        const currentPath = req.nextUrl.pathname;
        
        // Create login URL with redirectTo parameter
        const loginUrl = new URL("/login", req.nextUrl);
        loginUrl.searchParams.set("redirectTo", currentPath);
        
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile", "/list-room/create"],
}