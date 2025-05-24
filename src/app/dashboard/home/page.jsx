"use client";
import { Card } from "@/components/ui/card";
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

const properties = [
  {
    id: 1,
    name: "Beautiful Family House",
    views: 120,
    inquiry: 5,
    datePosted: "2023-10-01",
    totalAmount: "$500,000",
  },
  {
    id: 2,
    name: "Modern Apartment",
    views: 80,
    inquiry: 3,
    datePosted: "2023-09-15",
    totalAmount: "$300,000",
  },
  {
    id: 3,
    name: "Cozy Cottage",
    views: 60,
    inquiry: 2,
    datePosted: "2023-08-20",
  },
  {
    id: 4,
    name: "Spacious Villa",
    views: 100,
    inquiry: 4,
    datePosted: "2023-07-10",
  },
];

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-2 w-full">
          <h1 className="text-sm font-montserrat text-center md:text-left">
            Total Listed Houses
          </h1>
          <p className="text-9xl text-center w-full font-poppins">6</p>
        </Card>
        <Card className="p-2 w-full">
          <h1 className="text-sm text-center md:text-left">
            Total Views Accross listings
          </h1>
          <p className="text-9xl text-center w-full">1.2K</p>
        </Card>
        <Card className="p-2 w-full">
          <h1 className="text-sm text-center md:text-left">
            Inquiries Received
          </h1>
          <p className="text-9xl text-center w-full">13</p>
        </Card>
      </div>
      <div className="">
        <Table>
          <TableCaption>A list of your Listed Properties</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Property</TableHead>
              <TableHead>views</TableHead>
              <TableHead>Inquiries</TableHead>
              <TableHead className="text-right">Posted On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.name}</TableCell>
                <TableCell>{property.views}</TableCell>
                <TableCell>{property.inquiry}</TableCell>
                <TableCell className="text-right">
                  {property.datePosted}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">4</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
