import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RecentListings from "@/components/RecentListings";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <section className="w-full">
        <Hero />
        <RecentListings />
        <Footer />
      </section>
    </>
  );
}
