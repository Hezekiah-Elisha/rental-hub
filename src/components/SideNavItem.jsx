import Link from "next/link";
import { useState } from "react";
import { Popover } from "react-tiny-popover";

export default function SideNavItem({ destination, popoverName, icon }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleMouseEnter = () => setIsPopoverOpen(true);
  const handleMouseLeave = () => setIsPopoverOpen(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <Link
        href={destination}
        className="flex flex-row justify-start align-middle items-center gap-4 hover:bg-slate-500 rounded-full px-7 py-4"
      >
        <Popover
          isOpen={isPopoverOpen}
          positions={["right", "bottom", "left", "top"]}
          content={
            <div className="bg-gray-600 rounded-full p-2 transition-transform duration-150 ease-in-out">
              {popoverName}
            </div>
          }
        >
          {icon}
        </Popover>
      </Link>
    </div>
  );
}
