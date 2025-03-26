import React from "react";

export default function Footer() {
  return (
    <footer className="rounded-lg shadow-sm m-4 bg-secondary">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm  sm:text-center ">
          &copy; 2025{" "}
          <a href="https://rental.hub.ke" className="hover:underline">
            Rental Hub Ke &trade;
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium sm:mt-0">
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline me-4 md:me-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
      <div className="text-center p-4 text-sm">
        Built with ❤️ by{" "}
        <a
          href="https://linkedin.com/in/hezekiahelisha"
          target="_blank"
          className="hover:underline"
        >
          Hezekiah Elisha
        </a>
      </div>
    </footer>
  );
}
