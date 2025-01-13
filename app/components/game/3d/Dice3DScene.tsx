'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { Vector3 } from 'three';
import { DiceProps } from '@/app/types/three-types';

interface SingleDieProps {
  position: [number, number, number];
  value: number;
  isRolling: boolean;
}

function SingleDie({ position, value, isRolling }: SingleDieProps) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    rotation: [0, 0, 0],
  }));

  // Apply rolling force
  const applyRoll = () => {
    if (isRolling) {
      api.applyImpulse(
        [Math.random() * 5, 6 + Math.random() * 2, Math.random() * 5],
        [0, 0, 0]
      );
      api.applyTorque([
        Math.random() * 3,
        Math.random() * 3,
        Math.random() * 3
      ]);
    }
  };

  useFrame(() => {
    if (isRolling) {
      applyRoll();
    }
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="white" />
      <DiceDots value={value} />
    </mesh>
  );
}

function DiceDots({ value }: { value: number }) {
  const dotPositions = {
    1: [[0, 0, 1]],
    2: [[-0.5, -0.5, 1], [0.5, 0.5, 1]],
    3: [[-0.5, -0.5, 1], [0, 0, 1], [0.5, 0.5, 1]],
    4: [[-0.5, -0.5, 1], [0.5, -0.5, 1], [-0.5, 0.5, 1], [0.5, 0.5, 1]],
    5: [[-0.5, -0.5, 1], [0.5, -0.5, 1], [0, 0, 1], [-0.5, 0.5, 1], [0.5, 0.5, 1]],
    6: [[-0.5, -0.5, 1], [0.5, -0.5, 1], [-0.5, 0, 1], [0.5, 0, 1], [-0.5, 0.5, 1], [0.5, 0.5, 1]]
  };

  return (
    <group>
      {dotPositions[value as keyof typeof dotPositions].map((pos, i) => (
        <mesh key={i} position={new Vector3(...pos)}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </group>
  );
}

export default function Dice3DScene({ count, values, isRolling, onRollComplete }: DiceProps) {
  return (
    <group>
      {values.map((value, index) => (
        <SingleDie
          key={index}
          position={[index * 2.5 - (count - 1), 5, 0]}
          value={value}
          isRolling={isRolling}
        />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
} 