import React from "react";

export default function Footer() {
  return (
    <footer className="mt-12 bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm md:text-base">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-amber-400">ElectroMart</span>. All rights reserved.
        </p>
        <div className="mt-2 text-xs text-gray-400">
          Designed  by Dan
        </div>
      </div>
    </footer>
  );
}
