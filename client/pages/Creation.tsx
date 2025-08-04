import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const ExerciseIcon = () => (
  <svg
    className="w-12 h-12"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M59.1151 23.6874L54.9589 19.5312L57.6109 16.7999L47.2005 6.3895L44.4693 9.04158L40.2339 4.80616L42.7672 2.23325C43.9547 1.04575 45.4127 0.465192 47.1412 0.491581C48.8696 0.51797 50.3276 1.12491 51.5151 2.31241L61.688 12.4853C62.8755 13.6728 63.4693 15.1176 63.4693 16.8197C63.4693 18.5218 62.8755 19.9666 61.688 21.1541L59.1151 23.6874ZM21.2339 61.6478C20.0464 62.8353 18.6016 63.4291 16.8995 63.4291C15.1974 63.4291 13.7526 62.8353 12.5651 61.6478L2.23385 51.277C1.07274 50.1159 0.492188 48.7173 0.492188 47.0812C0.492188 45.4451 1.07274 44.0464 2.23385 42.8853L4.88594 40.2332L9.12136 44.4291L6.3901 47.1207L16.8797 57.6103L19.5714 54.8791L23.7672 59.1145L21.2339 61.6478ZM52.8214 35.4437L57.6109 30.6541L33.3464 6.3895L28.5568 11.1791L52.8214 35.4437ZM30.6547 57.6103L35.4443 52.7416L11.2589 28.5562L6.3901 33.3457L30.6547 57.6103ZM30.1797 39.0853L39.1651 30.1791L33.8214 24.8353L24.9151 33.8207L30.1797 39.0853ZM34.8901 61.7666C33.7554 62.9013 32.3502 63.4687 30.6745 63.4687C28.9988 63.4687 27.5936 62.9013 26.4589 61.7666L2.23385 37.5416C1.07274 36.3805 0.492188 34.9753 0.492188 33.326C0.492188 31.6766 1.07274 30.2714 2.23385 29.1103L7.02344 24.3207C8.18455 23.1596 9.58316 22.5791 11.2193 22.5791C12.8554 22.5791 14.254 23.1596 15.4151 24.3207L20.6797 29.5853L29.6651 20.5999L24.4005 15.3749C23.2394 14.2138 22.6589 12.8086 22.6589 11.1593C22.6589 9.50998 23.2394 8.10478 24.4005 6.94366L29.1901 2.15408C30.3512 0.99297 31.7498 0.412415 33.3859 0.412415C35.0221 0.412415 36.4207 0.99297 37.5818 2.15408L61.8464 26.4187C63.0075 27.5798 63.588 28.9784 63.588 30.6145C63.588 32.2506 63.0075 33.6492 61.8464 34.8103L57.0568 39.5999C55.8957 40.761 54.4905 41.3416 52.8412 41.3416C51.1918 41.3416 49.7866 40.761 48.6255 39.5999L43.4005 34.3353L34.4151 43.3207L39.6797 48.5853C40.8144 49.7201 41.3818 51.1187 41.3818 52.7812C41.3818 54.4437 40.8144 55.8423 39.6797 56.977L34.8901 61.7666Z"
      fill="white"
    />
  </svg>
);

// 移除了UploadIcon，因为现在使用画板而不是上传

// 根据emotion值计算颜色
const getEmotionColor = (emotion) => {
  // 将emotion值(0-100)映射到HSL色相(0-120)
  // 0 = 红色(0°), 50 = 黄色(60°), 100 = 绿色(120°)
  const hue = (emotion / 100) * 120;
  return `hsl(${hue}, 70%, 55%)`;
};

// 获取渐变背景色
const getEmotionGradient = () => {
  return 'linear-gradient(to right, hsl(0, 70%, 55%) 0%, hsl(60, 70%, 55%) 50%, hsl(120, 70%, 55%) 100%)';
};

// 颜色提取函数
const extractMainColor = (imageElement) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = imageElement.width;
  canvas.height = imageElement.height;
  
  ctx.drawImage(imageElement, 0, 0);
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  let r = 0, g = 0, b = 0;
  let pixelCount = 0;
  
  // 采样像素以提取平均颜色
  for (let i = 0; i < data.length; i += 40) { // 每10个像素采样一次
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
    pixelCount++;
  }
  
  r = Math.floor(r / pixelCount);
  g = Math.floor(g / pixelCount);
  b = Math.floor(b / pixelCount);
  
  return `rgb(${r}, ${g}, ${b})`;
};

