import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';

// Individual face component for the cube
const CubeFace = ({ position, rotation, color, text, scale = [0.9, 0.9, 0.01] }) => {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={scale} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      <Text 
        position={[0, 0, 0.01]} 
        fontSize={0.15}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={0.8}
        textAlign="center"
        font="Arial"
      >
        {text}
      </Text>
    </group>
  );
};

// Animated cube that rotates
const AnimatedCube = ({ skillCategories, autoRotate }) => {
  const cubeRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Define spring animation for rotation
  const { rotation } = useSpring({
    rotation: hovered ? [0, Math.PI, 0] : [0, 0, 0],
    config: { mass: 10, tension: 200, friction: 50 }
  });

  // Automatic rotation
  useFrame((state, delta) => {
    if (autoRotate && cubeRef.current) {
      cubeRef.current.rotation.y += delta * 0.2;
      cubeRef.current.rotation.x += delta * 0.05;
    }
  });

  // Colors for each face of the cube
  const colors = [
    "#4F46E5", // indigo
    "#2563EB", // blue
    "#0EA5E9", // sky
    "#06B6D4", // cyan
    "#10B981", // emerald
    "#6366F1", // violet
  ];

  // Get the first 6 skill categories or fill with placeholders
  const displayCategories = skillCategories.slice(0, 6).length === 6 
    ? skillCategories.slice(0, 6)
    : [...skillCategories.slice(0, 6), ...Array(6 - skillCategories.slice(0, 6).length).fill({ category: "Skills", skills: ["React", "Node.js", "JavaScript"] })];

  return (
    <animated.group 
      ref={cubeRef} 
      rotation={rotation}
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      {/* Top face */}
      <CubeFace 
        position={[0, 1, 0]} 
        rotation={[-Math.PI/2, 0, 0]} 
        color={colors[0]} 
        text={`${displayCategories[0].category}\n${displayCategories[0].skills.slice(0, 3).join(', ')}`} 
      />
      {/* Bottom face */}
      <CubeFace 
        position={[0, -1, 0]} 
        rotation={[Math.PI/2, 0, 0]} 
        color={colors[1]} 
        text={`${displayCategories[1].category}\n${displayCategories[1].skills.slice(0, 3).join(', ')}`} 
      />
      {/* Front face */}
      <CubeFace 
        position={[0, 0, 1]} 
        rotation={[0, 0, 0]} 
        color={colors[2]} 
        text={`${displayCategories[2].category}\n${displayCategories[2].skills.slice(0, 3).join(', ')}`} 
      />
      {/* Back face */}
      <CubeFace 
        position={[0, 0, -1]} 
        rotation={[0, Math.PI, 0]} 
        color={colors[3]} 
        text={`${displayCategories[3].category}\n${displayCategories[3].skills.slice(0, 3).join(', ')}`} 
      />
      {/* Right face */}
      <CubeFace 
        position={[1, 0, 0]} 
        rotation={[0, Math.PI/2, 0]} 
        color={colors[4]} 
        text={`${displayCategories[4].category}\n${displayCategories[4].skills.slice(0, 3).join(', ')}`} 
      />
      {/* Left face */}
      <CubeFace 
        position={[-1, 0, 0]} 
        rotation={[0, -Math.PI/2, 0]} 
        color={colors[5]} 
        text={`${displayCategories[5].category}\n${displayCategories[5].skills.slice(0, 3).join(', ')}`} 
      />
    </animated.group>
  );
};

// Main skills cube component
const SkillsCube = ({ skillCategories, isDarkMode }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  
  return (
    <div className={`w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AnimatedCube skillCategories={skillCategories} autoRotate={autoRotate} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          onStart={() => setAutoRotate(false)} 
          onEnd={() => setAutoRotate(true)} 
        />
      </Canvas>
    </div>
  );
};

export default SkillsCube; 