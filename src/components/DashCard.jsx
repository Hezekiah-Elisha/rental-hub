import React from "react";
import { Card } from "./ui/card";

export default function DashCard({ title, value }) {
  return (
    <Card className="p-2 w-full">
      <h1 className="text-sm text-center md:text-left">{title}</h1>
      <p className="text-9xl text-center w-full">{value}</p>
    </Card>
  );
}
