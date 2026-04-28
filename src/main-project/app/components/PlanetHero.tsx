import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React, { useMemo } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

type PlanetHeroProps = {
  planetID: number | undefined;
};

const PlanetHero = ({ planetID }: PlanetHeroProps) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const isDraggingRef = React.useRef(false);
  const lastPointerXRef = React.useRef(0);
  const swipeVelocityRef = React.useRef(0);
  const modelPath: string = `/models/planet-${planetID ?? 0}.glb`;
  const model = useGLTF(modelPath);
  const clonedScene = useMemo(() => {
    return SkeletonUtils.clone(model.scene);
  }, [model.scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001 + swipeVelocityRef.current;
      swipeVelocityRef.current *= 0.94;
    }
  });

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    isDraggingRef.current = true;
    lastPointerXRef.current = event.clientX;
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!isDraggingRef.current || !groupRef.current) return;

    event.stopPropagation();

    const deltaX = event.clientX - lastPointerXRef.current;
    lastPointerXRef.current = event.clientX;

    groupRef.current.rotation.y += deltaX * 0.005;
    swipeVelocityRef.current = deltaX * 0.0008;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerOut={handlePointerUp}
    >
      <primitive object={clonedScene} scale={1.8} />
    </group>
  );
};

export default PlanetHero;
