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
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
            className="rounded-full px-4 py-2"
          >
            <Button>Post</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-row justify-between align-middle">
        {properties.length === 0 ? (
          <div>No properties available.</div>
        ) : (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">Title</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>tags</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">
                    {property.title}
                  </TableCell>
                  <TableCell>
                    <Image
                      src={`https://api.rental.hub.ke/listings/image/${property.image}`}
                      alt={property.title}
                      width={1000}
                      height={1000}
                      className="object-cover size-14 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{property.description}</TableCell>
                  <TableCell>{property.location}</TableCell>
                  <TableCell>
                    <TagPills tags={ProcessTags(property.tags)} />
                  </TableCell>
                  <TableCell className="text-right">
                    Ksh {property.price}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                    <Button>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6}>Total</TableCell>
                <TableCell className="text-right">{properties.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
    </div>
  );
}
