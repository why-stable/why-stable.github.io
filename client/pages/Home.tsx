import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface CommunityPost {
  id: string;
  imageUrl: string;
  description: string;
  emotion: number;
  backgroundColor: string;
  likes: number;
  author: string;
  timestamp: number;
  liked?: boolean;
}

// Grid Circle Hover Zone Component
function CircleHoverZone({ 
  number, 
  position, 
  size,
  artwork, 
  isHovered, 
  onHover, 
  onLeave 
}: {
  number: number;
  position: { x: string; y: string };
  size: { width: string; height: string };
  artwork?: CommunityPost;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <div
      className="absolute cursor-pointer transition-all duration-300"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        transform: 'translate(-50%, -50%)',
        zIndex: 15
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Invisible hover area */}
      <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
        {isHovered && artwork && (
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={artwork.imageUrl}
              alt={artwork.description}
              className="w-full h-full object-cover rounded-full"
              style={{
                filter: 'brightness(1.1) contrast(1.1)',
                mixBlendMode: 'normal'
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Grid Matrix Component
function GridMatrix({ artworks, refreshKey }: { artworks: CommunityPost[]; refreshKey: number }) {
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);

  // Grid positions corresponding to the circles (skipping center position)
  const gridPositions = [
    // Row 1 (0-4)
    { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }, { row: 0, col: 4 },
    // Row 2 (5-8) - skip center position
    { row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 3 }, { row: 1, col: 4 },
    // Row 3 (9-13)
    { row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }, { row: 2, col: 3 }, { row: 2, col: 4 }
  ];

  return (
    <div className="absolute inset-0 p-8 md:p-16 lg:p-20">
      <div className="w-full h-full grid grid-cols-5 grid-rows-3 gap-4 md:gap-6 lg:gap-8">
        {gridPositions.map((gridPos, index) => {
          const circleNumber = index + 1;
          const artworkIndex = (index + refreshKey * 14) % artworks.length;
          const artwork = artworks[artworkIndex];
          
          return (
            <div
              key={`circle-${circleNumber}-${refreshKey}`}
              className="flex items-center justify-center relative cursor-pointer"
              onMouseEnter={() => setHoveredCircle(circleNumber)}
              onMouseLeave={() => setHoveredCircle(null)}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center overflow-hidden transition-all duration-300">
                {hoveredCircle === circleNumber && artwork ? (
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.description}
                    className="w-full h-full object-cover rounded-full"
                    style={{
                      filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                      mixBlendMode: 'normal',
                      background: 'transparent'
                    }}
                  />
                ) : (
                  <span className="text-white font-bold text-sm md:text-base lg:text-lg z-10">
                    {circleNumber}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Green Refresh Button Component (positioned at center of grid)
function GreenRefreshButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-green-500 flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-green-400 hover:scale-110 shadow-lg"
      style={{ zIndex: 25 }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M3 21v-5h5" />
      </svg>
    </button>
  );
}

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get community posts from localStorage
  const getCommunityPosts = (): CommunityPost[] => {
    const posts = localStorage.getItem('communityPosts');
    const storedPosts = posts ? JSON.parse(posts) : [];
    
    // If no posts exist, return some mock data for demonstration
    if (storedPosts.length === 0) {
      return [
        {
          id: 'mock-1',
          imageUrl: '/Anamnesis.png',
          description: 'Sample artwork 1',
          emotion: 70,
          backgroundColor: '#2563eb',
          likes: 5,
          author: 'Demo User',
          timestamp: Date.now(),
          liked: false
        },
        {
          id: 'mock-2',
          imageUrl: '/Anamnesis.png',
          description: 'Sample artwork 2',
          emotion: 30,
          backgroundColor: '#dc2626',
          likes: 12,
          author: 'Demo User',
          timestamp: Date.now() - 1000,
          liked: false
        },
        {
          id: 'mock-3',
          imageUrl: '/Anamnesis.png',
          description: 'Sample artwork 3',
          emotion: 90,
          backgroundColor: '#059669',
          likes: 8,
          author: 'Demo User',
          timestamp: Date.now() - 2000,
          liked: false
        }
      ];
    }
    
    return storedPosts;
  };

  useEffect(() => {
    // 页面加载完成后触发入场动画
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Load community posts
    setCommunityPosts(getCommunityPosts());

    // Listen for storage changes to update posts when new ones are added
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'communityPosts') {
        setCommunityPosts(getCommunityPosts());
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.7)' }}
        >
          {/* 本地视频文件 */}
          <source src="/background-video.mp4" type="video/mp4" />
          
          
          {/* 后备背景图片，当视频无法加载时显示 */}
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://api.builder.io/api/v1/image/assets/TEMP/3e17b88a74875f55e772f9f3ba7e094ff66020f5?width=3840)",
            }}
          />
        </video>
        
        {/* 可选：添加渐变叠加层以提高文字可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>

      {/* 动态粒子效果 */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid Background - CSS Grid Layout */}
      <div className="absolute inset-0 z-10 p-8 md:p-16 lg:p-20">
        <div className="w-full h-full grid grid-cols-5 grid-rows-3 gap-4 md:gap-6 lg:gap-8">
          {/* Row 1 */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">1</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">2</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">3</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">4</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">5</span>
            </div>
          </div>
          
          {/* Row 2 */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">6</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">7</span>
            </div>
          </div>
          {/* Center space - refresh button will be positioned here */}
          <div className="flex items-center justify-center">
            {/* Empty space for refresh button */}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">8</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">9</span>
            </div>
          </div>
          
          {/* Row 3 */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">10</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">11</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">12</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">13</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-base lg:text-lg">14</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Grid Overlay - hover zones positioned over the static circles */}
      {isLoaded && (
        <div className="absolute inset-0 z-15 pointer-events-none">
          <div className="pointer-events-auto">
            <GridMatrix artworks={communityPosts} refreshKey={refreshKey} />
          </div>
        </div>
      )}

      {/* 中央内容区域 - Logo above everything */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className={`text-center transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          {/* 主标题 - Anamnesis图片 */}
          <img 
            src="/Anamnesis.png" 
            alt="Anamnesis" 
            className="max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto"
          />
        </div>
      </div>

      {/* Green Refresh Button - at center of grid */}
      {isLoaded && (
        <GreenRefreshButton onClick={handleRefresh} />
      )}

      {/* Corner Navigation */}
      <nav className="absolute inset-0 z-30 pointer-events-none">
        {/* Top Left - Creation */}
        <Link
          to="/creation"
          className={`absolute top-4 left-6 text-white font-instrument-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl me-text-hover group cursor-pointer transition-all duration-1000 delay-300 pointer-events-auto ${
            isLoaded ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 transform -translate-x-8 -translate-y-8'
          }`}
        >
          <span className="relative inline-block">
            Creation
            {/* 添加微小的发光指示器，暗示点击后的去向 */}
            <div className="absolute -left-1 top-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:animate-pulse" />
          </span>
        </Link>

        {/* Top Right - Me. */}
        <Link
          to="/profile"
          className={`absolute top-4 right-6 text-white font-instrument-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl me-text-hover group cursor-pointer transition-all duration-1000 delay-500 pointer-events-auto ${
            isLoaded ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 transform translate-x-8 -translate-y-8'
          }`}
        >
          <span className="relative inline-block">
            Me
            {/* 添加微小的发光指示器，暗示点击后的去向 */}
            <div className="absolute -right-1 top-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:animate-pulse" />
          </span>
        </Link>

        {/* Bottom Left - Community */}
        <Link
          to="/community"
          className={`absolute bottom-4 left-6 text-white font-instrument-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl me-text-hover group cursor-pointer transition-all duration-1000 delay-700 pointer-events-auto ${
            isLoaded ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 transform -translate-x-8 translate-y-8'
          }`}
        >
          <span className="relative inline-block">
            Community
            {/* 添加微小的发光指示器，暗示点击后的去向 */}
            <div className="absolute -left-1 bottom-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:animate-pulse" />
          </span>
        </Link>

        {/* Bottom Right - About us. */}
        <Link
          to="/about"
          className={`absolute bottom-4 right-6 text-white font-instrument-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl me-text-hover group cursor-pointer transition-all duration-1000 delay-900 pointer-events-auto ${
            isLoaded ? 'opacity-100 transform translate-x-0 translate-y-0' : 'opacity-0 transform translate-x-8 translate-y-8'
          }`}
        >
          <span className="relative inline-block">
            About us
            {/* 添加微小的发光指示器，暗示点击后的去向 */}
            <div className="absolute -right-1 bottom-0 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-all duration-300 group-hover:animate-pulse" />
          </span>
        </Link>
      </nav>


    </div>
  );
}
