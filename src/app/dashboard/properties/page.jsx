"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { instance } from "@/api";

export default function Page() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        instance.get("/listings").then((response) => {
            setProperties(response.data);
        });
    }, []);
return (
    <div>
        <div className="flex flex-row justify-between align-middle">
            <div className="">Post Property</div>
            <div>
                <Link
                    href={"/dashboard/properties/post-property"}
                    className="bg-blue-500 rounded-full px-4 py-2 text-white"
                >
                    Post
                </Link>
            </div>
        </div>
        <div>
            {properties.length === 0 ? (
                <div>No properties available.</div>
            ) : (
                properties.map((property) => (
                    <div key={property.id} className="flex flex-row justify-between align-middle">
                        <div>{property.title}</div>
                        <div>{property.description}</div>
                        <div>{property.category_id}</div>
                        <div>{property.location}</div>
                        <div>{property.price}</div>
                        <div>{property.status}</div>
                        <div>{property.user_id}</div>
                    </div>
                ))
            )}
        </div>
    </div>
);
}
