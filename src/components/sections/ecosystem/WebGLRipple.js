"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  float getZ(vec2 p) {
    float d = length(p);
    
    // --- SEAMLESS TIMING ---
    float speed = u_time * 1.8;
    
    // --- SOUND WAVE TEXTURE ---
    float freq = 65.0;
    float wave = sin(d * freq - speed);
    
    // --- SMOOTH BEVEL ---
    float height = pow(wave * 0.5 + 0.5, 1.5);
    
    // --- RIPPLE STARTS FROM OUTSIDE HUB (circle logo) ---
    // Inner radius closer to hub; ripple emanates from just outside the circle
    float innerRadius = 0.12;
    float birth = smoothstep(innerRadius, innerRadius + 0.2, d);
    
    // --- CONTINUOUS ENVELOPE ---
    float intensityPulse = sin(u_time * 0.5) * 0.15 + 0.85;
    
    // Global falloff so it doesn't look flat at the edges
    float falloff = exp(-d * 0.8);
    
    return height * birth * intensityPulse * falloff;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

    // --- SMOOTH 3D SLOPE CALCULATION ---
    float e = 0.008;
    float h = getZ(p);
    float hx = getZ(p + vec2(e, 0.0)) - h;
    float hy = getZ(p + vec2(0.0, e)) - h;
    
    vec3 normal = normalize(vec3(-hx, -hy, e));

    // --- SOFT LIGHTING ---
    vec3 lightDir = normalize(vec3(0.4, 0.6, 1.0));
    float diff = max(dot(normal, lightDir), 0.0);
    
    // Specular (Lower power for matte/plastic feel)
    float spec = pow(max(dot(reflect(-lightDir, normal), vec3(0,0,1)), 0.0), 20.0);

    // --- COLORS ---
    vec3 baseColor = vec3(0.95, 0.96, 0.98);
    vec3 shadeColor = vec3(0.86, 0.89, 0.93);
    
    vec3 color = mix(shadeColor, baseColor, diff) + (spec * 0.35);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error(gl.getShaderInfoLog(shader));
		return null;
	}
	return shader;
}

function getDPR() {
	if (typeof window === "undefined") return 1;
	const base = window.devicePixelRatio || 1;
	const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	return Math.min(base, isMobile ? 1.5 : 2);
}

export default function WebGLRipple({ visible = true }) {
	const canvasRef = useRef(null);
	const rafRef = useRef(null);
	const startTimeRef = useRef(null);
	const visibleRef = useRef(visible);
	visibleRef.current = visible;

	const [reduceMotion] = useState(() =>
		typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
	);

	useEffect(() => {
		if (reduceMotion) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const gl = canvas.getContext("webgl", { alpha: false, antialias: false });
		if (!gl) return;

		const program = gl.createProgram();
		gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
		gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
		gl.linkProgram(program);
		gl.useProgram(program);

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

		const posLoc = gl.getAttribLocation(program, "position");
		const utimeLoc = gl.getUniformLocation(program, "u_time");
		const uresLoc = gl.getUniformLocation(program, "u_resolution");

		const resize = () => {
			const rect = canvas.getBoundingClientRect();
			const dpr = getDPR();
			const w = Math.floor(rect.width * dpr);
			const h = Math.floor(rect.height * dpr);
			if (canvas.width !== w || canvas.height !== h) {
				canvas.width = w;
				canvas.height = h;
				gl.viewport(0, 0, w, h);
			}
		};

		const render = (timestamp) => {
			if (!visibleRef.current) return;

			if (!startTimeRef.current) startTimeRef.current = timestamp;
			const time = (timestamp - startTimeRef.current) * 0.001;

			resize();

			gl.clearColor(0.93, 0.94, 0.96, 1);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.enableVertexAttribArray(posLoc);
			gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

			gl.uniform1f(utimeLoc, time);
			gl.uniform2f(uresLoc, canvas.width, canvas.height);
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			rafRef.current = requestAnimationFrame(render);
		};

		if (visible) {
			rafRef.current = requestAnimationFrame(render);
		}

		const ro = new ResizeObserver(resize);
		ro.observe(canvas);
		resize();

		return () => {
			ro.disconnect();
			cancelAnimationFrame(rafRef.current);
		};
	}, [visible, reduceMotion]);

	return (
		<canvas
			ref={canvasRef}
			className="absolute inset-0 w-full h-full pointer-events-none"
			style={{ background: "#eef1f4" }}
		/>
	);
}
