import React from "react";
import CreateListingForm from "./_components/CreateListingForm";
// import { getSession } from "../../../lib/session";
// import { redirect } from "next/navigation";

export default async function CreateListingPage() {

    // const session = await getSession();

    // if(!session) {
    //     redirect("/login?redirectTo=/list-room/create");
    //     return null;
    // };


  return <CreateListingForm />;
}
