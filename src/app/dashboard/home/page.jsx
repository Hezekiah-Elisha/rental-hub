"use client";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { useEffect } from "react";

export default function DashboardHome() {
  const { refreshToken } = useAuth();

  useEffect(() => {
    refreshToken(); // Sync context with cookie after login redirect
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between align-middle">
        <Card className="p-2">
          <h1 className="text-sm">Total Cash</h1>
          <p className="text-9xl text-center w-full">56K</p>
        </Card>
        <Card className="p-2">
          <h1 className="text-sm">Total Number of houses</h1>
          <p className="text-9xl text-center w-full">17</p>
        </Card>
        <Card className="p-2">
          <h1 className="text-sm">Subscription Days</h1>
          <p className="text-9xl text-center w-full">13</p>
        </Card>
      </div>
      <div className="shadow-2xl rounded-3xl w-full">
        <table className="p-20 w-full">
          <thead className="p-20">
            <tr className="uppercase text-left p-20">
              <th className="">House Number</th>
              <th>House Type</th>
              <th>House Location</th>
              <th>House Price</th>
              <th>House Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
