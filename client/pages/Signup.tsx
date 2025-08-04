import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

// SHA-256 编码函数
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default function Signup() {
  const [name, setName] = useState("");
  const [hashedName, setHashedName] = useState("");
  const [showHash, setShowHash] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNameSubmit = async () => {
    if (!name.trim()) return;
    
    setIsLoading(true);
    try {
      const hash = await sha256(name);
      setHashedName(hash);
      setShowHash(true);
    } catch (error) {
      console.error('Error generating hash:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    navigate('/home');
  };

  const handleBack = () => {
    setShowHash(false);
    setHashedName("");
    setName("");
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen px-4 md:px-8 lg:px-12">
        {/* Welcome text in top-left corner */}
        <div className="absolute top-12 left-12 z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-neue-montreal text-white drop-shadow-lg">
            Welcome to the <span className="font-instrument-serif italic">Anamnesis</span>.
          </h2>
        </div>

        <div className="w-full flex justify-center items-center">
          {/* Signup Interface */}
          <div className="liquid-glass rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
            <div className="glass-shimmer absolute inset-0 rounded-2xl"></div>
            
            {/* Back Button */}
            <Link
              to="/login"
              className="absolute top-4 right-4 w-10 h-10 liquid-glass rounded-full flex items-center justify-center transition-all duration-300 relative overflow-hidden z-20 hover:scale-110"
            >
              <div className="glass-shimmer absolute inset-0 rounded-full"></div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
              >
                <path
                  d="M9 18L3 12L9 6L10.4 7.4L6.8 11H19V7H21V13H6.8L10.4 16.6L9 18Z"
                  fill="#1F2937"
                />
              </svg>
            </Link>

            {/* Signup Title */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl md:text-4xl font-new-york text-gray-800 drop-shadow-lg">
                Sign up
              </h2>
            </div>

            {!showHash ? (
              /* Name Input Section */
              <div className="space-y-6 mb-8 relative z-10">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full liquid-glass rounded-full px-6 py-4 text-lg font-ibm-plex-mono text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 relative overflow-hidden"
                  />
                </div>

                {/* Submit Button */}
                <button 
                  onClick={handleNameSubmit}
                  disabled={!name.trim() || isLoading}
                  className="w-full liquid-glass rounded-full py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden hover:scale-105"
                >
                  <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-gray-800 border-t-transparent rounded-full animate-spin relative z-10"></div>
                  ) : (
                    <>
                      <span className="text-lg font-ibm-plex-mono text-gray-800 relative z-10">Generate Hash</span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 55 55"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10"
                      >
                        <path
                          d="M37.0678 29.7917H9.16675V25.2084H37.0678L24.2345 12.3751L27.5001 9.16675L45.8334 27.5001L27.5001 45.8334L24.2345 42.6251L37.0678 29.7917Z"
                          fill="#1F2937"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Hash Display Section */
              <div className="space-y-6 mb-8 relative z-10">
                <h3 className="text-lg font-new-york text-gray-800 text-center drop-shadow-lg">
                  Your SHA-256 Hash:
                </h3>
                <div className="liquid-glass rounded-xl p-4 relative overflow-hidden">
                  <div className="glass-shimmer absolute inset-0 rounded-xl"></div>
                  <p className="text-sm font-ibm-plex-mono text-gray-800 break-all drop-shadow-lg relative z-10">
                    {hashedName}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 liquid-glass rounded-full py-3 text-gray-800 font-new-york text-sm transition-all duration-300 relative overflow-hidden hover:scale-105"
                  >
                    <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                    <span className="relative z-10">Back</span>
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-quato-green hover:bg-green-600 rounded-full py-3 text-white font-new-york text-sm transition-all duration-300 shadow-xl drop-shadow-lg hover:scale-105"
                  >
                    Confirm & Enter
                  </button>
                </div>
              </div>
            )}

            {/* Login Link */}
            <div className="text-center relative z-10">
              <span className="text-sm font-sf-pro text-gray-600">
                Already have an UID?{" "}
              </span>
              <Link
                to="/login"
                className="text-sm font-sf-pro text-gray-800 hover:text-gray-900 transition-colors drop-shadow-lg underline"
              >
                Login.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
