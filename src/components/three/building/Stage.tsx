"use client";

import { useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { createGroundMaterial } from "./materials";

/** Enables material clipping planes on the current renderer (needed by <Building/>). */
export function EnableClipping() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);
  return null;
}

/**
 * Dusk "golden hour" studio: procedural light-formers only (no HDR download),
 * a warm key, cool cyan rim and soft sky fill — flattering for glass + gold.
 */
export function ArchEnvironment({ intensity = 1 }: { intensity?: number }) {
  return (
    <Environment resolution={128} frames={1}>
      <Lightformer form="rect" intensity={2.2 * intensity} position={[0, 10, 0]} rotation-x={Math.PI / 2} scale={[24, 24, 1]} color="#9fb7d8" />
      <Lightformer form="rect" intensity={1.2 * intensity} position={[0, 3, 12]} scale={[30, 6, 1]} color="#6f8db5" />
      <Lightformer form="rect" intensity={1.6 * intensity} position={[10, 2, 4]} rotation-y={-Math.PI / 2} scale={[14, 3, 1]} color="#e2b859" />
      <Lightformer form="rect" intensity={1.8 * intensity} position={[-10, 3, -6]} rotation-y={Math.PI / 2} scale={[12, 4, 1]} color="#00c8ff" />
      <Lightformer form="ring" intensity={2 * intensity} position={[0, 4, -10]} scale={5} color="#ffffff" />
    </Environment>
  );
}

export function ArchLights({ sun = 1.8 }: { sun?: number }) {
  return (
    <>
      <hemisphereLight args={["#b9c7dd", "#0b0f17", 0.55]} />
      <directionalLight position={[8, 10, 6]} intensity={sun} color="#ffd9a1" />
      <directionalLight position={[-6, 4, -8]} intensity={0.5} color="#6fe9ff" />
    </>
  );
}

/** Engineering grid floor (custom shader). */
export function BlueprintGround({ radius = 14, opacity = 1, y = 0 }: { radius?: number; opacity?: number; y?: number }) {
  const mat = useMemo(() => createGroundMaterial({ radius, opacity }), [radius, opacity]);
  useEffect(() => () => mat.dispose(), [mat]);
  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime;
  });
  return (
    <>
      <mesh rotation-x={-Math.PI / 2} position-y={y - 0.002}>
        <circleGeometry args={[radius, 64]} />
        <meshBasicMaterial color="#070a10" transparent opacity={0.85} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position-y={y} material={mat} renderOrder={-1}>
        <planeGeometry args={[radius * 2, radius * 2]} />
      </mesh>
    </>
  );
}
