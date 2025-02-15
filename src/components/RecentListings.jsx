"use client";
import { useEffect, useState } from "react";
import Listing from "@/components/Listing";
import { instance } from "@/api";

export default function RecentListings() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    // Fetch recent listings from the server
    // Update the state with the fetched data
    instance
      .get("/listings")
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="p-4">
      <h2 className="text-2xl">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {listings.length === 0 && <p>No listings found</p>}
        {listings.map((listing) => (
          <Listing key={listing.id} listing={listing} />
        ))}
        {/* <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing /> */}
      </div>
    </div>
  );
}
