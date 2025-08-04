import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserIcon = () => (
  <svg
    className="w-16 h-16 md:w-20 md:h-20"
    viewBox="0 0 71 71"
    fill="none"
  >
    <path
      d="M14.2057 53.5182C17.2752 51.2457 20.5881 49.4748 24.1445 48.2057C27.701 46.9366 31.4861 46.3021 35.5 46.3021C39.5139 46.3021 43.299 46.9366 46.8555 48.2057C50.4119 49.4748 53.7248 51.2457 56.7943 53.5182C58.9488 51.0096 60.5868 48.2385 61.7083 45.2051C62.8299 42.1722 63.3906 38.9351 63.3906 35.4938C63.3906 27.7358 60.6827 21.1489 55.2669 15.7331C49.8511 10.3173 43.2622 7.60938 35.5 7.60938C27.7378 7.60938 21.1489 10.3173 15.7331 15.7331C10.3173 21.1489 7.60938 27.7358 7.60938 35.4938C7.60938 38.9351 8.17014 42.1722 9.29167 45.2051C10.4132 48.2385 12.0512 51.0096 14.2057 53.5182ZM35.5097 38.8646C32.0796 38.8646 29.184 37.6873 26.8229 35.3327C24.4618 32.978 23.2813 30.0857 23.2813 26.6556C23.2813 23.2255 24.4586 20.3299 26.8132 17.9688C29.1678 15.6076 32.0602 14.4271 35.4903 14.4271C38.9204 14.4271 41.816 15.6044 44.1771 17.959C46.5382 20.3136 47.7188 23.206 47.7188 26.6361C47.7188 30.0662 46.5414 32.9618 44.1868 35.3229C41.8322 37.684 38.9398 38.8646 35.5097 38.8646ZM35.5 70.0312C30.7241 70.0312 26.2359 69.1234 22.0355 67.3077C17.8356 65.4914 14.1821 63.027 11.0749 59.9145C7.96767 56.8014 5.50651 53.1467 3.69141 48.9504C1.8763 44.7547 0.96875 40.2712 0.96875 35.5C0.96875 30.7241 1.8766 26.2359 3.69229 22.0355C5.50858 17.8356 7.97299 14.1821 11.0855 11.0749C14.1986 7.96768 17.8534 5.50651 22.0496 3.69141C26.2453 1.8763 30.7288 0.96875 35.5 0.96875C40.2759 0.96875 44.7641 1.8766 48.9645 3.69229C53.1644 5.50858 56.8179 7.97299 59.9251 11.0855C63.0323 14.1986 65.4935 17.8534 67.3086 22.0496C69.1237 26.2453 70.0312 30.7288 70.0312 35.5C70.0312 40.2759 69.1234 44.7641 67.3077 48.9645C65.4914 53.1644 63.027 56.8179 59.9145 59.9251C56.8014 63.0323 53.1466 65.4935 48.9504 67.3086C44.7547 69.1237 40.2712 70.0312 35.5 70.0312ZM35.5 63.3906C38.5694 63.3906 41.4544 62.9479 44.1549 62.0625C46.8555 61.1771 49.401 59.8785 51.7917 58.1667C49.401 56.4844 46.8555 55.1931 44.1549 54.293C41.4544 53.3928 38.5712 52.9427 35.5053 52.9427C32.4394 52.9427 29.547 53.3854 26.8282 54.2708C24.1094 55.1562 21.5694 56.4549 19.2083 58.1667C21.599 59.8785 24.1445 61.1771 26.8451 62.0625C29.5456 62.9479 32.4306 63.3906 35.5 63.3906ZM35.5 32.224C37.0642 32.224 38.385 31.6853 39.4622 30.6081C40.5395 29.5308 41.0781 28.2101 41.0781 26.6458C41.0781 25.0816 40.5395 23.7609 39.4622 22.6836C38.385 21.6063 37.0642 21.0677 35.5 21.0677C33.9358 21.0677 32.615 21.6063 31.5378 22.6836C30.4605 23.7609 29.9219 25.0816 29.9219 26.6458C29.9219 28.2101 30.4605 29.5308 31.5378 30.6081C32.615 31.6853 33.9358 32.224 35.5 32.224Z"
      fill="white"
    />
  </svg>
);

