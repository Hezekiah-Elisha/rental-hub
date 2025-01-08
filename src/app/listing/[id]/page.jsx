import React from "react";

export default function page({ params }) {
  const listingId = params.id;
  return (
    <div>
      <h1>Listing {listingId}</h1>
      <button>Back to listing</button>
    </div>
  );
}
