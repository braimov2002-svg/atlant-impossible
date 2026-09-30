"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { EffectComposer, N8AO, SMAA, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ConstructionScene, type SequenceAspect } from "@/components/three/sequence/ConstructionScene";

declare global {
  interface Window {
    /** Render one frame at `progress` and return it as a data URL. */
    __render?: (progress: number, type?: string, quality?: number) => Promise<string>;
    __renderReady?: boolean;
  }
}

interface Props {
  width: number;
  height: number;
  supersample: number;
  aspect: SequenceAspect;
  initial: number;
}

export default function RenderHarness({ width, height, supersample, aspect, initial }: Props) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(initial);
  const committed = useRef<((p: number) => void) | null>(null);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;
  return (
    <div style={{ width, height }}>
      <Canvas
        frameloop="never"
        shadows="percentage"
        dpr={supersample}
        gl={{ preserveDrawingBuffer: true, antialias: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.transmissionResolutionScale = 0.5;
        }}
        camera={{ fov: 35, near: 0.05, far: 1200 }}
        style={{ width, height }}
      >
        <ConstructionScene progress={progress} aspect={aspect} />
        <EffectComposer multisampling={0}>
          <N8AO halfRes aoRadius={1.6} distanceFalloff={0.8} intensity={2.4} aoSamples={24} denoiseSamples={8} denoiseRadius={10} />
          <ToneMapping mode={8} />
          <Vignette offset={0.3} darkness={0.42} />
          <SMAA />
        </EffectComposer>
        <Bridge progress={progress} setProgress={setProgress} committed={committed} width={width} height={height} />
      </Canvas>
    </div>
  );
}

function Bridge({
  progress,
  setProgress,
  committed,
  width,
  height,
}: {
  progress: number;
  setProgress: (p: number) => void;
  committed: React.RefObject<((p: number) => void) | null>;
  width: number;
  height: number;
}) {
  const { gl, advance } = useThree();
  const current = useRef(progress);

  // Resolves the pending __render() once the scene has committed the new progress.
  useLayoutEffect(() => {
    committed.current?.(progress);
  }, [progress, committed]);

  useEffect(() => {
    const out = document.createElement("canvas");
    out.width = width;
    out.height = height;
    const ctx = out.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    window.__render = async (p, type = "image/webp", quality = 0.86) => {
      if (p !== current.current) {
        await new Promise<void>((resolve) => {
          committed.current = (got) => {
            if (got !== p) return;
            committed.current = null;
            resolve();
          };
          setProgress(p);
        });
        current.current = p;
      }
      // A few frames: shader compile, environment capture, shadow maps.
      for (let i = 0; i < 3; i++) advance(performance.now());
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(gl.domElement, 0, 0, width, height);
      return out.toDataURL(type, quality);
    };
    window.__renderReady = true;
    return () => {
      delete window.__render;
      window.__renderReady = false;
    };
  }, [gl, advance, setProgress, committed, width, height]);

  return null;
}
