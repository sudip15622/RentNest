import { notFound } from "next/navigation";
import Listing from "./_components/Listing";
import { BACKEND_URL } from "../../../lib/constants";

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getListingDetails(id: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/listing/${id}`, {
      cache: 'no-store', // Always fetch fresh data for listing details
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null; // Listing not found
      }
      throw new Error('Failed to fetch listing details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching listing:', error);
    return null;
  }
}

export default async function ListingPage({ params }: ListingPageProps) {
  const awaitedParams = await params;
  const listing = await getListingDetails(awaitedParams.id);
//   console.log(listing)

  if (!listing) {
    notFound();
  }

  return (
    <>
      <Listing listing={listing} />
    </>
  );
}

// Generate metadata for the page
export async function generateMetadata({ params }: ListingPageProps) {
  const awaitedParams = await params;
  const listing = await getListingDetails(awaitedParams.id);

  if (!listing) {
    return {
      title: 'Listing Not Found - RentNest',
    };
  }

  return {
    title: `${listing.title} - RentNest`,
    description: listing.description.slice(0, 155) + '...',
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: listing.photos?.[listing.mainPhotoIndex] ? [listing.photos[listing.mainPhotoIndex]] : [],
    },
  };
}
