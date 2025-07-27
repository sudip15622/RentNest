import HomePage from "../components/homepage/HomePage";
import { getFeaturedListings } from "../lib/actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RentNest - Room Rental Service",
  description: "RentNest is a room rental service platfrom where you can find and book rooms online for rent as well as list your own properties like rooms, flats, apartment, and",
};

export default async function Home() {
  const featuredListings = await getFeaturedListings();

  return (
    <>
      <HomePage featuredListings={featuredListings}/>
    </>
  );
}