// 个人作品数据接口
interface PersonalCreation {
  id: string;
  imageUrl: string;
  description: string;
  emotion: number;
  backgroundColor: string;
  timestamp: number;
  isPostedToCommunity?: boolean;
}

// 获取个人作品数据
const getPersonalCreations = (): PersonalCreation[] => {
  const creations = localStorage.getItem('personalCreations');
  return creations ? JSON.parse(creations) : [];
};

// 保存个人作品数据
const savePersonalCreations = (creations: PersonalCreation[]) => {
  localStorage.setItem('personalCreations', JSON.stringify(creations));
};

// 社区帖子数据接口
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

// 获取社区帖子数据
const getCommunityPosts = (): CommunityPost[] => {
  const posts = localStorage.getItem('communityPosts');
  return posts ? JSON.parse(posts) : [];
};

// 保存社区帖子数据
const saveCommunityPosts = (posts: CommunityPost[]) => {
  localStorage.setItem('communityPosts', JSON.stringify(posts));
};

export default function Profile() {
  const [personalCreations, setPersonalCreations] = useState<PersonalCreation[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoaded, setIsLoaded] = useState(false);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setPersonalCreations(getPersonalCreations());
      // 延迟触发动画，确保页面渲染完成后再开始过渡
      setTimeout(() => setIsLoaded(true), 200);
    };
    loadData();

    // 背景颜色循环变化
    const backgroundColors = [
      '#6B7280', '#7C3AED', '#EC4899', '#10B981', 
      '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'
    ];
    
    const backgroundInterval = setInterval(() => {
      setBackgroundIndex(prevIndex => 
        (prevIndex + 1) % backgroundColors.length
      );
    }, 3000);

    return () => clearInterval(backgroundInterval);
  }, []);

  const deleteCreation = (id: string) => {
    const updatedCreations = personalCreations.filter(creation => creation.id !== id);
    setPersonalCreations(updatedCreations);
    savePersonalCreations(updatedCreations);
  };

  const postToCustomCommunity = (id: string) => {
    // 找到要发布的作品
    const creationToPost = personalCreations.find(creation => creation.id === id);
    if (!creationToPost) return;

    // 检查是否已经发布过
    if (creationToPost.isPostedToCommunity) {
      alert('⚠️ This creation has already been posted to the community!');
      return;
    }

    // 获取当前社区帖子
    const currentCommunityPosts = getCommunityPosts();
    
    // 检查社区中是否已存在相同ID的帖子
    const existingPost = currentCommunityPosts.find(post => post.id === id);
    if (existingPost) {
      alert('⚠️ This creation already exists in the community!');
      return;
    }

    // 标记为已发布到社区
    const updatedCreations = personalCreations.map(creation => 
      creation.id === id ? { ...creation, isPostedToCommunity: true } : creation
    );
    setPersonalCreations(updatedCreations);
    savePersonalCreations(updatedCreations);

    // 创建新的社区帖子（使用唯一ID避免冲突）
    const newCommunityPost: CommunityPost = {
      id: `community_${creationToPost.id}_${Date.now()}`,
      imageUrl: creationToPost.imageUrl,
      description: creationToPost.description,
      emotion: creationToPost.emotion,
      backgroundColor: creationToPost.backgroundColor,
      likes: 0,
      author: "You", // 可以根据需要修改为实际用户名
      timestamp: Date.now(),
      liked: false
    };

    // 添加到社区帖子列表
    const updatedCommunityPosts = [newCommunityPost, ...currentCommunityPosts];
    saveCommunityPosts(updatedCommunityPosts);

    // 触发社区更新事件
    window.dispatchEvent(new CustomEvent('communityUpdated'));

    // 显示成功消息
    alert('🌟 Successfully posted to community!');
  };

  // 动态背景颜色数组
  const backgroundColors = [
    '#6B7280', '#7C3AED', '#EC4899', '#10B981', 
    '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'
  ];

  const currentBackgroundColor = personalCreations.length > 0 
    ? personalCreations[0]?.backgroundColor || backgroundColors[backgroundIndex]
    : backgroundColors[backgroundIndex];

  return (
    <div 
      className={`min-h-screen relative transition-all duration-[2000ms] ease-in-out ${
        isLoaded ? 'opacity-100' : 'opacity-95'
      }`}
      style={{
        background: `linear-gradient(135deg, ${currentBackgroundColor}40, #111827 70%)`
      }}
    >
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

      <div className="px-4 md:px-8 lg:px-16 py-32">
        {/* Header - Me. 从Home页面无缝过渡 */}
        <div className="text-center mb-16 relative">
          <div className="relative h-32 md:h-40 lg:h-48 xl:h-56 flex items-center justify-center">
            {/* Me. 文字从Home页面右上角位置精确飞入并放大到中心 */}
            <h1 className={`font-instrument-serif text-white drop-shadow-2xl transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isLoaded 
                ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl' 
                : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
            }`}
            style={{
              transform: isLoaded 
                ? 'translate(0, 0) scale(1)' 
                : 'translate(calc(45vw - 3rem), calc(-45vh + 1.5rem)) scale(0.75)',
              transformOrigin: 'center',
              filter: isLoaded ? 'blur(0px)' : 'blur(0.5px)',
              opacity: isLoaded ? 1 : 0.8
            }}>
              Me.
            </h1>
            
            {/* 添加柔和的粒子效果 */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-[1800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isLoaded ? 'opacity-0' : 'opacity-40'
            }`}>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 h-0.5 bg-white/60 rounded-full"
                  style={{
                    top: `${25 + i * 12}%`,
                    right: `${15 + i * 8}%`,
                    animation: `particle-trail ${2 + i * 0.3}s ease-out infinite`,
                    animationDelay: `${i * 200}ms`,
                    transform: `translate(${Math.sin(i) * 15}px, ${Math.cos(i) * 15}px)`
                  }}
                />
              ))}
            </div>
            
            {/* 用户图标柔和出现并添加浮动效果 */}
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 transition-all duration-[1000ms] delay-[2500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-[30px] opacity-0 scale-95'
            }`}>
              <div className="text-3xl font-bold text-white">{personalCreations.length}</div>
              <div className="text-white/70 font-neue-montreal">Dreams Saved</div>
            </div>
            <div className={`bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 transition-all duration-[1000ms] delay-[2700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-[30px] opacity-0 scale-95'
            }`}>
              <div className="text-3xl font-bold text-white">
                {personalCreations.filter(c => c.isPostedToCommunity).length}
              </div>
              <div className="text-white/70 font-neue-montreal">Posted</div>
            </div>
          </div>

          {/* View Toggle */}
          <div className={`flex justify-center gap-4 mb-8 transition-all duration-800 delay-[2900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
            isLoaded 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-[20px] opacity-0'
          }`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-3 rounded-full font-neue-montreal transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-105'
              }`}
            >
              🎯 Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 rounded-full font-neue-montreal transition-all duration-300 ${
                viewMode === 'list'
                  ? 'bg-white text-black shadow-xl scale-105'
                  : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 hover:scale-105'
              }`}
            >
              📋 List View
            </button>
          </div>
        </div>

        {personalCreations.length > 0 ? (
          /* State with Dreams */
          <>
            <div className={`max-w-4xl mx-auto mb-16 text-center transition-all duration-700 delay-[1800ms] ease-out transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-[40px] opacity-0'
            }`}>
              <p className="text-2xl md:text-3xl lg:text-4xl font-instrument-serif text-white leading-tight drop-shadow-lg">
                These are the dreams you chose to remember.
                <br />
                <span className="text-white/80">They're still here, waiting to be posted.</span>
              </p>
            </div>

            {/* Dreams Content */}
            <div className={`max-w-7xl mx-auto transition-all duration-800 delay-[2000ms] ease-out transform ${
              isLoaded 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-[50px] opacity-0'
            }`}>
              {viewMode === 'grid' ? (
                /* Grid View */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                  {personalCreations.map((creation) => (
                    <div
                      key={creation.id}
                      className="group relative"
                    >
                      <div 
                        className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 relative aspect-[3/4]"
                        style={{
                          background: `linear-gradient(135deg, ${creation.backgroundColor}40, ${creation.backgroundColor}20)`
                        }}
                      >
                        {/* Image */}
                        {creation.imageUrl && (
                          <img
                            src={creation.imageUrl}
                            alt="Personal creation"
                            className="w-full h-full object-cover"
                          />
                        )}
                        
                        {/* Overlay with controls */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: creation.emotion >= 50 ? '#4ADE80' : '#EF4444' }}
                              />
                              <span className="text-white text-sm">
                                {creation.emotion >= 50 ? 'Pleasant' : 'Unpleasant'} • {creation.emotion}%
                              </span>
                            </div>
                            
                            {creation.description && (
                              <p className="text-white text-sm mb-4 line-clamp-2">
                                {creation.description}
                              </p>
                            )}
                            
                            <div className="flex gap-2">
                              <button
                                onClick={() => postToCustomCommunity(creation.id)}
                                disabled={creation.isPostedToCommunity}
                                className={`flex-1 px-3 py-2 rounded-full text-xs font-neue-montreal transition-all ${
                                  creation.isPostedToCommunity
                                    ? 'bg-green-500/50 text-white cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                              >
                                {creation.isPostedToCommunity ? '✓ Posted' : '📮 Post'}
                              </button>
                              <button
                                onClick={() => deleteCreation(creation.id)}
                                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-xs transition-all"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Status badges */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          {creation.isPostedToCommunity && (
                            <div className="bg-green-500/90 backdrop-blur-sm rounded-full px-2 py-1">
                              <span className="text-white text-xs">✓ Posted</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* List View */
                <div className="space-y-4">
                  {personalCreations.map((creation) => (
                    <div
                      key={creation.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-6 hover:bg-white/15 transition-all duration-300"
                    >
                      {/* Image Thumbnail */}
                      <div 
                        className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: creation.backgroundColor }}
                      >
                        {creation.imageUrl && (
                          <img
                            src={creation.imageUrl}
                            alt="Creation"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: creation.emotion >= 50 ? '#4ADE80' : '#EF4444' }}
                          />
                          <span className="text-white font-neue-montreal">
                            {creation.emotion >= 50 ? 'Pleasant' : 'Unpleasant'} • {creation.emotion}%
                          </span>
                          <span className="text-white/60 text-sm">
                            {new Date(creation.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        {creation.description && (
                          <p className="text-white/80 text-sm line-clamp-2 mb-3">
                            {creation.description}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => postToCustomCommunity(creation.id)}
                          disabled={creation.isPostedToCommunity}
                          className={`px-4 py-2 rounded-full text-sm font-neue-montreal transition-all ${
                            creation.isPostedToCommunity
                              ? 'bg-green-500/50 text-white cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600 text-white'
                          }`}
                        >
                          {creation.isPostedToCommunity ? '✓ Posted' : '📮 Post to Community'}
                        </button>
                        <button
                          onClick={() => deleteCreation(creation.id)}
                          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full text-sm transition-all"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                  </div>
                ))}
              </div>
              )}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className={`text-center py-20 transition-all duration-800 delay-[1800ms] ease-out transform ${
            isLoaded 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-[60px] opacity-0 scale-95'
          }`}>
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-16 max-w-2xl mx-auto">
              <div className="text-8xl mb-8">💭</div>
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif text-white mb-6 leading-tight">
              You haven't recorded any dreams yet.
              </h3>
              <p className="text-lg md:text-xl font-neue-montreal text-white/80 mb-8 leading-relaxed">
                Maybe start with what you remembered this morning.
              <br />
                Every creation becomes a precious memory.
              </p>
              <Link
                to="/creation"
                className="inline-block bg-white hover:bg-gray-200 text-black font-instrument-serif text-lg px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-xl"
              >
                🎨 Start Your First Dream
              </Link>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
          <Link
            to="/creation"
          className={`fixed bottom-8 right-8 bg-white hover:bg-gray-200 text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-500 delay-[2200ms] ease-out transform z-50 ${
            isLoaded 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-[100px] opacity-0 scale-75'
          }`}
          >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          </Link>
      </div>
    </div>
  );
}
