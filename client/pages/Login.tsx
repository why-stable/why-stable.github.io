import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Login() {
  const [uid, setUid] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (uid.trim()) {
      setIsLoggingIn(true);
      
      // 模拟登录过程
      setTimeout(() => {
        setIsLoggingIn(false);
        setIsTransitioning(true);
        
        // 过渡动画完成后导航到home页面
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }, 1000);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-4 md:px-8 lg:px-12 relative">
        {/* 过渡背景视频 */}
        {isTransitioning && (
          <div className="absolute inset-0 z-50">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
              style={{ filter: 'brightness(0.7)' }}
            >
              <source src="/background-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
          </div>
        )}

        {/* Welcome text in top-left corner */}
        <div className={`absolute top-12 left-12 z-10 transition-all duration-1000 ${isTransitioning ? 'opacity-0 transform -translate-x-4' : 'opacity-100'}`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-neue-montreal text-white drop-shadow-lg">
            Welcome to the <span className="font-instrument-serif italic">Anamnesis</span>.
          </h2>
        </div>

        <div className="w-full flex justify-center items-center">
          {/* Login Interface */}
          <div className={`liquid-glass rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden transition-all duration-1000 ${
            isTransitioning ? 'opacity-0 transform scale-95 translate-y-4' : 'opacity-100 scale-100'
          }`}>
            <div className="glass-shimmer absolute inset-0 rounded-2xl"></div>
            
            {/* Login Title */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl md:text-4xl font-ibm-plex-mono text-gray-800 drop-shadow-lg">
                {isLoggingIn ? "Logging In..." : "Login"}
              </h2>
            </div>

            {/* Login Form */}
            <div className="space-y-6 mb-8 relative z-10">
              {/* Success Message */}
              {isLoggingIn && (
                <div className="text-center">
                  <div className="liquid-glass rounded-full py-3 px-6 inline-flex items-center gap-2 relative overflow-hidden">
                    <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                    <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin relative z-10"></div>
                    <span className="text-lg font-ibm-plex-mono text-green-600 relative z-10">Authenticating...</span>
                  </div>
                </div>
              )}

              {/* UID Input */}
              <div>
                <input
                  type="text"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                  placeholder="UID"
                  disabled={isLoggingIn || isTransitioning}
                  className="w-full liquid-glass rounded-full px-6 py-4 text-lg font-ibm-plex-mono text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 relative overflow-hidden disabled:opacity-50"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn || isTransitioning}
                className="w-full liquid-glass rounded-full py-4 flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden hover:scale-105 disabled:hover:scale-100 disabled:opacity-50"
              >
                <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                <span className="text-lg font-ibm-plex-mono text-gray-800 relative z-10">
                  {isLoggingIn ? "Logging In..." : "Enter"}
                </span>
                {!isLoggingIn && (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 55 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                  >
                    <path
                      d="M37.0677 29.7917H9.16669V25.2084H37.0677L24.2344 12.3751L27.5 9.16675L45.8334 27.5001L27.5 45.8334L24.2344 42.6251L37.0677 29.7917Z"
                      fill="#1F2937"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Account Creation Link */}
            <div className="text-center relative z-10">
              <span className="text-sm font-sf-pro text-gray-600">
                No UID?{" "}
              </span>
              <Link
                to="/signup"
                className="text-sm font-sf-pro text-gray-800 hover:text-gray-900 transition-colors drop-shadow-lg underline"
              >
                Create an account.
              </Link>
            </div>
          </div>
        </div>

        {/* 过渡成功消息 */}
        {isTransitioning && (
          <div className="absolute inset-0 flex items-center justify-center z-60">
            <div className="text-center">
              <div className="mb-8">
                <div className="w-24 h-24 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-4xl font-instrument-serif text-white mb-2">Welcome</h2>
                <p className="text-xl font-neue-montreal text-white/80">Entering the Anamnesis universe...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
