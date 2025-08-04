import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

export default function Index() {
  const [isVerified, setIsVerified] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [isDetected, setIsDetected] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const startDetection = () => {
    setIsDetecting(true);
    setIsDetected(false);
    setShowSuccess(false);
    setShowFailure(false);
  };

  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (event) => {
      // 只在检测状态下监听键盘事件
      if (isDetecting) {
        const key = event.key.toLowerCase();
        
        // 检查是否是字母
        if (key >= 'a' && key <= 'z') {
          if (key === 'w') {
            // 按下'w'键 - 验证成功
            setIsDetecting(false);
            setIsDetected(true);
            setIsVerified(true);
            setShowSuccess(true);
            
            // 显示success信息2秒后隐藏
            setTimeout(() => {
              setShowSuccess(false);
            }, 2000);
          } else {
            // 按下其他字母 - 验证失败
            setIsDetecting(false);
            setIsDetected(false);
            setIsVerified(false);
            setShowFailure(true);
            
            // 显示failure信息3秒后隐藏，然后允许重新尝试
            setTimeout(() => {
              setShowFailure(false);
            }, 3000);
          }
        }
        // 非字母键不做处理，继续等待
      }
    };

    // 添加键盘事件监听器
    if (isDetecting) {
      window.addEventListener('keydown', handleKeyPress);
    }

    // 清理函数，移除事件监听器
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isDetecting]);

  // 检测超时处理（可选）
  useEffect(() => {
    let timeoutId;
    if (isDetecting) {
      timeoutId = setTimeout(() => {
        setIsDetecting(false);
        // 如果超时未按w键，可以显示提示信息或重置状态
      }, 10000); // 10秒超时
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isDetecting]);

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
          {/* Human Verification Interface */}
          <div className="liquid-glass rounded-2xl p-8 max-w-md w-full mx-4 relative overflow-hidden">
            <div className="glass-shimmer absolute inset-0 rounded-2xl"></div>
            
            {/* Verification Title */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-3xl md:text-4xl font-ibm-plex-mono text-gray-800 drop-shadow-lg">
                Human Verification
              </h2>
            </div>

            {/* Verification Form */}
            <div className="space-y-6 mb-8 relative z-10">
              {/* Instructions */}
              <div className="text-center">
                <p className="text-lg font-ibm-plex-mono text-gray-700 mb-6">
                  Tap on the authenticator to verify you are human
                </p>
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="text-center">
                  <div className="liquid-glass rounded-full py-3 px-6 inline-flex items-center gap-2 relative overflow-hidden">
                    <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                    <span className="text-lg font-ibm-plex-mono text-green-600 relative z-10">✓ Verification Success!</span>
                  </div>
                </div>
              )}

              {/* Failure Message */}
              {showFailure && (
                <div className="text-center">
                  <div className="liquid-glass rounded-full py-3 px-6 inline-flex items-center gap-2 relative overflow-hidden">
                    <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                    <span className="text-lg font-ibm-plex-mono text-red-600 relative z-10">✗ Verification Failed! Try again.</span>
                  </div>
                </div>
              )}

              {/* Verification Button */}
              <button
                onClick={startDetection}
                disabled={isDetecting || showFailure}
                className={`w-full liquid-glass rounded-full py-4 flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden hover:scale-105 ${
                  isDetected ? 'opacity-75' : showFailure ? 'opacity-60' : ''
                }`}
              >
                <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                <span className={`text-lg font-ibm-plex-mono relative z-10 ${
                  isDetected
                    ? "text-green-600"
                    : showFailure
                      ? "text-red-600"
                      : isDetecting
                        ? "text-yellow-600"
                        : "text-gray-800"
                }`}>
                  {isDetected
                    ? "Verified ✓"
                    : showFailure
                      ? "Failed ✗"
                      : isDetecting
                        ? "Verifying..."
                        : "Start Verification"}
                </span>
              </button>

              {/* Continue Button */}
              {isDetected && (
                <Link
                  to="/login"
                  className="w-full liquid-glass rounded-full py-4 flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden hover:scale-105"
                >
                  <div className="glass-shimmer absolute inset-0 rounded-full"></div>
                  <span className="text-lg font-ibm-plex-mono text-gray-800 relative z-10">Continue</span>
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
                </Link>
              )}
            </div>

            {/* Helper Text */}
            <div className="text-center relative z-10">
              <span className="text-sm font-sf-pro text-gray-600">
                {showFailure 
                  ? "Authentication failed. Please try again."
                  : "This helps us ensure you're not a robot"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