export default function Creation() {
  const [emotion, setEmotion] = useState(50);
  const [description, setDescription] = useState("");
  const [currentView, setCurrentView] = useState("drawing"); // 'drawing' or 'inspiration'
  const [backgroundColor, setBackgroundColor] = useState("rgb(0, 0, 0)");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDraggingEmotion, setIsDraggingEmotion] = useState(false);
  
  // 画板相关状态
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState('brush'); // 'brush' or 'eraser'
  const [currentColor, setCurrentColor] = useState('#434343');
  const [brushSize, setBrushSize] = useState(5);
  const [canvasImage, setCanvasImage] = useState(null);

  // 获取正确的画布坐标
  const getCanvasCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  // 获取触摸事件的坐标
  const getTouchCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch = e.touches[0];
    
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    };
  };

  // 画板绘制相关函数
  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const { x, y } = getCanvasCoordinates(e);
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const { x, y } = getCanvasCoordinates(e);
    
    const ctx = canvas.getContext('2d');
    
    if (currentTool === 'brush') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = currentColor;
    } else if (currentTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    }
    
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      updateCanvasImage();
      extractCanvasColor();
    }
  };

  // 更新画板图片
  const updateCanvasImage = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    setCanvasImage(dataURL);
  };

  // 从画板提取颜色
  const extractCanvasColor = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let r = 0, g = 0, b = 0;
    let pixelCount = 0;
    
    // 采样像素以提取平均颜色
    for (let i = 0; i < data.length; i += 40) {
      // 跳过透明像素
      if (data[i + 3] > 0) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        pixelCount++;
      }
    }
    
    if (pixelCount > 0) {
      r = Math.floor(r / pixelCount);
      g = Math.floor(g / pixelCount);
      b = Math.floor(b / pixelCount);
      setBackgroundColor(`rgb(${r}, ${g}, ${b})`);
    }
  };

  // 清空画板
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setCanvasImage(null);
    setBackgroundColor("rgb(0, 0, 0)");
    updateCanvasImage();
  };

  // 初始化画板和动画
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    // 延迟触发动画，确保页面渲染完成后再开始过渡
    setTimeout(() => setIsLoaded(true), 200);
  }, [currentView]);

  // 处理全局鼠标事件，确保拖动状态正确重置
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDraggingEmotion(false);
    };

    const handleGlobalTouchEnd = () => {
      setIsDraggingEmotion(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  // 保存到个人页面
  const saveToPersonal = () => {
    if (!canvasImage) {
      alert('Please draw something first');
      return;
    }

    const personalCreation = {
      id: Date.now().toString(),
      imageUrl: canvasImage,
      description: description,
      emotion: emotion,
      backgroundColor: backgroundColor,
      timestamp: Date.now(),
      isSharedToCommunity: false
    };

    // 保存到localStorage
    const existingCreations = JSON.parse(localStorage.getItem('personalCreations') || '[]');
    const updatedCreations = [personalCreation, ...existingCreations];
    localStorage.setItem('personalCreations', JSON.stringify(updatedCreations));

    alert('✅ Saved to your personal collection!');
  };

  // 发布到社区
  const publishToCommunity = () => {
    if (!canvasImage) {
      alert('Please draw something first');
      return;
    }

    const communityPost = {
      id: Date.now().toString(),
      imageUrl: canvasImage,
      description: description,
      emotion: emotion,
      backgroundColor: backgroundColor,
      likes: 0,
      author: 'You',
      timestamp: Date.now(),
      liked: false
    };

    // 保存到community posts
    const existingPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
    const updatedPosts = [communityPost, ...existingPosts];
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

    // 同时保存到个人收藏（标记为已分享）
    const personalCreation = {
      id: communityPost.id,
      imageUrl: canvasImage,
      description: description,
      emotion: emotion,
      backgroundColor: backgroundColor,
      timestamp: Date.now(),
      isSharedToCommunity: true
    };

    const existingCreations = JSON.parse(localStorage.getItem('personalCreations') || '[]');
    const updatedCreations = [personalCreation, ...existingCreations];
    localStorage.setItem('personalCreations', JSON.stringify(updatedCreations));

    alert('🌟 Published to community and saved to your collection!');
  };

  if (currentView === "inspiration") {
    return (
      <div className="min-h-screen bg-black relative">
              {/* Logo */}
      <Link
        to="/home"
        className="absolute top-4 left-1 w-48 h-48 md:w-56 md:h-56 z-50 hover:opacity-80 transition-opacity"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f20475a744968b959788bb6fd3f9a055d93ec?width=1600"
          alt="Logo"
          className="w-full h-full object-contain cursor-pointer"
          />
        </Link>

        <div className="flex items-center justify-center min-h-screen px-4 md:px-8">
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Inspiration text */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Creation 文字从Home页面左上角位置精确飞入 */}
                <h1 className={`font-instrument-serif text-white drop-shadow-2xl transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                  isLoaded 
                    ? 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl mb-8' 
                    : 'text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4'
                }`}
                style={{
                  transform: isLoaded 
                    ? 'translate(0, 0) scale(1)' 
                    : 'translate(calc(-45vw + 3rem), calc(-45vh + 1.5rem)) scale(0.75)',
                  transformOrigin: 'center',
                  filter: isLoaded ? 'blur(0px)' : 'blur(0.5px)',
                  opacity: isLoaded ? 1 : 0.8
                }}>
                  Creation
                  <span className={`ml-4 transition-all duration-[3000ms] delay-1000 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                    isLoaded ? 'text-2xl md:text-3xl lg:text-4xl opacity-100' : 'text-lg md:text-xl lg:text-2xl opacity-0'
                  }`}>
                    <ExerciseIcon />
                  </span>
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
                        left: `${15 + i * 8}%`,
                        animation: `particle-trail ${2 + i * 0.3}s ease-out infinite`,
                        animationDelay: `${i * 200}ms`,
                        transform: `translate(${Math.sin(i) * 15}px, ${Math.cos(i) * 15}px)`
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className={`space-y-4 text-white font-neue-montreal text-lg md:text-xl lg:text-2xl leading-relaxed transition-all duration-[1000ms] delay-[2500ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] transform ${
                isLoaded 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-[30px] opacity-0'
              }`}>
                <p>What did you dream last night?</p>
                <p>Draw it and write a little.</p>
                <p>It doesn't have to look good.</p>
                <p>You just have to recording.</p>
              </div>
            </div>

            {/* Right side - Inspiration image */}
            <div className="order-1 lg:order-2 relative">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/01444e9deaa65d31c0a8a3c68fc896c9240b14c2?width=1394"
                alt="Dream inspiration"
                className="w-full rounded-lg opacity-70"
              />

              {/* Start creation button overlay */}
              <button
                onClick={() => setCurrentView("drawing")}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-8 py-4 text-white font-instrument-serif text-xl lg:text-2xl xl:text-3xl hover:bg-black/70 transition-all duration-300 border-2 border-white/30"
              >
                start your creation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen relative transition-all duration-1000 ease-in-out"
      style={{
        background: `linear-gradient(135deg, ${backgroundColor} 0%, rgba(0,0,0,0.8) 50%, #000 100%)`
      }}
    >
      {/* Logo */}
      <Link
        to="/home"
        className="absolute top-4 left-1 w-48 h-48 md:w-56 md:h-56 z-50 hover:opacity-80 transition-opacity"
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/cc7f20475a744968b959788bb6fd3f9a055d93ec?width=1600"
          alt="Logo"
          className="w-full h-full object-contain cursor-pointer"
        />
      </Link>

      <div className="px-4 md:px-8 lg:px-16 py-20">
        {/* Header - Creation 从Home页面无缝过渡 */}
        <div className="text-center mb-12">
          <div className="relative flex items-center justify-center mb-6">
            {/* Creation 文字从Home页面左上角位置精确飞入并放大到中心 */}
            <h1 className={`font-instrument-serif text-white drop-shadow-2xl transition-all duration-[3000ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
              isLoaded 
                ? 'text-5xl md:text-6xl lg:text-7xl xl:text-8xl' 
                : 'text-3xl md:text-4xl lg:text-5xl xl:text-6xl'
            }`}
            style={{
              transform: isLoaded 
                ? 'translate(0, 0) scale(1)' 
                : 'translate(calc(-45vw + 3rem), calc(-45vh + 1.5rem)) scale(0.75)',
              transformOrigin: 'center',
              filter: isLoaded ? 'blur(0px)' : 'blur(0.5px)',
              opacity: isLoaded ? 1 : 0.8
            }}>
              Creation
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
                    left: `${15 + i * 8}%`,
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
            Draw your dreams.
          </p>
          
          {canvasImage && (
            <div className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full inline-block">
              <p className="text-white/80 text-lg font-neue-montreal">
                🎨 Background adapted from your creation
              </p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Drawing Area */}
          <div className="lg:col-span-2">
            {/* Drawing Tools */}
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 mb-6 border border-white/20">
              <div className="flex flex-wrap items-center gap-4">
                {/* Tool Selection */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentTool('brush')}
                    className={`px-4 py-2 rounded-full font-neue-montreal text-sm transition-all ${
                      currentTool === 'brush'
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    🖌️ Brush
                  </button>
                  <button
                    onClick={() => setCurrentTool('eraser')}
                    className={`px-4 py-2 rounded-full font-neue-montreal text-sm transition-all ${
                      currentTool === 'eraser'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    🧽 Eraser
                  </button>
                </div>

                {/* Color Palette */}
                <div className="flex gap-2">
                  {[
                    '#434343', '#CFCFCF', '#13AE5C', '#A0D5F7', '#6B5F95', '#FFFFFF'
                  ].map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                        currentColor === color ? 'border-white shadow-lg' : 'border-white/30'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Brush Size */}
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm font-neue-montreal">Size:</span>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={brushSize}
                    onChange={(e) => setBrushSize(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-white text-sm font-neue-montreal w-8">{brushSize}px</span>
                </div>

                {/* Clear Button */}
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-full font-neue-montreal text-sm transition-all border border-red-500/30"
                >
                  🗑️ Clear
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border-2 border-white/20">
              <canvas
                ref={canvasRef}
                width={800}
                height={600}
                className="w-full h-auto bg-white rounded-2xl cursor-crosshair shadow-xl block"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setIsDrawing(true);
                  const canvas = canvasRef.current;
                  const { x, y } = getTouchCoordinates(e);
                  
                  const ctx = canvas.getContext('2d');
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  if (!isDrawing) return;
                  
                  const canvas = canvasRef.current;
                  const { x, y } = getTouchCoordinates(e);
                  
                  const ctx = canvas.getContext('2d');
                  
                  if (currentTool === 'brush') {
                    ctx.globalCompositeOperation = 'source-over';
                    ctx.strokeStyle = currentColor;
                  } else if (currentTool === 'eraser') {
                    ctx.globalCompositeOperation = 'destination-out';
                  }
                  
                  ctx.lineWidth = brushSize;
                  ctx.lineCap = 'round';
                  ctx.lineJoin = 'round';
                  
                  ctx.lineTo(x, y);
                  ctx.stroke();
                  ctx.beginPath();
                  ctx.moveTo(x, y);
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  if (isDrawing) {
                    setIsDrawing(false);
                    updateCanvasImage();
                    extractCanvasColor();
                  }
                }}
                style={{ 
                  touchAction: 'none',
                  maxHeight: '500px'
                }}
              />
              
              {/* Canvas Info */}
              <div className="mt-4 text-center">
                <p className="text-white/70 text-sm font-neue-montreal">
                  🎨 Click/touch and drag to draw • Use different colors and tools above • Your creation will adapt the background
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="space-y-8">
            {/* Emotion Slider */}
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-white text-2xl md:text-3xl font-instrument-serif text-center mb-8 drop-shadow-lg">
                🎭 Your Emotion
              </h3>

              <div className="relative mb-6">
                {/* 彩虹渐变轨道背景 */}
                <div 
                  className="w-full h-3 rounded-full opacity-30"
                  style={{ background: getEmotionGradient() }}
                />
                
                {/* 主要轨道 */}
                <div className="absolute inset-0 w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full shadow-lg ${isDraggingEmotion ? '' : 'transition-all duration-150'}`}
                    style={{ 
                      width: `${emotion}%`,
                      background: `linear-gradient(to right, hsl(0, 70%, 55%) 0%, ${getEmotionColor(emotion)} 100%)`,
                      boxShadow: `0 0 10px ${getEmotionColor(emotion)}40`
                    }}
                  />
                </div>
                
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={emotion}
                  onChange={(e) => setEmotion(Number(e.target.value))}
                  onMouseDown={() => setIsDraggingEmotion(true)}
                  onMouseUp={() => setIsDraggingEmotion(false)}
                  onMouseLeave={() => setIsDraggingEmotion(false)}
                  onTouchStart={() => setIsDraggingEmotion(true)}
                  onTouchEnd={() => setIsDraggingEmotion(false)}
                  onTouchCancel={() => setIsDraggingEmotion(false)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                {/* 拖动手柄 */}
                <div
                  className={`absolute top-1/2 w-7 h-7 rounded-full shadow-xl transform -translate-y-1/2 -translate-x-1/2 pointer-events-none border-2 border-white/70 ${isDraggingEmotion ? 'scale-125' : 'transition-all duration-150'}`}
                  style={{ 
                    left: `${emotion}%`,
                    backgroundColor: getEmotionColor(emotion),
                    boxShadow: `0 0 15px ${getEmotionColor(emotion)}60, 0 4px 8px rgba(0,0,0,0.2)`
                  }}
                >
                  {/* 内部发光点 */}
                  <div 
                    className="absolute inset-1 rounded-full opacity-60"
                    style={{ backgroundColor: getEmotionColor(emotion) }}
                  />
                </div>
                

              </div>

              <div className="flex justify-between text-white/80 text-sm font-neue-montreal">
                <span>😔 Unpleasant</span>
                <span className="text-white/60">|</span>
                <span>😊 Pleasant</span>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm border border-white/20">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getEmotionColor(emotion) }}
                  />
                  <span className="text-white/90 text-sm font-neue-montreal font-medium">
                    {emotion}% 
                    {emotion <= 20 ? ' 😢' : 
                     emotion <= 40 ? ' 😔' : 
                     emotion <= 60 ? ' 😐' : 
                     emotion <= 80 ? ' 🙂' : ' 😊'}
                  </span>
                  <span 
                    className="text-xs font-neue-montreal font-medium"
                    style={{ color: getEmotionColor(emotion) }}
                  >
                    {emotion <= 20 ? 'Very Sad' : 
                     emotion <= 40 ? 'Unpleasant' : 
                     emotion <= 60 ? 'Neutral' : 
                     emotion <= 80 ? 'Pleasant' : 'Very Happy'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-white text-2xl md:text-3xl font-instrument-serif text-center mb-6 drop-shadow-lg">
                ✍️ Your Story
              </h3>

              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your artwork, your feelings, your inspiration..."
                  className="w-full h-32 p-4 rounded-xl border-none outline-none resize-none bg-white/10 backdrop-blur-sm text-white placeholder-white/50 focus:bg-white/15 transition-all duration-300 border border-white/20"
                  maxLength={500}
                />
                <div className="absolute bottom-2 right-2 text-white/40 text-xs font-neue-montreal">
                  {description.length}/500
                </div>
              </div>
            </div>

            {/* Color Info */}
            {canvasImage && (
              <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                <h3 className="text-white text-xl font-instrument-serif text-center mb-4 drop-shadow-lg">
                  🎨 Extracted Colors
                </h3>
                <div className="flex items-center justify-center space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                    style={{ backgroundColor: backgroundColor }}
                  ></div>
                  <div className="text-white/80 text-sm font-neue-montreal">
                    {backgroundColor}
                  </div>
                </div>
              </div>
            )}

            {/* Drawing Stats */}
            <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-white text-xl font-instrument-serif text-center mb-4 drop-shadow-lg">
                🖌️ Current Tools
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-neue-montreal">Tool:</span>
                  <span className="text-white">
                    {currentTool === 'brush' ? '🖌️ Brush' : '🧽 Eraser'}
                  </span>
                </div>
                {currentTool === 'brush' && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/80 font-neue-montreal">Color:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded-full border border-white/30"
                        style={{ backgroundColor: currentColor }}
                      />
                      <span className="text-white text-sm">{currentColor}</span>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-white/80 font-neue-montreal">Size:</span>
                  <span className="text-white">{brushSize}px</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center gap-6 mt-16">
          <button
            onClick={() => setCurrentView("inspiration")}
            className="group bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full px-10 py-4 text-white font-instrument-serif text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105"
          >
            <span className="flex items-center space-x-2">
              <span>💡</span>
              <span>View Inspiration</span>
            </span>
          </button>

          <button
            onClick={publishToCommunity}
            className="group bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 backdrop-blur-md rounded-full px-10 py-4 text-white font-instrument-serif text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canvasImage}
          >
            <span className="flex items-center space-x-2">
              <span>🌟</span>
              <span>Share to Community</span>
            </span>
          </button>
          
          <button
            onClick={saveToPersonal}
            className="group bg-green-500/30 hover:bg-green-500/40 backdrop-blur-md rounded-full px-10 py-4 text-white font-instrument-serif text-lg transition-all duration-300 border border-white/30 hover:border-white/50 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canvasImage}
          >
            <span className="flex items-center space-x-2">
              <span>💾</span>
              <span>Save Creation</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
