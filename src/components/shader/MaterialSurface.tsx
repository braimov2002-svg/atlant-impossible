"use client";

import { useEffect, useRef } from "react";

/**
 * MaterialSurface — a tiny raw-WebGL "shader canvas" (no three.js) that
 * renders a procedural construction material lit by a light that follows the
 * cursor. Height fields are built from value-noise fBm; normals come from
 * finite differences, then Blinn-Phong (anisotropic for brushed steel).
 *
 *   concrete  — form-finished B40: pores, panel joints, tie-holes
 *   steel     — brushed titanium with rivet rows
 *   glass     — curtain wall with mullions and sky reflection
 *   stone     — polished granite speckle
 *   blueprint — engineering grid with a scanning line
 *
 * Renders only while on screen; a single static frame for reduced motion.
 */
export type SurfaceMaterial = "concrete" | "steel" | "glass" | "stone" | "blueprint";
const MAT_INDEX: Record<SurfaceMaterial, number> = { concrete: 0, steel: 1, glass: 2, stone: 3, blueprint: 4 };

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uHover;
uniform float uMat;
uniform float uMix;
uniform float uFrom;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), u.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), u.x), u.y);
}
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }

float heightOf(float m, vec2 p){
  if (m < 0.5) {            // concrete
    float h = fbm(p * 3.0) * 0.35 + fbm(p * 18.0) * 0.12;
    h -= smoothstep(0.78, 0.86, noise(p * 42.0)) * 0.25;           // pores
    vec2 g = fract(p * vec2(1.2, 0.9));
    h -= (1.0 - smoothstep(0.0, 0.012, min(g.x, g.y))) * 0.35;      // panel joints
    vec2 t = fract(p * vec2(2.4, 1.8)) - 0.5;
    h -= (1.0 - smoothstep(0.035, 0.045, length(t))) * 0.5;          // tie holes
    return h;
  } else if (m < 1.5) {     // brushed steel
    float h = noise(vec2(p.x * 1.5, p.y * 160.0)) * 0.08 + noise(vec2(p.x * 4.0, p.y * 40.0)) * 0.05;
    vec2 r = fract(p * vec2(3.0, 3.0)) - 0.5;
    h += (1.0 - smoothstep(0.05, 0.07, length(r))) * 0.35;          // rivets
    return h;
  } else if (m < 2.5) {     // glass curtain wall
    vec2 g = fract(p * vec2(2.2, 1.6));
    return (1.0 - smoothstep(0.0, 0.02, min(g.x, g.y))) * 0.4;       // mullions
  } else if (m < 3.5) {     // granite
    return fbm(p * 6.0) * 0.08 + step(0.88, noise(p * 70.0)) * 0.05;
  }
  return 0.0;
}

vec3 albedoOf(float m, vec2 p){
  if (m < 0.5) return mix(vec3(0.42, 0.44, 0.47), vec3(0.58, 0.59, 0.61), fbm(p * 2.0));
  if (m < 1.5) return mix(vec3(0.34, 0.37, 0.42), vec3(0.52, 0.55, 0.6), noise(vec2(p.x * 0.5, p.y * 30.0)));
  if (m < 2.5) {
    vec2 g = fract(p * vec2(2.2, 1.6));
    float mull = 1.0 - smoothstep(0.0, 0.02, min(g.x, g.y));
    vec3 sky = mix(vec3(0.05, 0.09, 0.15), vec3(0.2, 0.32, 0.46), p.y * 0.5 + 0.35 + noise(p * 1.5) * 0.2);
    return mix(sky, vec3(0.72, 0.6, 0.35), mull);
  }
  if (m < 3.5) {
    float s = noise(p * 70.0);
    vec3 base = mix(vec3(0.16, 0.16, 0.18), vec3(0.3, 0.29, 0.3), fbm(p * 4.0));
    return mix(base, vec3(0.75, 0.72, 0.68), step(0.9, s)) * mix(1.0, 0.6, step(0.8, noise(p * 25.0 + 3.0)));
  }
  return vec3(0.02, 0.05, 0.09);
}

