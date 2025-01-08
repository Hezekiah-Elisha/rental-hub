import React from "react";
import Listing from "@/components/Listing";

export default function RecentListings() {
  return (
    <div className="p-4">
      <h2 className="text-2xl">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
        <Listing />
      </div>
    </div>
  );
}
