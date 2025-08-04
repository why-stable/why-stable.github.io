import React, { useState } from "react";
import { Link } from "react-router-dom";

const HeartIcon = ({
  className = "w-8 h-8",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) => (
  <svg
    className={className}
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="27" cy="27" r="27" fill="#D9D9D9" />
    <path
      d="M27 47.2499L23.7375 44.3249C19.95 40.9124 16.8187 37.9687 14.3438 35.4937C11.8687 33.0187 9.9 30.7968 8.4375 28.828C6.975 26.8593 5.95312 25.0499 5.37187 23.3999C4.79063 21.7499 4.5 20.0624 4.5 18.3374C4.5 14.8124 5.68125 11.8687 8.04375 9.50615C10.4062 7.14365 13.35 5.9624 16.875 5.9624C18.825 5.9624 20.6812 6.3749 22.4438 7.1999C24.2062 8.0249 25.725 9.1874 27 10.6874C28.275 9.1874 29.7937 8.0249 31.5562 7.1999C33.3187 6.3749 35.175 5.9624 37.125 5.9624C40.65 5.9624 43.5938 7.14365 45.9562 9.50615C48.3187 11.8687 49.5 14.8124 49.5 18.3374C49.5 20.0624 49.2094 21.7499 48.6281 23.3999C48.0469 25.0499 47.025 26.8593 45.5625 28.828C44.1 30.7968 42.1312 33.0187 39.6562 35.4937C37.1812 37.9687 34.05 40.9124 30.2625 44.3249L27 47.2499Z"
      fill={filled ? "#FF4444" : "#D3E0E3"}
    />
  </svg>
);

export default function ContentDetail() {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Background with dynamic color based on content */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 to-purple-50" />

      {/* Logo */}
      <Link
        to="/home"
        className="absolute top-0 left-0 w-56 h-56 md:w-64 md:h-64 z-50 hover:opacity-80 transition-opacity"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f20475a744968b959788bb6fd3f9a055d93ec?width=1600"
          alt="Logo"
          className="w-full h-full object-contain cursor-pointer"
        />
      </Link>

      {/* Content */}
      <div className="relative z-20 px-4 md:px-8 lg:px-12 pt-20 pb-16">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-inter text-black mb-2">
              Community.
            </h1>
            <p className="text-lg md:text-xl text-black/60">
              (背景根据作品动态取色)
            </p>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Main Artwork */}
          <div className="lg:col-span-2">
            <div className="bg-gray-300 rounded-3xl aspect-[4/3] lg:aspect-[16/10] flex items-center justify-center mb-4">
              <span className="text-4xl md:text-5xl lg:text-6xl font-inter text-black">
                作品
              </span>
            </div>
          </div>

          {/* Right Side - Profile & Actions */}
          <div className="space-y-6">
            {/* Profile Section */}
            <div className="bg-gray-300 rounded-3xl p-6 lg:p-8 flex items-center justify-center min-h-[200px]">
              <span className="text-3xl md:text-4xl lg:text-5xl font-inter text-black">
                简介
              </span>
            </div>

            {/* Interaction Section */}
            <div className="flex items-center justify-center gap-4">
              {/* Like Button */}
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="transition-transform hover:scale-110"
              >
                <HeartIcon
                  className="w-16 h-16 md:w-20 md:h-20"
                  filled={isLiked}
                />
              </button>

              {/* Comments Button */}
              <button className="bg-gray-300 hover:bg-gray-400 rounded-full px-6 py-3 lg:px-8 lg:py-4 transition-colors">
                <span className="text-lg md:text-xl lg:text-2xl font-inter text-black">
                  Comments
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-16">
          <Link
            to="/community"
            className="text-black/60 hover:text-black font-instrument-serif text-xl transition-colors"
          >
            ← Back to Community
          </Link>
        </div>
      </div>
    </div>
  );
}
