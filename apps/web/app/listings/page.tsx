import { Metadata } from "next";
import ListingsClient from "./_components/ListingsClient";

export const metadata: Metadata = {
  title: "All Listings | RentNest",
  description: "Browse all available room rentals. Search, filter, and find your perfect space.",
};

export default function ListingsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <ListingsClient />
    </main>
  );
}
