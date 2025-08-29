import React from "react";
import EditListingForm from "./_components/EditListingForm";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Edit Listing | RentNest",
  description: "Update your room listing details, photos, pricing, and availability.",
};

interface EditListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const myParams = await params;
  return <EditListingForm listingId={myParams.id} />;
}
