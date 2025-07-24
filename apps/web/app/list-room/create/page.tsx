import React from "react";
import CreateListingForm from "./_components/CreateListingForm";
import { getSession } from "../../../lib/session";
import { redirect } from "next/navigation";

export default async function CreateListingPage() {

  return <CreateListingForm />;
}
