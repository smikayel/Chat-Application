import Link from "next/link";
import React from "react";

const allowedNavigationTypes = {
  BUTTON: "Button",
  NAVLINK: "NavLink",
};

const navigations = [
  {
    name: "Sign Up",
    url: "/signUp",
    type: allowedNavigationTypes.BUTTON,
  },
];

export function Header() {
  return (
    <header className="text-gray-700 body-font border-b border-gray-200">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          href="/home"
          target="_blank"
        >
          <span className="ml-3 text-xl">Chat App</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {navigations.map((nav) => {
            return (
              <Link
                href={nav.url}
                key={nav.url}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
              >
                {nav.name}
              </Link>
            );
          })}
        </nav>
        <button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
          Button
        </button>
      </div>
    </header>
  );
}
