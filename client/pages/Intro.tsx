import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Intro() {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 relative">
        {/* Welcome text in top-left corner */}
        <div className="absolute top-12 left-12 z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-neue-montreal text-white drop-shadow-lg">
            Welcome to the <span className="font-instrument-serif italic">Anamnesis</span>.
          </h2>
        </div>
        
        <div className="max-w-5xl w-full text-center pt-32 md:pt-40 lg:pt-48">
          {/* Main content */}
          <div className="flex flex-col justify-center items-center min-h-[50vh] gap-16 lg:gap-20">
            {/* Main text */}
            <div className="enter-text max-w-4xl">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-neue-montreal leading-[1.2] tracking-tight drop-shadow-lg"
                style={{
                  background: "linear-gradient(90deg, #000 0%, #FFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                This place belongs to humans only.
                <br />
                No AI is allowed.
                <br />
                Every image here. Every sentence is left behind by a human.     
              </h1>
            </div>

            {/* Enter Button with Liquid Glass Effect */}
            <Link
              to="/login"
              className="liquid-glass rounded-[3.5rem] px-24 lg:px-28 py-8 lg:py-10 text-white font-neue-montreal text-3xl lg:text-4xl xl:text-5xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              <div className="glass-shimmer absolute inset-0 rounded-[3.5rem]"></div>
              <span className="relative z-10">Enter</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
