"use client";

import React, { useEffect, useRef, useState } from "react";

export type AetherBackgroundProps = {
  height?: string | number;
  className?: string;
  children?: React.ReactNode;
};

const SWARP_FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define T time
#define MN min(R.x,R.y)

float pattern(vec2 uv) {
  float d = 0.0;
  for (float i = 0.0; i < 3.0; i++) {
    uv.x += sin(T * (1.0 + i) + uv.y * 1.5) * 0.2;
    d += 0.005 / abs(uv.x);
  }
  return d;
}

vec3 scene(vec2 uv) {
  vec3 col = vec3(0);
  uv = vec2(atan(uv.x, uv.y) * 2.0 / 6.28318, -log(length(uv)));
  for (float i = 0.0; i < 3.0; i++) {
    int k = int(mod(i, 3.0));
    col[k] += pattern(uv + i * 6.0 / MN);
  }
  return col;
}

void main() {
  vec2 uv = (FC - 0.5 * R) / MN;
  vec3 col = vec3(0);
  float s = 12.0, e = 9e-4;
  col += e / (sin(uv.x * s) * cos(uv.y * s));
  uv.y += R.x > R.y ? 0.5 : 0.5 * (R.y / R.x);
  // col += scene(uv); // removed aurora lines
  O = vec4(col, 1.0);
}`;

const VERT_SRC = `#version 300 es
precision highp float;
in vec2 position;
void main(){ gl_Position = vec4(position, 0.0, 1.0); }
`;

export function AetherBackground({
  height = "100%",
  className = "",
  children,
}: AetherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // Track when shader has drawn at least one frame
  const [ready, setReady] = useState(false);
  const readyOnceRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const compileShader = (src: string, type: number) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error(gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = compileShader(VERT_SRC, gl.VERTEX_SHADER);
    const fs = compileShader(SWARP_FRAG, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error(gl.getProgramInfoLog(prog));
      return;
    }

    const verts = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);
    const buf = gl.createBuffer();
    if (!buf) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    gl.useProgram(prog);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uniTime = gl.getUniformLocation(prog, "time");
    const uniRes = gl.getUniformLocation(prog, "resolution");

    // IMPORTANT: keep canvas as a background layer (don't paint an opaque "sheet")
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const W = Math.max(1, Math.floor(rect.width * dpr));
      const H = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      gl.viewport(0, 0, W, H);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    window.addEventListener("resize", fit);

    const loop = (now: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(prog);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      if (uniRes) gl.uniform2f(uniRes, canvas.width, canvas.height);
      if (uniTime) gl.uniform1f(uniTime, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Signal ready after first successful draw (only once)
      if (!readyOnceRef.current) {
        readyOnceRef.current = true;
        setReady(true);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    };
  }, []);

  const h = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        minHeight: "100vh",
        height: h,
        // Hard guarantee: canvas stays in its own isolated stacking context
        isolation: "isolate",
        // Fallback background so the first paint looks intentional (matches your theme)
        background:
          "radial-gradient(1200px 600px at 50% 20%, rgba(0,255,240,0.08), transparent 60%), #050714",
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          // Hard guarantee: never sit above content
          zIndex: 0,
          // Never block content interactions
          pointerEvents: "none",
          // No flash: fade in when shader has drawn at least 1 frame
          opacity: ready ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      />

      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}

export default AetherBackground;
