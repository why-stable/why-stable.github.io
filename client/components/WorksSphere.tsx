import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber';
import { OrbitControls, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

// 模拟作品数据接口
interface Work {
  id: string;
  title: string;
  author: string;
  category: string;
  color: string;
}

// 生成模拟作品数据
const generateMockWorks = (count: number): Work[] => {
  const categories = ['Art', 'Music', 'Literature', 'Design', 'Photography', 'Video'];
  const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd93d', '#ff9ff3'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `work-${i}`,
    title: `Work ${i + 1}`,
    author: `Creator ${i + 1}`,
    category: categories[i % categories.length],
    color: colors[i % colors.length],
  }));
};

// 单个作品点组件
function WorkPoint({ position, work, onClick }: { 
  position: [number, number, number]; 
  work: Work; 
  onClick: (work: Work) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // 轻微的浮动动画
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
      
      // 悬停时的脉冲效果
      if (hovered) {
        meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 10) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => onClick(work)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial 
        color={work.color}
        emissive={hovered ? work.color : '#000000'}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
      
      {/* 悬停时显示作品信息 */}
      {hovered && (
        <Html distanceFactor={10}>
          <div className="bg-black/80 text-white p-2 rounded text-xs whitespace-nowrap">
            <div className="font-semibold">{work.title}</div>
            <div className="text-gray-300">{work.author}</div>
            <div className="text-blue-300">{work.category}</div>
          </div>
        </Html>
      )}
    </mesh>
  );
}

// 球体容器组件
function SphereContainer({ works, onWorkClick }: { 
  works: Work[]; 
  onWorkClick: (work: Work) => void;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  // 生成球面上的点位置
  const positions = useMemo(() => {
    const radius = 2;
    return works.map((_, index) => {
      // 使用黄金螺旋算法在球面上均匀分布点
      const y = 1 - (index / (works.length - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = index * Math.PI * (3 - Math.sqrt(5)); // 黄金角度
      
      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;
      
      return [x, y * radius, z] as [number, number, number];
    });
  }, [works]);

  // 整体旋转动画
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 半透明的球体轮廓 */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.05} 
          wireframe
        />
      </mesh>

      {/* 作品点 */}
      {works.map((work, index) => (
        <WorkPoint
          key={work.id}
          position={positions[index]}
          work={work}
          onClick={onWorkClick}
        />
      ))}

      {/* 中心标题 */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Works Sphere
      </Text>
    </group>
  );
}

// 主要的3D球体组件
export default function WorksSphere() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const works = useMemo(() => generateMockWorks(100), []); // 生成100个作品点

  const handleWorkClick = (work: Work) => {
    setSelectedWork(work);
    console.log('Clicked work:', work);
    // 这里可以添加跳转到作品详情页的逻辑
  };

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.5} />
        
        {/* 点光源 */}
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {/* 球体容器 */}
        <SphereContainer works={works} onWorkClick={handleWorkClick} />
        
        {/* 轨道控制器，允许用户旋转和缩放 */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>

      {/* 选中作品的信息面板 */}
      {selectedWork && (
        <div className="absolute top-4 left-4 bg-black/80 text-white p-4 rounded-lg max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg">{selectedWork.title}</h3>
            <button 
              onClick={() => setSelectedWork(null)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-300 mb-1">作者: {selectedWork.author}</p>
          <p className="text-blue-300 mb-3">类别: {selectedWork.category}</p>
          <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm">
            查看详情
          </button>
        </div>
      )}

      {/* 使用说明 */}
      <div className="absolute bottom-4 right-4 text-white/70 text-sm">
        <p>拖拽旋转 • 滚轮缩放 • 点击作品查看详情</p>
      </div>
    </div>
  );
}