"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Goda's signature piece: the ring.
 *
 * Every one of their photographs is lit by the same fixture: a circular
 * pendant hanging over the car, a warm red housing wrapped around a glowing
 * white arc. So this rebuilds that light as a real object — a torus in a
 * russet housing colour with an emissive inner arc — hanging above the car's
 * own photograph, swinging very slightly on its cable the way a real
 * suspended fixture never hangs perfectly still.
 *
 * There is no bloom pass available in this stack, so the glow is faked with
 * two more translucent, slightly larger tori stacked behind the bright one —
 * cheap, and close enough at the sizes this renders at.
 */

function Photo({ src }: { src: string }) {
  const tex = useTexture(src);
  const mesh = useRef<THREE.Mesh>(null);
  const [aspect, setAspect] = useState(1);
  // The frustum's actual world-unit size at z=0, kept in sync with the
  // canvas's real pixel size by r3f — not a guessed constant. Deriving the
  // frame aspect from this (rather than assuming 4:3) is what makes the
  // cover-fit below exact instead of leaving letterbox bars whenever the
  // container's real aspect drifts from the assumption.
  const viewport = useThree((s) => s.viewport);

  useEffect(() => {
    const img = tex.image as { width?: number; height?: number } | undefined;
    if (img?.width && img?.height) {
      // A one-time handoff of a value read off the loaded texture — the
      // same pattern used for WebGL-capability detection elsewhere.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAspect(img.width / img.height);
    }
  }, [tex]);

  const frame = viewport.width / viewport.height;
  const [w, h] = aspect > frame ? [aspect / frame, 1] : [1, frame / aspect];

  return (
    <mesh ref={mesh} position={[0, -0.15, 0]} scale={[w * viewport.width, h * viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={tex} map-colorSpace={THREE.SRGBColorSpace} toneMapped={false} />
    </mesh>
  );
}

function PendantRing() {
  const swing = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = swing.current;
    if (!g) return;
    // A real pendant on a cable never hangs dead still — a slow, small,
    // slightly irregular sway.
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.55) * 0.035;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.4 + 1.4) * 0.02;
  });

  return (
    <group position={[0, 1.85, -0.3]}>
      {/* The cable. */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.7, 6]} />
        <meshBasicMaterial color="#0c0a09" toneMapped={false} />
      </mesh>

      <group ref={swing}>
        {/* Two soft, wider, transparent rings stacked behind the bright one
            fake the glow a real bloom pass would give this fixture. */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.02, 0.16, 16, 64]} />
          <meshBasicMaterial color="#f2b37a" transparent opacity={0.14} toneMapped={false} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.1, 16, 64]} />
          <meshBasicMaterial color="#f6c896" transparent opacity={0.22} toneMapped={false} />
        </mesh>
        {/* The russet housing. */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.045, 16, 64]} />
          <meshStandardMaterial color="#7c2a1a" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* The bright inner arc. */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.0, 0.02, 12, 64]} />
          <meshBasicMaterial color="#fff1de" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.2, 0]}>
      <planeGeometry args={[16, 16]} />
      <meshStandardMaterial color="#28211d" roughness={0.25} metalness={0.35} />
    </mesh>
  );
}

function Rig({ src }: { src: string }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 1.6, 1]} intensity={2.2} color="#ffdcb0" distance={7} decay={2} />
      <directionalLight position={[2, 3, 4]} intensity={0.5} />
      <Suspense fallback={null}>
        <Photo src={src} />
      </Suspense>
      <PendantRing />
      <Floor />
    </>
  );
}

function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function Ring({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
  }, []);

  if (lost || supported !== true) {
    return (
      <div className={className}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={className} role="img" aria-label={alt}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0.3, 6.6], fov: 38 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => bind(gl.domElement)}
      >
        <Rig src={src} />
      </Canvas>
    </div>
  );
}
