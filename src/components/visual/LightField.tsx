'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/lib/theme';
import { cn } from '@/lib/utils';

/**
 * "Liquid light": a domain-warped noise field rendered in a single fragment
 * shader on a full-screen triangle. Black, deep navy, the brand blue and a
 * whisper of white at the crests. The pointer bends the field like a lens.
 *
 * Raw WebGL on purpose — no three.js — so the hero costs ~3 KB of JS.
 * Renders at a fraction of device resolution (the field is soft, so nobody can
 * tell), pauses when off-screen or when the tab is hidden, and draws a single
 * still frame for visitors who prefer reduced motion.
 */

const VERT = `
attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;
uniform vec2 uFocus;
uniform float uLight;

// Precision-stable hash (Dave Hoskins) — no seams at large coordinates.
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float aspect = uRes.x / uRes.y;
  float t = uTime * 0.055;

  // Pointer lens: pushes the field outward around the cursor.
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
  float md = length(p - m);
  p += (p - m) * 0.22 * exp(-md * md * 2.6);

  // Two passes of domain warping give the slow, folded, liquid motion.
  vec2 q = vec2(fbm(p * 1.35 + vec2(0.0, t)), fbm(p * 1.35 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(p * 1.55 + 3.2 * q + vec2(1.7, 9.2) + t * 1.4),
                fbm(p * 1.55 + 3.2 * q + vec2(8.3, 2.8) - t * 1.1));
  float raw = fbm(p * 1.15 + 3.6 * r);
  // Stretch the narrow fbm range so the folds actually read.
  float f = smoothstep(0.2, 0.8, raw);

  float band = smoothstep(0.58, 0.95, f);
  float ridge = pow(1.0 - abs(f * 2.0 - 1.0), 6.0);

  // Topographic contours drifting through the flow: the "engineered" layer.
  float d = abs(fract(f * 9.0 - t * 1.6) - 0.5);
  float contour = smoothstep(0.42, 0.5, d) * smoothstep(0.15, 0.6, f);

  vec3 deep = vec3(0.0, 0.1, 0.34);
  vec3 blue = vec3(0.04, 0.52, 1.0);
  vec3 white = vec3(0.86, 0.94, 1.0);

  vec3 col = mix(vec3(0.0), deep, smoothstep(0.25, 0.85, f) * 0.85);
  col = mix(col, blue, band * 0.75);
  col += white * ridge * band * 0.45;

  // Light pools around a focus point, falling away into black.
  vec2 focus = (uFocus - 0.5) * vec2(aspect, 1.0);
  float glow = smoothstep(1.15, 0.0, length(p - focus));
  glow *= glow;
  col *= 0.08 + glow * 1.5;
  col += mix(blue, white, 0.35) * contour * (0.025 + glow * 0.2);

  // Soft highlight trailing the pointer.
  col += blue * 0.22 * exp(-md * md * 7.0);

  // Vignette to pure black at the edges, so it sits inside the page.
  col *= smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.1, 1.3)));
  col *= uIntensity;

  // Light theme: the same field, read as a mask — pale canvas, blue ribbons,
  // the brightest crests deepening to the brand blue.
  if (uLight > 0.5) {
    float m = clamp(dot(col, vec3(0.299, 0.587, 0.114)) * 1.9, 0.0, 1.0);
    vec3 paper = vec3(0.965, 0.965, 0.953);
    vec3 tint = mix(vec3(0.6, 0.79, 1.0), vec3(0.02, 0.4, 0.92), smoothstep(0.25, 0.9, m));
    col = mix(paper, tint, m);
  }

  // Dither to kill banding in the dark gradients.
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) * 0.02;

  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  className?: string;
  /** Overall brightness, 0–1.5. */
  intensity?: number;
  /** Where the light pools, in 0–1 screen space (x right, y up). */
  focus?: [number, number];
  /** Fraction of device pixels to render. Lower is cheaper and softer. */
  quality?: number;
};

export function LightField({ className, intensity = 1, focus = [0.72, 0.62], quality = 0.55 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const { theme } = useTheme();
  const light = theme === 'light';
  const settings = useRef({ intensity, focus, light });
  settings.current = { intensity, focus, light };
  const redraw = useRef<() => void>(() => undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl || gl.isContextLost()) {
      setFailed(true);
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(shader));
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(program);

    // One oversized triangle covers the viewport with no diagonal seam.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uIntensity = gl.getUniformLocation(program, 'uIntensity');
    const uFocus = gl.getUniformLocation(program, 'uFocus');
    const uLight = gl.getUniformLocation(program, 'uLight');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    let visible = true;
    let frame = 0;
    const start = performance.now();
    // A random phase so the field never opens on the same frame twice.
    const phase = Math.random() * 20;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * quality;
      const width = Math.max(1, Math.round(canvas.clientWidth * scale));
      const height = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = (now: number) => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, phase + (reduced ? 0 : (now - start) / 1000));
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntensity, settings.current.intensity);
      gl.uniform2f(uFocus, settings.current.focus[0], settings.current.focus[1]);
      gl.uniform1f(uLight, settings.current.light ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reduced && !document.hidden) frame = requestAnimationFrame(loop);
      else frame = 0;
    };

    const kick = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (event.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (event.clientY - rect.top) / rect.height;
      if (reduced) draw(performance.now());
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    observer.observe(canvas);

    const onVisibility = () => kick();
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('resize', kick);
    document.addEventListener('visibilitychange', onVisibility);
    kick();
    // Lets a theme change repaint even when the loop is idle (reduced motion).
    redraw.current = () => (reduced ? draw(performance.now()) : kick());

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', kick);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      // Deliberately no loseContext(): a remount (StrictMode, fast refresh)
      // gets the same canvas back, and a lost context cannot recompile.
    };
  }, [quality]);

  useEffect(() => {
    redraw.current();
  }, [light]);

  if (failed) {
    return (
      <div
        aria-hidden
        className={cn('h-full w-full', className)}
        style={{
          background: `radial-gradient(55% 60% at ${focus[0] * 100}% ${(1 - focus[1]) * 100}%, rgba(10,132,255,${
            (light ? 0.22 : 0.32) * intensity
          }), rgba(${light ? '120,170,255' : '0,30,90'},${0.25 * intensity}) 45%, transparent 75%)`,
        }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className={cn('block h-full w-full', className)} />;
}
