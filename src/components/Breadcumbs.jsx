"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const path = usePathname();
  const pathNames = path.split("/").filter((path) => path);

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex space-x-2">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </li>
        {pathNames.map((segment, index) => {
          const href = "/" + pathNames.slice(0, index + 1).join("/");
          const isLast = index === pathNames.length - 1;

          return (
            <li key={href} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-500">{segment}</span>
              ) : (
                <Link href={href} className="text-blue-600 hover:underline">
                  {segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
