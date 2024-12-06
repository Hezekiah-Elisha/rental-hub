import React from "react";
import { withAuth } from "@/utils/withAuth";

export default function DashboardHome() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between align-middle">
        <div className="rounded-3xl shadow-2xl bg-blue-800 p-10 w-1/4 text-white">
          <h1 className="text-sm">Total Cash</h1>
          <p className="text-9xl text-center w-full">56K</p>
        </div>
        <div className="rounded-3xl shadow-2xl bg-blue-800 p-10 w-1/4 text-white">
          <h1 className="text-sm">Total Number of houses</h1>
          <p className="text-9xl text-center w-full">17</p>
        </div>
        <div className="rounded-3xl shadow-2xl bg-blue-800 p-10 w-1/4 text-white">
          <h1 className="text-sm">Subscription Days</h1>
          <p className="text-9xl text-center w-full">13</p>
        </div>
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