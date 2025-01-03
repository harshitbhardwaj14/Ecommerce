import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      {/*
            This example requires updating your template:
    
            ```
            <html class="h-full">
            <body class="h-full">
            ```
          */}
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className=" font-extrabold tracking-widest text-xl">404</p>
          <h1 className="mt-4 text-3xl  tracking-wide text-gray-900 sm:text-5xl uppercase">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 tracking-wide">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="text-white bg-black px-8 py-3 tracking-wide border border-black"
            >
              Go back home
            </Link>
            <a href="#" className="border border-black hover:ring-inset hover:ring-black hover:ring-1 px-5 py-3 tracking-wide transition-all ease-in">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
