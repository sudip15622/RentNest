import { NextRequest, NextResponse } from "next/server";
import { deleteSession, getSession } from "../../../../lib/session";
import { revalidatePath } from "next/cache";
import { refreshToken } from "../../../../lib/auth";
import { BACKEND_URL } from "../../../../lib/constants";

export async function GET(req: NextRequest) {
    try {
        const session = await getSession();
        
        if (session?.accessToken) {
            // Try signout with current access token first
            let response = await fetch(`${BACKEND_URL}/auth/signout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session.accessToken}`,
                },
            });

            // If token is expired, try to refresh and signout again
            if (response.status === 401 && session.refreshToken) {
                console.log("Access token expired during signout, attempting refresh");
                
                const tokenResult = await refreshToken(session.refreshToken);
                
                if (tokenResult) {
                    // Try signout again with fresh token
                    await fetch(`${BACKEND_URL}/auth/signout`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tokenResult.accessToken}`,
                        },
                    });
                }
            }
        }
    } catch (error) {
        // Even if backend signout fails completely, we still clear local session
        console.error("Backend signout failed:", error);
    }

    // Always delete local session regardless of backend response
    await deleteSession();
    
    revalidatePath("/");
    return NextResponse.redirect(new URL("/", req.nextUrl));
}