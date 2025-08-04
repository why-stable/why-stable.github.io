import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AboutIcon = () => (
  <svg
    className="w-16 h-16 md:w-20 md:h-20"
    viewBox="0 0 77 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M38.5383 19.3513C39.5787 19.3513 40.4541 18.9996 41.1646 18.2963C41.875 17.5923 42.2302 16.7205 42.2302 15.6807C42.2302 14.6402 41.8785 13.7648 41.1752 13.0544C40.4712 12.344 39.5994 11.9888 38.5596 11.9888C37.5191 11.9888 36.6437 12.3404 35.9333 13.0437C35.2229 13.7477 34.8677 14.6196 34.8677 15.6594C34.8677 16.6998 35.2193 17.5752 35.9226 18.2856C36.6266 18.9961 37.4985 19.3513 38.5383 19.3513ZM34.9161 49.77H42.1817V26.9075H34.9161V49.77ZM0.719238 76.0231V8.11377C0.719238 6.11556 1.43062 4.40507 2.85339 2.9823C4.27617 1.55953 5.98665 0.848145 7.98486 0.848145H69.0161C71.0143 0.848145 72.7248 1.55953 74.1476 2.9823C75.5704 4.40507 76.2817 6.11556 76.2817 8.11377V53.8388C76.2817 55.837 75.5704 57.5475 74.1476 58.9702C72.7248 60.393 71.0143 61.1044 69.0161 61.1044H15.638L0.719238 76.0231ZM12.5864 53.8388H69.0161V8.11377H7.98486V58.3919L12.5864 53.8388Z"
      fill="currentColor"
    />
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const HeartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z"/>
  </svg>
);

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 延迟触发动画，确保页面渲染完成后再开始过渡
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  return (
    <div 
      className="min-h-screen relative transition-all duration-1000 ease-in-out"
      style={{
        background: `linear-gradient(135deg, rgba(139,69,19,0.3) 0%, rgba(0,0,0,0.8) 50%, #000 100%)`
      }}
    >


      {/* Logo */}
      <Link
        to="/home"
        className="absolute top-4 left-1 w-48 h-48 md:w-56 md:h-56 z-50 hover:opacity-70 transition-opacity duration-300"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f20475a744968b959788bb6fd3f9a055d93ec?width=1600"
          alt="Logo"
          className="w-full h-full object-contain cursor-pointer"
        />
      </Link>

      <div className="px-4 md:px-8 lg:px-16 py-20">
        {/* Header - About us 从Home页面无缝过渡 */}
        <div className="text-center mb-12">
          <div className="relative flex items-center justify-center mb-6">
            {/* About us 文字从Home页面右下角位置精确飞入并放大到中心 */}
            <h1 className={`font-instrument-serif text-white drop-shadow-2xl transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isLoaded 
                ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl' 
                : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
            }`}
            style={{
              transform: isLoaded 
                ? 'translate(0, 0) scale(1)' 
                : 'translate(calc(45vw - 3rem), calc(45vh - 1.5rem)) scale(0.75)',
              transformOrigin: 'center',
              filter: isLoaded ? 'blur(0px)' : 'blur(0.5px)',
              opacity: isLoaded ? 1 : 0.8
            }}>
              About us
            </h1>
            
            {/* 图标柔和出现 */}
            
            
            {/* 添加柔和的粒子效果 */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-[1800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isLoaded ? 'opacity-0' : 'opacity-40'
            }`}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                  style={{
                    bottom: `${25 + i * 12}%`,
                    right: `${15 + i * 8}%`,
                    animation: `particle-trail ${2 + i * 0.3}s ease-out infinite`,
                    animationDelay: `${i * 200}ms`,
                    transform: `translate(${Math.sin(i) * 15}px, ${Math.cos(i) * 15}px)`
                  }}
                />
              ))}
            </div>
          </div>

          <p className={`text-xl md:text-2xl lg:text-3xl font-neue-montreal text-white/90 drop-shadow-lg transition-all duration-[1000ms] delay-[2500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
            isLoaded 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-[30px] opacity-0'
          }`}>
            Human creativity in the age of AI
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Mission Statement Card */}
          <div className="lg:col-span-2">
            <div className="liquid-glass rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
              <div className="glass-shimmer absolute inset-0 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-instrument-serif text-white text-center mb-8 drop-shadow-lg">
                  Our Mission
                </h2>
                <blockquote className={`text-xl md:text-2xl lg:text-3xl font-neue-montreal leading-[1.4] text-white/90 text-center transition-all duration-[1200ms] delay-[2700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
                  isLoaded 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-[40px] opacity-0'
                }`}>
                  "We live in a time where AI can create with ease.<br />
                  But it doesn't dream. And it doesn't feel.<br />
                  We built this to rebuild our creativity."
                </blockquote>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="lg:col-span-2">
            <div className="liquid-glass rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="glass-shimmer absolute inset-0 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-instrument-serif text-white text-center mb-8 drop-shadow-lg">
                  Our Team
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Team Member 1 */}
                  <div className="liquid-glass rounded-2xl p-6 relative overflow-hidden hover:scale-105 transition-all duration-300">
                    <div className="glass-shimmer absolute inset-0 rounded-2xl"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl">
                        <span className="text-white font-bold text-2xl">E</span>
                      </div>
                      <h3 className="text-xl font-instrument-serif text-white mb-2">
                        Evelyn
                      </h3>
                      <p className="text-white/70 text-sm mb-4 font-neue-montreal">
                        Creative Director
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed font-neue-montreal">
                        Focuses on visual storytelling and user experience design. 
                        Believes in the power of authentic human expression.
                      </p>
                    </div>
                  </div>

                  {/* Team Member 2 */}
                  <div className="liquid-glass rounded-2xl p-6 relative overflow-hidden hover:scale-105 transition-all duration-300">
                    <div className="glass-shimmer absolute inset-0 rounded-2xl"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl">
                        <span className="text-white font-bold text-xl">W</span>
                      </div>
                      <h3 className="text-xl font-instrument-serif text-white mb-2">
                        Why Stable
                      </h3>
                      <p className="text-white/70 text-sm mb-4 font-neue-montreal">
                        Technical Lead
                      </p>
                      <p className="text-white/80 text-sm leading-relaxed font-neue-montreal">
                        Specializes in creative technology and platform architecture. 
                        Passionate about building tools that empower creativity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="lg:col-span-2">
            <div className="liquid-glass rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="glass-shimmer absolute inset-0 rounded-3xl"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-instrument-serif text-white text-center mb-8 drop-shadow-lg">
                  Our Philosophy
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-xl">
                      <HeartIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-instrument-serif text-white">Human-First</h3>
                    <p className="text-white/80 text-sm leading-relaxed font-neue-montreal">
                      Technology should amplify human creativity, not replace it
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl">
                      <StarIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-instrument-serif text-white">Authentic</h3>
                    <p className="text-white/80 text-sm leading-relaxed font-neue-montreal">
                      Real emotions and genuine expression over artificial perfection
                    </p>
                  </div>
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-xl">
                      <SparkleIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-instrument-serif text-white">Minimal</h3>
                    <p className="text-white/80 text-sm leading-relaxed font-neue-montreal">
                      Clean design that focuses attention on what truly matters
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mt-16">
          <Link
            to="/community"
            className="group bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full px-10 py-4 text-white font-instrument-serif text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <span className="flex items-center space-x-2">
              <span>🌍</span>
              <span>Visit Community</span>
            </span>
          </Link>

          <Link
            to="/creation"
            className="group bg-gradient-to-r from-amber-500/30 to-orange-500/30 hover:from-amber-500/40 hover:to-orange-500/40 backdrop-blur-md rounded-full px-10 py-4 text-white font-instrument-serif text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <span className="flex items-center space-x-2">
              <span>🎨</span>
              <span>Start Creating</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
