import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://api.builder.io/api/v1/image/assets/TEMP/deee39b7bd81d508c5cf3bfbb9a52db9680636b3?width=2160)",
        }}
      />

      {/* Logo with click to home functionality */}
      <Link 
        to="/" 
        className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 z-50 -mt-4 -mr-4 sm:-mt-6 sm:-mr-6 cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f20475a744968b959788bb6fd3f9a055d93ec?width=1600"
          alt="Quato Morty Logo"
          className="w-full h-full object-contain"
        />
      </Link>

      {/* Content */}
      <div className="relative z-20 min-h-screen">{children}</div>
    </div>
  );
}
