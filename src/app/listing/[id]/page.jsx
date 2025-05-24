"use client";
import Breadcrumbs from "@/components/Breadcumbs";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

export default function Page() {
  const { id } = useParams();
  return (
    <div className="container mx-auto flex flex-col gap-4 p-4">
      <Breadcrumbs />
      <div className="flex flex-col md:flex-row align-middle w-full gap-4">
        <div className="w-full md:w-1/2">
          <Image
            src="/cate.jpg"
            width={800}
            height={400}
            alt=""
            className="size-96 object-cover rounded-xl w-full"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-2">
          <h1 className="text-2xl font-bold font-merriweather">
            House in the Woods
          </h1>
          <p>3 Bedrooms, 2 Bathrooms</p>
          <p>Location: California</p>
          <p>
            KSH. 50,000 <span className="text-slate-400">/month</span>
          </p>
          {/* <button className="rounded-xl bg-blue-950 text-white p-4">
            Contact Landloard
          </button> */}
          <Button>Contact Landloard</Button>
        </div>
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15955.264280375088!2d37.0078224!3d-1.2842756499999997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f6b8168851e13%3A0x2260b8d66ac63df3!2sRuai%20Family%20Hospital!5e0!3m2!1sen!2ske!4v1736366497551!5m2!1sen!2ske"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-xl w-full"
      ></iframe>
    </div>
  );
}
