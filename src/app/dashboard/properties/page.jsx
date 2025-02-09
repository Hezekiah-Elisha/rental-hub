"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { instance } from "@/api";
import Image from "next/image";
import ProcessTags from "@/utils/ProcessTags";
import TagPills from "@/components/TagPill";
import { MapPinIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    instance.get("/listings").then((response) => {
      setProperties(response.data);
      console.log(response.data);
    });
    instance.get("/categories").then((response) => {
      setCategories(response.data);
      console.log(response.data);
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
      <div className="flex flex-row justify-between align-middle">
        {properties.length === 0 ? (
          <div>No properties available.</div>
        ) : (
          properties.map((property) => (
            <Card key={property.id} className="w-1/4">
              <CardHeader>
                <CardTitle>{property.title}</CardTitle>
                <CardDescription>{property.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={`https://api.rental.hub.ke/listings/image/${property.image}`}
                  alt={property.title}
                  width={1000}
                  height={1000}
                  className="w-full object-cover"
                />
                <div className="flex flex-row justify-start align-middle gap-2">
                  <MapPinIcon className="size-5 text-blue-500" />
                  {property.location}
                </div>
                <div className="underline text-slate-900 sark:text-slate-900">
                  Ksh {property.price}
                </div>
                <div>{property.status}</div>
                <div>{property.user_id}</div>
                <TagPills tags={ProcessTags(property.tags)} />
              </CardContent>
            </Card>
            // <div
            //   key={property.id}
            //   className="flex flex-col justify-between align-middle border rounded-xl p-5 hover:bg-blue-950 hover:text-white hover:cursor-pointer space-y-2 w-1/4 flex-wrap"
            // >
            //   {/* <div className="w-full"> */}
            //   <Image
            //     src={`https://api.rental.hub.ke/listings/image/${property.image}`}
            //     alt={property.title}
            //     width={1500}
            //     height={0}
            //     className="w-full object-cover"
            //   />
            //   {/* </div> */}
            //   <h2 className="text-2xl capitalize">{property.title}</h2>
            //   <hr />
            //   <p>{property.description}</p>
            //   {categories.find(
            //     (category) => category.id === property.category_id
            //   ) && (
            //     <CategoryPill
            //       category={
            //         categories.find(
            //           (category) => category.id === property.category_id
            //         ).name
            //       }
            //     />
            //   )}

            //   <div className="flex flex-row justify-start align-middle gap-2">
            //     <MapPinIcon className="size-5 text-blue-500" />
            //     {property.location}
            //   </div>
            //   <div className="underline text-slate-900 sark:text-slate-900">
            //     Ksh {property.price}
            //   </div>
            //   <div>{property.status}</div>
            //   <div>{property.user_id}</div>
            //   <TagPills tags={ProcessTags(property.tags)} />
            // </div>
          ))
        )}
      </div>
    </div>
  );
}
