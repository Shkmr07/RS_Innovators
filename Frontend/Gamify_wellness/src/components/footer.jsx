import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4  mt-auto w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Gamify Wellness. All rights reserved.</p>
        <ul className="flex space-x-4 mt-2 md:mt-0">
          <li>
            <a href="/terms" className="hover:text-gray-400 text-sm">
              Terms of Service
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-gray-400 text-sm">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-400 text-sm">
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
