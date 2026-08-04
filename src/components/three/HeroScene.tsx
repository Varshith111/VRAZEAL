'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

/**
 * The hero sculpture: a faceted crystal core inside a thin metal ring, with a
 * single matte satellite. Everything is procedurally lit — no HDR file is
 * fetched, so the scene costs one request (the JS chunk) and nothing else.
 */

type Driver = {
  /** -1..1, pointer position within the viewport. */
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  /** 0..1, how far the hero has scrolled away. */
  scroll: React.MutableRefObject<number>;
};

function Sculpture({ pointer, scroll }: Driver) {
  const group = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const satellite = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  // Scale the whole composition with the canvas so it never crops on tablets.
  const fit = Math.min(1, viewport.width / 5.2);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 1 / 30); // clamp after tab-switches

    if (group.current) {
      // Pointer parallax, damped so it glides instead of snapping.
      const targetX = pointer.current.x * 0.22;
      const targetY = pointer.current.y * 0.16;
      group.current.rotation.y += (targetX - group.current.rotation.y) * d * 3.2;
      group.current.rotation.x += (-targetY - group.current.rotation.x) * d * 3.2;
      group.current.position.y = Math.sin(t * 0.55) * 0.08 - scroll.current * 0.9;
      group.current.scale.setScalar(fit * (1 - scroll.current * 0.12));
    }

    if (crystal.current) {
      crystal.current.rotation.y = t * 0.22 + scroll.current * 2.6;
      crystal.current.rotation.x = Math.sin(t * 0.3) * 0.16;
    }

    if (ring.current) {
      ring.current.rotation.z = -t * 0.14;
      ring.current.rotation.x = Math.PI / 2.6 + Math.sin(t * 0.24) * 0.1;
    }

    if (satellite.current) {
      const orbit = t * 0.42;
      satellite.current.position.set(Math.cos(orbit) * 2.05, Math.sin(orbit * 0.9) * 0.62, Math.sin(orbit) * 2.05);
    }
  });

  return (
    <group ref={group} scale={fit}>
      <mesh ref={crystal}>
        <icosahedronGeometry args={[1.32, 0]} />
        <MeshTransmissionMaterial
          samples={6}
          resolution={256}
          transmission={1}
          thickness={1.15}
          roughness={0.02}
          ior={1.62}
          chromaticAberration={0.28}
          anisotropy={0.18}
          distortion={0.14}
          distortionScale={0.28}
          temporalDistortion={0.06}
          clearcoat={1}
          attenuationDistance={2.4}
          attenuationColor="#eaf3ff"
          color="#ffffff"
          background={new THREE.Color('#ffffff')}
        />
      </mesh>

      <mesh ref={ring}>
        <torusGeometry args={[2.02, 0.012, 12, 220]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.35} metalness={0.9} />
      </mesh>

      <mesh ref={satellite}>
        <sphereGeometry args={[0.088, 32, 32]} />
        <meshStandardMaterial color="#0A84FF" roughness={0.25} metalness={0.1} />
      </mesh>

      <mesh position={[-1.85, -1.35, -0.6]} rotation={[0, 0, Math.PI / 5]}>
        <boxGeometry args={[0.055, 0.055, 0.055]} />
        <meshStandardMaterial color="#111111" roughness={0.4} metalness={0.7} />
      </mesh>
    </group>
  );
}

function Rig({ pointer }: { pointer: Driver['pointer'] }) {
  useFrame((state, delta) => {
    const d = Math.min(delta, 1 / 30);
    state.camera.position.x += (pointer.current.x * 0.42 - state.camera.position.x) * d * 2.4;
    state.camera.position.y += (pointer.current.y * 0.3 - state.camera.position.y) * d * 2.4;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const wrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      scroll.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight));
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Stop rendering entirely once the hero leaves the viewport.
    const node = wrapper.current;
    const observer = node
      ? new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 })
      : null;
    if (node && observer) observer.observe(node);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapper} className="h-full w-full">
      <Canvas
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6.2], fov: 38 }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 5]} intensity={1.5} />
        <directionalLight position={[-5, -2, -4]} intensity={0.5} color="#0A84FF" />

        <Sculpture pointer={pointer} scroll={scroll} />
        <Rig pointer={pointer} />

        {/* Procedural studio: soft top key, two rim strips, one accent card. */}
        <Environment resolution={128}>
          <Lightformer intensity={3.2} position={[0, 5, -2]} scale={[12, 6, 1]} form="rect" />
          <Lightformer intensity={1.6} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer intensity={1.2} position={[6, -1, 1]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
          <Lightformer intensity={0.9} color="#0A84FF" position={[2, -4, 3]} scale={[6, 3, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}
