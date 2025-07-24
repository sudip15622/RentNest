import { NextRequest, NextResponse } from "next/server";
import { deleteSession, getSession } from "../../../../lib/session";
import { revalidatePath } from "next/cache";
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

            if(!response.ok) throw new Error ("Backend signout failed!");
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