import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeartIcon = ({ filled = false, className = "w-8 h-8" }: { filled?: boolean; className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 54 54"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="54" height="54" fill="black" fillOpacity="0.5" />
    <path
      d="M27 47.2499L23.7375 44.3249C19.95 40.9124 16.8187 37.9687 14.3438 35.4937C11.8687 33.0187 9.9 30.7968 8.4375 28.828C6.975 26.8593 5.95312 25.0499 5.37187 23.3999C4.79063 21.7499 4.5 20.0624 4.5 18.3374C4.5 14.8124 5.68125 11.8687 8.04375 9.50615C10.4062 7.14365 13.35 5.9624 16.875 5.9624C18.825 5.9624 20.6812 6.3749 22.4438 7.1999C24.2062 8.0249 25.725 9.1874 27 10.6874C28.275 9.1874 29.7937 8.0249 31.5562 7.1999C33.3187 6.3749 35.175 5.9624 37.125 5.9624C40.65 5.9624 43.5938 7.14365 45.9562 9.50615C48.3187 11.8687 49.5 14.8124 49.5 18.3374C49.5 20.0624 49.2094 21.7499 48.6281 23.3999C48.0469 25.0499 47.025 26.8593 45.5625 28.828C44.1 30.7968 42.1312 33.0187 39.6562 35.4937C37.1812 37.9687 34.05 40.9124 30.2625 44.3249L27 47.2499Z"
      fill={filled ? "#FF6B6B" : "#D3E0E3"}
    />
  </svg>
);

// 作品数据接口
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

// 获取社区作品数据
const getCommunityPosts = (): CommunityPost[] => {
  const posts = localStorage.getItem('communityPosts');
  return posts ? JSON.parse(posts) : [];
};

// 保存社区作品数据
const saveCommunityPosts = (posts: CommunityPost[]) => {
  localStorage.setItem('communityPosts', JSON.stringify(posts));
};

export default function Community() {
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCommunityPosts(getCommunityPosts());

    // 监听localStorage变化，当有新的帖子分享到社区时自动更新
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'communityPosts') {
        setCommunityPosts(getCommunityPosts());
      }
    };

    // 监听storage事件
    window.addEventListener('storage', handleStorageChange);

    // 监听自定义事件（用于同一个tab内的更新）
    const handleCommunityUpdate = () => {
      setCommunityPosts(getCommunityPosts());
    };

    window.addEventListener('communityUpdated', handleCommunityUpdate);

    // 延迟触发动画，确保页面渲染完成后再开始过渡
    setTimeout(() => setIsLoaded(true), 200);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('communityUpdated', handleCommunityUpdate);
    };
  }, []);

  const handleLike = (postId: string) => {
    const updatedPosts = communityPosts.map(post => {
      if (post.id === postId) {
        const newLiked = !post.liked;
        return {
          ...post,
          liked: newLiked,
          likes: newLiked ? post.likes + 1 : Math.max(0, post.likes - 1)
        };
      }
      return post;
    });
    setCommunityPosts(updatedPosts);
    saveCommunityPosts(updatedPosts);
  };

  const getFilteredPosts = () => {
    switch (filter) {
      case 'recent':
        return [...communityPosts].sort((a, b) => b.timestamp - a.timestamp);
      case 'popular':
        return [...communityPosts].sort((a, b) => b.likes - a.likes);
      default:
        return communityPosts;
    }
  };
  const filteredPosts = getFilteredPosts();

  return (
    <div className="min-h-screen relative">
      {/* Dynamic Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          background: "linear-gradient(135deg, #FFF1DA 0%, #E8F4FD 50%, #F0E6FF 100%)",
        }}
      />

      {/* Logo */}
      <Link
        to="/home"
        className="absolute top-6 left-2 w-44 h-44 md:w-52 md:h-52 z-50 hover:opacity-80 transition-all duration-300 hover:scale-105"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f20475a744968b959788bb6fd3f9a055d93ec?width=1600"
          alt="Logo"
          className="w-full h-full object-contain cursor-pointer drop-shadow-lg"
        />
      </Link>

      {/* Content */}
      <div className="relative z-20 px-4 md:px-8 lg:px-12 pt-32 pb-16">
        {/* Header - Community 从Home页面无缝过渡 */}
        <div className="mb-16">
          <div className="text-center mb-12 relative">
            <div className="relative h-32 md:h-40 lg:h-48 xl:h-56 flex items-center justify-center">
              {/* Community 文字从Home页面左下角位置精确飞入并放大到中心 */}
              <h1 className={`font-instrument-serif text-black drop-shadow-lg transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isLoaded 
                  ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-8' 
                  : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4'
              }`}
              style={{
                transform: isLoaded 
                  ? 'translate(0, 0) scale(1)' 
                  : 'translate(calc(-45vw + 3rem), calc(45vh - 1.5rem)) scale(0.75)',
                transformOrigin: 'center',
                filter: isLoaded ? 'blur(0px)' : 'blur(0.5px)',
                opacity: isLoaded ? 1 : 0.8
              }}>
                🌟 Community
              </h1>
              
              {/* 添加柔和的粒子效果 */}
              <div className={`absolute inset-0 pointer-events-none transition-all duration-[1800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                isLoaded ? 'opacity-0' : 'opacity-40'
              }`}>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-black/60 rounded-full"
                    style={{
                      bottom: `${25 + i * 12}%`,
                      left: `${15 + i * 8}%`,
                      animation: `particle-trail ${2 + i * 0.3}s ease-out infinite`,
                      animationDelay: `${i * 200}ms`,
                      transform: `translate(${Math.sin(i) * 15}px, ${Math.cos(i) * 15}px)`
                    }}
                  />
                ))}
              </div>
            </div>
            
            <div className={`max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl font-neue-montreal text-black/80 leading-relaxed space-y-3 mb-8 transition-all duration-[1000ms] delay-[2500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-[30px] opacity-0'
            }`}>
              <p className="font-medium">These aren't artworks. They're memories.</p>
              <p>Left behind by people, using what imagination they still had.</p>
              <p>If one touches something in you, click like. ❤️</p>
            </div>

            {/* Filter Buttons */}
            <div className={`flex justify-center gap-4 mb-8 transition-all duration-800 delay-[2700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-[20px] opacity-0'
            }`}>
              {(['all', 'recent', 'popular'] as const).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-6 py-3 rounded-full font-neue-montreal text-lg transition-all duration-300 ${
                    filter === filterType
                      ? 'bg-black text-white shadow-xl scale-105'
                      : 'bg-white/60 backdrop-blur-sm text-black hover:bg-white/80 hover:scale-105'
                  }`}
                >
                  {filterType === 'all' && '🎭 All Dreams'}
                  {filterType === 'recent' && '⏰ Recent'}
                  {filterType === 'popular' && '🔥 Popular'}
                </button>
              ))}
            </div>

            <div className={`text-center text-black/60 font-neue-montreal transition-all duration-600 delay-[2900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-[15px] opacity-0'
            }`}>
              {filteredPosts.length} dreams shared by the community
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} className={`relative group cursor-pointer ${
                  index % 5 === 0 ? 'md:col-span-2' : ''
                } ${index % 7 === 0 ? 'lg:row-span-2' : ''}`}>
                  <div 
                    className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative"
                    style={{
                      background: `linear-gradient(135deg, ${post.backgroundColor}40, ${post.backgroundColor}20)`,
                      aspectRatio: index % 5 === 0 ? '16/9' : index % 3 === 0 ? '1/1' : '3/4'
                    }}
                  >
                    {/* Image */}
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt="Community creation"
                        className="w-full h-full object-cover"
                      />
                    )}
                    
                    {/* Overlay with info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: post.emotion >= 50 ? '#4ADE80' : '#EF4444' }}
                            />
                            <span className="text-sm opacity-80">
                              {post.emotion >= 50 ? 'Pleasant' : 'Unpleasant'} • {post.emotion}%
                            </span>
                          </div>
                          {post.description && (
                            <p className="text-sm leading-relaxed line-clamp-3">
                              {post.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs opacity-70">
                            by {post.author} • {new Date(post.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Like Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(post.id);
                      }}
                      className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 hover:bg-black/70 transition-all duration-300 hover:scale-110"
                    >
                      <HeartIcon filled={post.liked} className="w-6 h-6" />
                    </button>

                    {/* Likes Count */}
                    {post.likes > 0 && (
                      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                        <span className="text-white text-sm font-neue-montreal">
                          ❤️ {post.likes}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🌟</div>
                <h3 className="text-3xl md:text-4xl font-instrument-serif text-black mb-6">
                  No dreams shared yet
                </h3>
                <p className="text-lg md:text-xl font-neue-montreal text-black/70 mb-8 leading-relaxed">
                  Be the first to share your creation with the community. 
                  Every dream matters, every memory counts.
                </p>
                <Link
                  to="/creation"
                  className="inline-block bg-black hover:bg-gray-800 text-white font-instrument-serif text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  🎨 Start Creating
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Create Button - Floating */}
        <Link
          to="/creation"
          className="fixed bottom-8 right-8 bg-black hover:bg-gray-800 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 z-50"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
