import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <p>
          &copy;
          <span className="font-bold">RentalHubKe</span>
        </p>
        <p>2024</p>
      </div>
      <div className="flex flex-row justify-center align-middle items-center">
        <p>
          Made with
          <span className="text-red-500">❤</span>
          by
          <a href="" className="text-blue-500 font-bold">
            Hezekiah Elisha
          </a>
        </p>
      </div>
    </footer>
  );
}
