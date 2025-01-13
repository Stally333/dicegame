'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DiceProps } from '@/app/types/three-types';

// Helper function to create dice face texture
function createDiceFaceTexture(value: number): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  // White background with slight gradient
  const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 90);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#f0f0f0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 128, 128);

  // Draw dots
  ctx.fillStyle = '#000000';
  const dotPositions = {
    1: [[64, 64]],
    2: [[32, 32], [96, 96]],
    3: [[32, 32], [64, 64], [96, 96]],
    4: [[32, 32], [32, 96], [96, 32], [96, 96]],
    5: [[32, 32], [32, 96], [64, 64], [96, 32], [96, 96]],
    6: [[32, 32], [32, 64], [32, 96], [96, 32], [96, 64], [96, 96]]
  };

  // Draw dots with shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  dotPositions[value as keyof typeof dotPositions].forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2);
    ctx.fill();
  });

  return canvas;
}

export default function Dice3D({ count = 1, values = [3], isRolling = false, onRollComplete }: DiceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const diceRef = useRef<THREE.Mesh[]>([]);

  // Create and setup scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Setup scene if it doesn't exist
    if (!sceneRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
      });
      renderer.setClearColor(0x000000, 0);
      rendererRef.current = renderer;
      containerRef.current.appendChild(renderer.domElement);

      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const mainLight = new THREE.DirectionalLight(0xffffff, 1);
      mainLight.position.set(5, 5, 7);
      scene.add(mainLight);

      const fillLight = new THREE.DirectionalLight(0x9090ff, 0.3);
      fillLight.position.set(-5, -5, -7);
      scene.add(fillLight);
    }

    // Update renderer size
    if (rendererRef.current) {
      rendererRef.current.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    }

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const cameraZ = 8 + (count - 1) * 2;
    camera.position.set(0, 3, cameraZ);
    camera.lookAt(0, 0, 0);

    // Clear existing dice
    if (sceneRef.current) {
      diceRef.current.forEach(dice => {
        if (dice.parent) {
          dice.parent.remove(dice);
        }
      });
      diceRef.current = [];
    }

    // Create new dice
    const spacing = 2.2;
    const totalWidth = (count - 1) * spacing;

    for (let i = 0; i < count; i++) {
      const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
      const value = values[i] || Math.floor(Math.random() * 6) + 1;
      
      const materials = [
        new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(createDiceFaceTexture(6)) }),
        new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(createDiceFaceTexture(5)) }),
        new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(createDiceFaceTexture(2)) }),
        new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(createDiceFaceTexture(1)) }),
        new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(createDiceFaceTexture(3)) }),
        new THREE.MeshPhongMaterial({ map: new THREE.CanvasTexture(createDiceFaceTexture(4)) }),
      ];

      const dice = new THREE.Mesh(geometry, materials);
      
      // Position dice
      const xPos = (i * spacing) - (totalWidth / 2);
      const yPos = count === 3 && i === 1 ? 0.5 : 0; // Middle die raised for 3 dice
      dice.position.set(xPos, yPos, 0);
      
      // Random initial rotation
      dice.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      sceneRef.current?.add(dice);
      diceRef.current.push(dice);
    }

    // Animation
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 0.016;
      animationFrameId = requestAnimationFrame(animate);

      if (isRolling) {
        diceRef.current.forEach((dice, index) => {
          const speedMultiplier = 1 + index * 0.2;
          const wobble = Math.sin(time * 5) * 0.2;
          
          dice.rotation.x += (0.2 + wobble) * speedMultiplier;
          dice.rotation.y += (0.3 + wobble) * speedMultiplier;
          dice.rotation.z += (0.1 + wobble) * speedMultiplier;
          dice.position.y = Math.sin(time * 5 + index) * 0.3 + dice.position.y;
        });
      } else {
        diceRef.current.forEach((dice) => {
          dice.rotation.x *= 0.95;
          dice.rotation.y *= 0.95;
          dice.rotation.z *= 0.95;
          dice.position.y *= 0.92;
        });
      }
      
      if (rendererRef.current && sceneRef.current) {
        rendererRef.current.render(sceneRef.current, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, values, isRolling]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        background: 'transparent',
        borderRadius: '12px',
        overflow: 'hidden',
        minHeight: '260px'
      }}
    />
  );
} 