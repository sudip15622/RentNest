import React from "react";
import CreateListingForm from "./_components/CreateListingForm";

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Listing | RentNest",
  description: "List your room in minutes, fill up the basic details, upload images, set rents and deposits and publish.",
};

export default async function CreateListingPage() {

  return <CreateListingForm />;
}
