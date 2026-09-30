import * as THREE from "three";
import { getFacadeTextures, type FacadeStyle } from "./textures";
import type { MaterialRole } from "./geometry";

export const CYAN = new THREE.Color("#00f0ff");
export const GOLD = new THREE.Color("#e2b859");

const FACADE_ROLES: FacadeStyle[] = ["curtain", "residential", "office", "industrial", "stone"];

/**
 * Realistic material set for one building. All materials share the given
 * clipping planes, so a single plane sweep reveals/hides the whole model.
 * (World-space planes → buildings are expected to stand on y = 0.)
 */
export function createRoleMaterials(clippingPlanes: THREE.Plane[]): Record<MaterialRole, THREE.MeshStandardMaterial> {
  const facade = (style: FacadeStyle, p: THREE.MeshStandardMaterialParameters) => {
    const { map, emissive } = getFacadeTextures(style);
    return new THREE.MeshStandardMaterial({
      map,
      emissiveMap: emissive,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0,
      clippingPlanes,
      ...p,
    });
  };
  const solid = (color: string, p: THREE.MeshStandardMaterialParameters = {}) =>
    new THREE.MeshStandardMaterial({ color, clippingPlanes, ...p });

  return {
    curtain: facade("curtain", { metalness: 0.45, roughness: 0.12, envMapIntensity: 1.7 }),
    residential: facade("residential", { metalness: 0.05, roughness: 0.72 }),
    office: facade("office", { metalness: 0.45, roughness: 0.3, envMapIntensity: 1.1 }),
    industrial: facade("industrial", { metalness: 0.55, roughness: 0.45 }),
    stone: facade("stone", { metalness: 0, roughness: 0.85 }),
    concrete: solid("#767d88", { roughness: 0.92 }),
    titanium: solid("#3b4658", { metalness: 0.85, roughness: 0.32 }),
    gold: solid("#e2b859", { metalness: 1, roughness: 0.28, emissive: new THREE.Color("#3a2a08"), emissiveIntensity: 0.3 }),
    roof: solid("#1b2230", { roughness: 0.8 }),
    green: solid("#3f5b3c", { roughness: 0.95 }),
    dome: solid("#1aa6b7", { metalness: 0.35, roughness: 0.3 }),
    asphalt: solid("#161b23", { roughness: 0.95, side: THREE.DoubleSide }),
  };
}

/** Drive the window-light emissive of every facade material (0 = day, 1 = night). */
export function setFacadeLights(mats: Record<MaterialRole, THREE.MeshStandardMaterial>, k: number) {
  for (const r of FACADE_ROLES) mats[r].emissiveIntensity = k;
}

/* ─────────────────────── blueprint line shader ─────────────────────── */

/**
 * Cyan engineering lines visible only inside [uMin, uMax] (world Y).
 * The leading edge glows, and a faint pulse travels up the structure.
 */
export function createBlueprintLineMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: CYAN.clone() },
      uMin: { value: -1e3 },
      uMax: { value: 1e3 },
      uOpacity: { value: 0.85 },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying float vY;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vY = w.y;
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uMin;
      uniform float uMax;
      uniform float uOpacity;
      uniform float uTime;
      varying float vY;
      void main() {
        if (vY < uMin || vY > uMax) discard;
        float lead = smoothstep(0.3, 0.0, uMax - vY) + smoothstep(0.3, 0.0, vY - uMin);
        float pulse = pow(0.5 + 0.5 * sin(vY * 14.0 - uTime * 2.5), 18.0);
        vec3 col = uColor * (0.75 + lead * 1.4 + pulse * 0.6);
        gl_FragColor = vec4(col, uOpacity * (0.55 + lead * 0.45));
      }
    `,
  });
}

/* ─────────────────────── engineering ground grid ─────────────────────── */

/** Anti-aliased minor/major grid with a radar pulse and radial fade (world XZ). */
export function createGroundMaterial({ radius = 14, color = CYAN, opacity = 1 } = {}) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: color.clone() },
      uRadius: { value: radius },
      uOpacity: { value: opacity },
      uTime: { value: 0 },
    },
    vertexShader: /* glsl */ `
      varying vec3 vW;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        gl_Position = projectionMatrix * viewMatrix * w;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uRadius;
      uniform float uOpacity;
      uniform float uTime;
      varying vec3 vW;
      float grid(vec2 p, float cell, float width) {
        vec2 q = p / cell;
        vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q);
        return 1.0 - min(min(g.x, g.y) / width, 1.0);
      }
      void main() {
        vec2 p = vW.xz;
        float d = length(p);
        float minor = grid(p, 0.25, 1.0) * 0.22;
        float major = grid(p, 1.0, 1.3) * 0.55;
        float ring = exp(-pow((d - mod(uTime * 1.6, uRadius)) * 5.0, 2.0)) * 0.35;
        float fade = 1.0 - smoothstep(uRadius * 0.3, uRadius, d);
        float a = (max(minor, major) + ring) * fade * uOpacity;
        if (a < 0.003) discard;
        gl_FragColor = vec4(uColor, a);
      }
    `,
  });
}

/* ─────────────────────── volumetric light beam ─────────────────────── */

/** Soft additive cone: bright at the source, facing-ratio falloff at the rim. */
export function createBeamMaterial(color = GOLD) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: color.clone() }, uIntensity: { value: 0 } },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      varying float vFacing;
      void main() {
        vUv = uv;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vec3 n = normalize(normalMatrix * normal);
        vFacing = abs(dot(n, normalize(-mv.xyz)));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      varying float vFacing;
      void main() {
        float a = pow(vFacing, 2.0) * pow(1.0 - vUv.y, 1.6) * uIntensity;
        gl_FragColor = vec4(uColor * a, a);
      }
    `,
  });
}
