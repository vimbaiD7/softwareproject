import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-orange-200 shadow-md py-4 px-6 flex justify-between items-center">
      <a href="/" className="flex items-center">
        <img src="/images/logo.svg" alt="Foodie Network Logo" className="h-16 w-auto" />
      </a>

      <div className="space-x-6">
        <a href="/popular" className="text-gray-700 hover:text-orange-600">Popular</a>
        <a href="/signin" className="text-gray-700 px-4 py-2 rounded-lg hover:text-orange-600">Sign In</a>
        <a href="/signup" className="text-gray-700 px-4 py-2 rounded-lg hover:text-orange-600">Sign Up</a>
      </div>
    </nav>
  );
}
