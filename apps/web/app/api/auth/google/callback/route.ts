import { NextRequest } from "next/server";
import { createSession } from "../../../../../lib/session";
import { redirect } from "next/navigation";
import { Role } from "../../../../../lib/types";


export async function GET(req: NextRequest) {

    const {searchParams} = new URL(req.url);

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const id = searchParams.get("id");
    const image = searchParams.get("image");
    const role = searchParams.get("role");
    const redirectTo = searchParams.get("redirectTo");

    if(!accessToken || !refreshToken || !id || !image || !role) throw new Error("Google Oauth failed!");

    await createSession({
        user: {
            id,
            image,
            role: role as Role,
        },
        accessToken,
        refreshToken
    });

    // Use the redirectTo parameter if available, otherwise default to home
    const finalRedirect = redirectTo || "/";
    
    redirect(finalRedirect);
}