/**
 * GLSL for the AgroGlobe. Kept separate so the scene file reads as layout.
 * All point shaders use additive blending over a depth-writing occluder
 * sphere, so the far hemisphere is hidden for free.
 */

export const landVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uReveal;
  uniform vec3 uFocus;
  attribute float aRand;
  varying float vAlpha;
  varying float vNear;

  void main() {
    vec3 n = normalize(position);
    // 0 at Uzbekistan → 1 at the antipode: dots bloom outward from UZ on intro
    float d = (1.0 - dot(n, uFocus)) * 0.5;
    float rev = smoothstep(d, d + 0.12, uReveal * 1.15);
    vNear = 1.0 - smoothstep(0.0, 0.22, d);

    vec3 p = position * (1.0 + (1.0 - rev) * 0.25);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float facing = dot(normalize(normalMatrix * n), normalize(-mv.xyz));

    float twinkle = 0.7 + 0.3 * sin(uTime * (0.6 + aRand * 1.8) + aRand * 6.2831);
    gl_PointSize = uSize * uPixelRatio * twinkle * rev * (0.85 + vNear * 0.3) / -mv.z;
    gl_Position = projectionMatrix * mv;
    vAlpha = rev * smoothstep(-0.05, 0.45, facing);
  }
`;

export const landFragment = /* glsl */ `
  uniform vec3 uColorFar;
  uniform vec3 uColorNear;
  varying float vAlpha;
  varying float vNear;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.05, r);
    vec3 col = mix(uColorFar, uColorNear, vNear);
    gl_FragColor = vec4(col, vAlpha * core * (0.55 + vNear * 0.45));
  }
`;

/** Uzbekistan dot-matrix: ripples radiate from Tashkent; active region glows gold. */
export const uzVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uReveal;
  uniform vec3 uActiveDir;
  uniform float uActive;
  attribute float aDist;
  attribute float aRand;
  varying float vAlpha;
  varying float vWave;
  varying float vGold;

  void main() {
    vec3 n = normalize(position);
    float rev = smoothstep(aDist * 3.5, aDist * 3.5 + 0.2, uReveal * 1.2);
    float wave = sin(aDist * 90.0 - uTime * 2.2);
    vWave = pow(max(wave, 0.0), 6.0);
    float ang = acos(clamp(dot(n, uActiveDir), -1.0, 1.0));
    vGold = uActive * (1.0 - smoothstep(0.0, 0.045, ang));

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float facing = dot(normalize(normalMatrix * n), normalize(-mv.xyz));
    float twinkle = 0.85 + 0.15 * sin(uTime * 2.0 + aRand * 6.2831);
    gl_PointSize = uSize * uPixelRatio * rev * twinkle * (1.0 + vWave * 0.6 + vGold * 0.8) / -mv.z;
    gl_Position = projectionMatrix * mv;
    vAlpha = rev * smoothstep(0.0, 0.3, facing);
  }
`;

export const uzFragment = /* glsl */ `
  uniform vec3 uLime;
  uniform vec3 uGold;
  varying float vAlpha;
  varying float vWave;
  varying float vGold;

  void main() {
    float r = length(gl_PointCoord - 0.5);
    if (r > 0.5) discard;
    float core = smoothstep(0.5, 0.0, r);
    vec3 col = mix(uLime * 0.75, vec3(0.85, 1.0, 0.9), vWave * 0.55);
    col = mix(col, uGold * 1.3, vGold);
    gl_FragColor = vec4(col, vAlpha * core * (0.7 + vWave * 0.3));
  }
`;

export const occluderVertex = /* glsl */ `
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const occluderFragment = /* glsl */ `
  uniform vec3 uDeep;
  uniform vec3 uRim;
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    float fres = pow(1.0 - max(dot(vN, vView), 0.0), 3.0);
    gl_FragColor = vec4(mix(uDeep, uRim, fres), 1.0);
  }
`;

export const atmosphereFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    // Back faces: dot(n, view) is 0 at the shell's silhouette and grows (negatively)
    // toward the globe's limb → glow hugs the planet and fades to nothing outward.
    float d = clamp(-dot(vN, vView), 0.0, 1.0);
    float i = pow(d, 2.4) * uIntensity;
    gl_FragColor = vec4(uColor * i, i);
  }
`;

/** Vertical data beam: fades out toward the tip, flickers with a pulse. */
export const beamVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const beamFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  varying vec2 vUv;
  void main() {
    float pulse = smoothstep(0.0, 0.15, fract(vUv.y - uTime * 0.6)) * (1.0 - fract(vUv.y - uTime * 0.6));
    float a = (1.0 - vUv.y) * uOpacity * (0.55 + pulse * 0.9);
    gl_FragColor = vec4(uColor, a);
  }
`;
