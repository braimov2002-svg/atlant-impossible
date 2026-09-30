import * as THREE from "three";

/**
 * Lat/lon → point on a sphere. Keep in sync with scripts/generate-globe-data.mjs
 * (its fibonacciLatLon is the exact inverse of this mapping).
 */
export function latLonToVec3(lat: number, lon: number, radius = 1, target = new THREE.Vector3()) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return target.set(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

/** Point i of an n-point Fibonacci sphere, on the unit sphere. */
export function fibonacciPoint(i: number, n: number, target = new THREE.Vector3()) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - ((i + 0.5) * 2) / n;
  const r = Math.sqrt(1 - y * y);
  const t = i * golden;
  return target.set(Math.cos(t) * r, y, Math.sin(t) * r);
}

export function decodeBitmask(base64: string): Uint8Array {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export const bitAt = (mask: Uint8Array, i: number) => (mask[i >> 3] >> (i & 7)) & 1;

/**
 * Euler rotation (y then x) that brings lat/lon to face the camera (+Z).
 * Used to aim the globe at Uzbekistan / a selected region.
 */
export function rotationToFace(lat: number, lon: number) {
  const v = latLonToVec3(lat, lon);
  const y = Math.atan2(-v.x, v.z);
  const x = Math.asin(THREE.MathUtils.clamp(v.y, -1, 1));
  return { x, y };
}
