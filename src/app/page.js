import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import RecentListings from "@/components/RecentListings";
import React from "react";

export default function Home() {
  return (
    <>
      <section className="w-full">
        <Hero />
        <RecentListings />
        <Footer />
      </section>
    </>
  );
}
