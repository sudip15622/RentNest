import { NextRequest } from "next/server";
import { createSession } from "../../../../../lib/session";
import { redirect } from "next/navigation";


export async function GET(req: NextRequest) {

    const {searchParams} = new URL(req.url);

    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const id = searchParams.get("id");
    const image = searchParams.get("image");

    if(!accessToken || !refreshToken || !id || !image) throw new Error("Google Oauth failed!");

    await createSession({
        user: {
            id,
            image,
        },
        accessToken,
        refreshToken
    });

    redirect("/");
}