vec3 shade(float m, vec2 uv, vec2 p, vec3 lightPos, float intensity){
  if (m > 3.5) {             // blueprint (unlit graphic)
    vec2 q = p * 3.0;
    vec2 g1 = abs(fract(q) - 0.5);
    vec2 g2 = abs(fract(q * 5.0) - 0.5);
    float major = 1.0 - smoothstep(0.47, 0.49, max(g1.x, g1.y));
    float minor = 1.0 - smoothstep(0.46, 0.5, max(g2.x, g2.y));
    float scan = exp(-pow((uv.y - fract(uTime * 0.12)) * 30.0, 2.0));
    float glow = exp(-length(uv - lightPos.xy) * 3.5) * intensity;
    vec3 c = vec3(0.01, 0.03, 0.06) + vec3(0.0, 0.94, 1.0) * (major * 0.22 + minor * 0.07 + scan * 0.25) * (0.5 + glow * 1.6);
    return c + vec3(0.0, 0.5, 0.6) * glow * 0.12;
  }
  float e = 1.5 / uRes.y;
  float h = heightOf(m, p);
  float hx = heightOf(m, p + vec2(e, 0.0)) - h;
  float hy = heightOf(m, p + vec2(0.0, e)) - h;
  float bump = m < 0.5 ? 2.2 : m < 1.5 ? 1.2 : 0.8;
  vec3 n = normalize(vec3(-hx * bump / e * 0.02, -hy * bump / e * 0.02, 1.0));
  vec3 pos = vec3(uv, 0.0);
  vec3 L = normalize(lightPos - pos);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 H = normalize(L + V);
  float dist = length(lightPos.xy - uv);
  float att = intensity / (1.0 + dist * dist * 6.0);
  float diff = max(dot(n, L), 0.0);
  float shin = m < 0.5 ? 12.0 : m < 1.5 ? 70.0 : m < 2.5 ? 180.0 : 120.0;
  float spec = pow(max(dot(n, H), 0.0), shin);
  if (m > 0.5 && m < 1.5) {  // anisotropic highlight stretched along the brushing direction
    float band = pow(max(0.0, 1.0 - abs(uv.y - lightPos.y) * 4.0), 8.0) * exp(-abs(uv.x - lightPos.x) * 1.2);
    spec = band * 0.9 + spec * 0.4;
  }
  vec3 albedo = albedoOf(m, p);
  vec3 specCol = m < 1.5 ? vec3(0.95, 0.85, 0.62) : vec3(0.9, 0.97, 1.0);
  float specK = m < 0.5 ? 0.12 : m < 1.5 ? 0.9 : m < 2.5 ? 1.2 : 0.7;
  return albedo * (0.12 + diff * att * 1.3) + specCol * spec * att * specK;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = vec2(uv.x * uRes.x / uRes.y, uv.y) * 2.0;
  float intensity = 0.55 + uHover * 0.9;
  vec3 lightPos = vec3(uMouse, 0.32);
  vec3 c = shade(uMat, uv, p, lightPos, intensity);
  if (uMix < 1.0) c = mix(shade(uFrom, uv, p, lightPos, intensity), c, uMix);
  c *= 1.0 - 0.35 * length(uv - 0.5);
  gl_FragColor = vec4(pow(c, vec3(0.9)), 1.0);
}
`;

export function MaterialSurface({
  material,
  className,
  interactionTarget,
}: {
  material: SurfaceMaterial;
  className?: string;
  /** Element whose pointer drives the light (defaults to the canvas' parent) */
  interactionTarget?: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matRef = useRef({ current: MAT_INDEX[material], from: MAT_INDEX[material], mix: 1 });

  // Cross-fade when the material prop changes
  useEffect(() => {
    const m = matRef.current;
    if (MAT_INDEX[material] === m.current) return;
    m.from = m.current;
    m.current = MAT_INDEX[material];
    m.mix = 0;
  }, [material]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uHover = u("uHover"), uMat = u("uMat"), uMix = u("uMix"), uFrom = u("uFrom");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, navigator.hardwareConcurrency <= 4 ? 1 : 1.5);
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pointer → light (smoothed); idle → slow orbit
    const target = { x: 0.5, y: 0.6, hover: 0 };
    const cur = { x: 0.5, y: 0.6, hover: 0 };
    const host = interactionTarget?.current ?? canvas.parentElement!;
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      target.x = (e.clientX - r.left) / r.width;
      target.y = 1 - (e.clientY - r.top) / r.height;
      target.hover = 1;
    };
    const onLeave = () => (target.hover = 0);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);

    let raf = 0;
    const t0 = performance.now();
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const t = (performance.now() - t0) / 1000;
      if (target.hover < 0.5) {
        target.x = 0.5 + Math.cos(t * 0.35) * 0.3;
        target.y = 0.55 + Math.sin(t * 0.5) * 0.25;
      }
      const k = 0.08;
      cur.x += (target.x - cur.x) * k;
      cur.y += (target.y - cur.y) * k;
      cur.hover += (target.hover - cur.hover) * 0.06;
      const m = matRef.current;
      m.mix = Math.min(1, m.mix + 0.035);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, cur.x, cur.y);
      gl.uniform1f(uHover, cur.hover);
      gl.uniform1f(uMat, m.current);
      gl.uniform1f(uFrom, m.from);
      gl.uniform1f(uMix, m.mix);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (reduced) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [interactionTarget]);

  return <canvas ref={canvasRef} aria-hidden className={className ?? "absolute inset-0 h-full w-full"} />;
}
