"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import { GitBranch, Crosshair, Zap, TrendingUp, Heart, MessageCircle, Send, Bookmark } from "lucide-react";

// ─── FloatingOrbs ───────────────────────────────────────────────────────────

const DEFAULT_COLORS = [
	"rgba(37, 99, 235, 0.12)",
	"rgba(6, 182, 212, 0.10)",
	"rgba(59, 130, 246, 0.08)",
	"rgba(14, 165, 233, 0.10)",
	"rgba(37, 99, 235, 0.06)",
];

function seededRandom(seed) {
	const x = Math.sin(seed * 9301 + 49297) * 49297;
	return x - Math.floor(x);
}

function generateOrbs(count, colors, minSize, maxSize) {
	const round = (v) => Math.round(v * 100) / 100;
	return Array.from({ length: count }, (_, i) => {
		const r = (n) => seededRandom(i * 7 + n);
		return {
			size: round(minSize + r(0) * (maxSize - minSize)),
			x: round(r(1) * 100),
			y: round(r(2) * 100),
			color: colors[i % colors.length],
			blur: round(40 + r(3) * 60),
			duration: round(18 + r(4) * 22),
			delay: round(-(r(5) * 20)),
			drift: round(30 + r(6) * 50),
		};
	});
}

function FloatingOrbs({
	count = 6,
	colors = DEFAULT_COLORS,
	minSize = 80,
	maxSize = 220,
	className = "",
}) {
	const orbs = useMemo(
		() => generateOrbs(count, colors, minSize, maxSize),
		[count, colors, minSize, maxSize]
	);

	return (
		<div
			className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
			aria-hidden="true"
		>
			{orbs.map((orb, i) => (
				<div
					key={i}
					className="absolute rounded-full"
					style={{
						width: orb.size,
						height: orb.size,
						left: `${orb.x}%`,
						top: `${orb.y}%`,
						background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
						filter: `blur(${orb.blur}px)`,
						animation: `floatOrb${i % 3} ${orb.duration}s ease-in-out ${orb.delay}s infinite`,
						willChange: "transform",
						["--drift"]: `${orb.drift}px`,
					}}
				/>
			))}
			<style>{`
        @keyframes floatOrb0 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(var(--drift), calc(var(--drift) * -0.6)) scale(1.05); }
          50% { transform: translate(calc(var(--drift) * -0.4), var(--drift)) scale(0.95); }
          75% { transform: translate(calc(var(--drift) * 0.7), calc(var(--drift) * 0.3)) scale(1.02); }
        }
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(calc(var(--drift) * -0.8), calc(var(--drift) * 0.5)) scale(1.04); }
          66% { transform: translate(calc(var(--drift) * 0.6), calc(var(--drift) * -0.7)) scale(0.97); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          20% { transform: translate(calc(var(--drift) * 0.5), var(--drift)) scale(0.96); }
          50% { transform: translate(calc(var(--drift) * -0.7), calc(var(--drift) * -0.3)) scale(1.06); }
          80% { transform: translate(var(--drift), calc(var(--drift) * 0.4)) scale(0.98); }
        }
      `}</style>
		</div>
	);
}

// ─── MockAnalyticsCard ──────────────────────────────────────────────────────

const BAR_HEIGHTS = [38, 62, 45, 78, 55, 90, 72];
const LABELS = ["M", "T", "W", "T", "F", "S", "S"];

function MockAnalyticsCard() {
	const [animated, setAnimated] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setAnimated(true), 400);
		return () => clearTimeout(t);
	}, []);

	return (
		<div className="w-full h-full flex flex-col justify-between p-4 overflow-hidden">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5">
					<TrendingUp size={12} className="text-emerald-500" />
					<span className="text-[10px] font-bold text-slate-700">CTR</span>
				</div>
				<span className="text-[10px] font-bold text-emerald-500">+18.4%</span>
			</div>
			<div className="flex items-end justify-between gap-[3px] flex-1 pt-2">
				{BAR_HEIGHTS.map((h, i) => (
					<div
						key={i}
						className="flex flex-col items-center flex-1 gap-0.5 h-full justify-end"
					>
						<div
							className="w-full rounded-sm transition-all duration-700 ease-out"
							style={{
								height: animated ? `${h}%` : "4%",
								background:
									i === BAR_HEIGHTS.length - 2
										? "linear-gradient(180deg, #2563eb 0%, #3b82f6 100%)"
										: "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)",
								transitionDelay: `${i * 60}ms`,
							}}
						/>
						<span className="text-[7px] text-slate-400 leading-none">{LABELS[i]}</span>
					</div>
				))}
			</div>
		</div>
	);
}

// ─── MockScrollingSite ──────────────────────────────────────────────────────

function MockScrollingSite() {
	const scrollRef = useRef(null);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		let raf;
		let t = 0;

		function tick() {
			t += 0.004;
			const max = el.scrollHeight - el.clientHeight;
			const progress = (Math.sin(t) + 1) / 2;
			el.scrollTop = progress * max;
			raf = requestAnimationFrame(tick);
		}

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	return (
		<div className="relative h-full mt-4 rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
			<div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border-b border-slate-200">
				<span className="w-2 h-2 rounded-full bg-red-400" />
				<span className="w-2 h-2 rounded-full bg-amber-400" />
				<span className="w-2 h-2 rounded-full bg-green-400" />
				<div className="ml-2 flex-1 h-4 rounded bg-slate-200 max-w-[120px]" />
			</div>
			<div ref={scrollRef} className="overflow-hidden h-[calc(100%-32px)]">
				<div className="p-3 space-y-3">
					<div className="h-5 w-3/4 rounded bg-slate-800" />
					<div className="h-3 w-full rounded bg-slate-200" />
					<div className="h-3 w-5/6 rounded bg-slate-200" />
					<div className="h-24 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
						<div className="space-y-1.5 w-3/4">
							<div className="h-3 w-full rounded bg-white/40" />
							<div className="h-3 w-2/3 rounded bg-white/30" />
							<div className="h-5 w-16 rounded bg-white mt-2" />
						</div>
					</div>
					<div className="grid grid-cols-3 gap-2">
						<div className="h-14 rounded-lg bg-slate-100 border border-slate-200 p-2">
							<div className="h-2 w-full rounded bg-blue-400/40 mb-1.5" />
							<div className="h-2 w-2/3 rounded bg-slate-300" />
						</div>
						<div className="h-14 rounded-lg bg-slate-100 border border-slate-200 p-2">
							<div className="h-2 w-full rounded bg-emerald-400/40 mb-1.5" />
							<div className="h-2 w-2/3 rounded bg-slate-300" />
						</div>
						<div className="h-14 rounded-lg bg-slate-100 border border-slate-200 p-2">
							<div className="h-2 w-full rounded bg-amber-400/40 mb-1.5" />
							<div className="h-2 w-2/3 rounded bg-slate-300" />
						</div>
					</div>
					<div className="space-y-1.5">
						<div className="h-4 w-1/2 rounded bg-slate-700" />
						<div className="h-3 w-full rounded bg-slate-200" />
						<div className="h-3 w-4/5 rounded bg-slate-200" />
					</div>
					<div className="flex gap-2">
						<div className="flex-1 h-20 rounded-lg bg-slate-100 border border-slate-200" />
						<div className="flex-1 h-20 rounded-lg bg-slate-100 border border-slate-200" />
					</div>
					<div className="h-16 rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-center">
						<div className="space-y-1 w-2/3">
							<div className="h-2.5 w-full rounded bg-white/30" />
							<div className="h-4 w-14 rounded bg-blue-500 mx-auto mt-1.5" />
						</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="h-16 rounded-lg bg-slate-50 border border-slate-200 p-2"
							>
								<div className="w-4 h-4 rounded bg-blue-400/30 mb-1.5" />
								<div className="h-2 w-full rounded bg-slate-200" />
								<div className="h-2 w-2/3 rounded bg-slate-200 mt-1" />
							</div>
						))}
					</div>
					<div className="space-y-1.5">
						<div className="h-3 w-full rounded bg-slate-200" />
						<div className="h-3 w-3/4 rounded bg-slate-200" />
						<div className="h-3 w-5/6 rounded bg-slate-200" />
					</div>
					<div className="h-10 rounded-lg bg-slate-100 border border-slate-200" />
				</div>
			</div>
		</div>
	);
}

// ─── InfinityMesh (WebGL) ───────────────────────────────────────────────────

const SVG_D =
	"M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 colorDeep;
  uniform vec3 colorBright;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    float snakePos = mod(uTime * 0.8, 1.0);
    float distToHead = abs(vUv.x - snakePos);
    distToHead = min(distToHead, 1.0 - distToHead);
    float gradientWidth = 0.3;
    float flow = smoothstep(gradientWidth, 0.0, distToHead);
    vec3 baseColor = mix(colorDeep, colorBright, flow);

    vec3 lightDir = normalize(vec3(0.5, 1.0, 2.0));
    float NdotL = max(dot(vNormal, lightDir), 0.0);
    float chiselEdge = pow(NdotL, 50.0) * 0.9;

    float rim = pow(0.8 - max(dot(vNormal, vViewDir), 0.0), 3.0);
    vec3 softBevel = baseColor * rim * 0.4;

    gl_FragColor = vec4(baseColor + softBevel + (vec3(1.0) * chiselEdge), 1.0);
  }
`;

function InfinityMesh({ className, style, cameraZ = 120 }) {
	const containerRef = useRef(null);
	const cleanupRef = useRef(() => {});

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let cancelled = false;

		(async () => {
			const THREE = await import("three");
			if (cancelled) return;

			const {
				Curve,
				Vector3,
				Scene,
				PerspectiveCamera,
				WebGLRenderer,
				TubeGeometry,
				ShaderMaterial,
				Color,
				Mesh,
			} = THREE;

			function sampleSvgPath(numSamples) {
				const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				const pathElem = document.createElementNS("http://www.w3.org/2000/svg", "path");
				pathElem.setAttribute("d", SVG_D);
				svg.appendChild(pathElem);
				document.body.appendChild(svg);

				const length = pathElem.getTotalLength();
				const points = [];

				for (let i = 0; i <= numSamples; i++) {
					const t = i / numSamples;
					const pt = pathElem.getPointAtLength(t * length);
					points.push(new Vector3(pt.x - 93.65, pt.y - 46.85, 0));
				}

				document.body.removeChild(svg);
				return points;
			}

			class SVGFigure8Curve extends Curve {
				constructor(pts) {
					super();
					this.pts = pts;
				}
				getPoint(t, optionalTarget = new Vector3()) {
					const idx = Math.floor(t * (this.pts.length - 1));
					const nextIdx = Math.min(idx + 1, this.pts.length - 1);
					const localT = t * (this.pts.length - 1) - idx;
					const lerped = this.pts[idx].clone().lerp(this.pts[nextIdx], localT);
					const tx = t * Math.PI * 2;
					return optionalTarget.set(lerped.x, lerped.y, Math.cos(tx) * 12);
				}
			}

			const isMobile = container.clientWidth < 768;
			const scene = new Scene();
			const camera = new PerspectiveCamera(
				35,
				container.clientWidth / container.clientHeight,
				2,
				1000
			);
			const renderer = new WebGLRenderer({ antialias: true, alpha: true });
			renderer.setSize(container.clientWidth, container.clientHeight);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
			container.appendChild(renderer.domElement);

			const numSamples = isMobile ? 1000 : 5000;
			const pathPoints = sampleSvgPath(numSamples);
			const path = new SVGFigure8Curve(pathPoints);

			const tubularSegments = isMobile ? 400 : 5000;
			const radialSegments = isMobile ? 8 : 10;
			const geometry = new TubeGeometry(
				path,
				tubularSegments,
				8,
				radialSegments,
				true
			);

			const material = new ShaderMaterial({
				uniforms: {
					uTime: { value: 0 },
					colorDeep: { value: new Color(0x0668e1) },
					colorBright: { value: new Color(0x00f2ff) },
				},
				vertexShader,
				fragmentShader,
			});

			const mesh = new Mesh(geometry, material);
			scene.add(mesh);
			camera.position.z = cameraZ;

			let animationId;
			function animate(time) {
				animationId = requestAnimationFrame(animate);
				material.uniforms.uTime.value = time * 0.001;
				renderer.render(scene, camera);
			}
			animate(0);

			function handleResize() {
				if (!container) return;
				const w = container.clientWidth;
				const h = container.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			}
			window.addEventListener("resize", handleResize);

			cleanupRef.current = () => {
				cancelAnimationFrame(animationId);
				window.removeEventListener("resize", handleResize);
				renderer.dispose();
				geometry.dispose();
				material.dispose();
				if (container.contains(renderer.domElement)) {
					container.removeChild(renderer.domElement);
				}
			};
		})();

		return () => {
			cancelled = true;
			cleanupRef.current();
		};
	}, [cameraZ]);

	return (
		<div
			ref={containerRef}
			className={className ?? "absolute top-1/2 left-1/2 pointer-events-none"}
			style={
				style ?? {
					width: "2800px",
					height: "1500px",
					transform: "translate(calc(-50% + 200px), -50%)",
				}
			}
			aria-hidden="true"
		/>
	);
}

// ─── MockSocialFeed ─────────────────────────────────────────────────────────

const SOCIAL_POSTS = [
	{ user: "ON", name: "ONE Agency", time: "2h", img: "from-blue-600 to-cyan-400", likes: 847, caption: "Performance creative that converts." },
	{ user: "JT", name: "Jason T.", time: "5h", img: "from-slate-700 to-slate-900", likes: 312, caption: "Data-driven campaigns at scale." },
	{ user: "BT", name: "Brooke T.", time: "8h", img: "from-indigo-500 to-blue-600", likes: 1204, caption: "Thumb-stopping ads that move." },
];

function MockSocialFeed() {
	const scrollRef = useRef(null);
	const [liked, setLiked] = useState({});

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		let raf;
		let t = 0;
		function tick() {
			t += 0.003;
			const max = el.scrollHeight - el.clientHeight;
			el.scrollTop = ((Math.sin(t) + 1) / 2) * max;
			raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, []);

	useEffect(() => {
		const timers = SOCIAL_POSTS.map((_, i) =>
			setTimeout(() => setLiked((prev) => ({ ...prev, [i]: true })), 2400 + i * 1800)
		);
		return () => timers.forEach(clearTimeout);
	}, []);

	return (
		<div className="w-full h-full flex flex-col overflow-hidden">
			<div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
				<span className="text-[9px] font-black uppercase tracking-wide text-slate-500">Social Feed</span>
				<div className="flex items-center gap-1">
					<div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
					<span className="text-[8px] font-bold text-emerald-600">Live</span>
				</div>
			</div>
			<div ref={scrollRef} className="flex-1 overflow-hidden">
				<div className="p-2 space-y-2.5">
					{SOCIAL_POSTS.map((post, i) => (
						<div key={i} className="rounded-lg border border-slate-100 bg-white overflow-hidden">
							<div className="flex items-center gap-2 px-2.5 py-1.5">
								<div className={`w-5 h-5 rounded-full bg-gradient-to-br ${post.img} flex items-center justify-center`}>
									<span className="text-[6px] font-black text-white">{post.user}</span>
								</div>
								<span className="text-[9px] font-semibold text-slate-800 flex-1">{post.name}</span>
								<span className="text-[8px] text-slate-400">{post.time}</span>
							</div>
							<div className="px-2.5 py-2 space-y-1.5">
								<div className="h-2 w-full rounded bg-slate-200" />
								<div className="h-2 w-4/5 rounded bg-slate-200" />
								<div className="h-2 w-3/5 rounded bg-slate-100" />
							</div>
							<div className="px-2.5 py-1.5">
								<div className="flex items-center justify-between mb-1">
									<div className="flex items-center gap-2.5">
										<Heart
											size={11}
											className={`transition-all duration-300 ${liked[i] ? "text-red-500 fill-red-500 scale-110" : "text-slate-400"}`}
										/>
										<MessageCircle size={11} className="text-slate-400" />
										<Send size={11} className="text-slate-400" />
									</div>
									<Bookmark size={11} className="text-slate-400" />
								</div>
								<p className="text-[8px] font-bold text-slate-700">
									{liked[i] ? (post.likes + 1).toLocaleString() : post.likes.toLocaleString()} likes
								</p>
								<p className="text-[8px] text-slate-500 leading-tight mt-0.5">{post.caption}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

// ─── PlatformBento (main export) ────────────────────────────────────────────

const C = "rounded-2xl border border-slate-200 relative overflow-hidden";

function cardBg(pos) {
	return {
		background: `radial-gradient(50% 50% at ${pos}, rgba(99,102,241,0.06) 0%, rgba(99,102,241,0) 100%), #f8fafc`,
	};
}

export default function PlatformBento() {
	const { ref, visible } = useScrollReveal(0);

	return (
		<section
			id="platform"
			ref={ref}
			className="py-10 sm:py-16 lg:py-20 bg-white relative overflow-hidden section-px"
		>
			<FloatingOrbs count={7} minSize={100} maxSize={280} />

			<div
				className={`transition-all duration-1000 ${
					visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
				}`}
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:[grid-template-rows:140px_180px_180px_200px]">
					<div
						className={`${C} sm:col-span-2 lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-3 flex flex-col items-center justify-center p-6 sm:p-8 min-h-[260px] sm:min-h-[360px] lg:min-h-0`}
						style={{
							background:
								"linear-gradient(180deg, rgb(37,99,235) 0%, rgb(29,78,216) 40%, rgb(0,26,95) 100%)",
							borderColor: "rgba(37,99,235,0.3)",
						}}
					>
						<div className="flex items-center gap-2 mb-6">
							<div className="w-7 h-7 rounded-xl bg-white/15 flex items-center justify-center">
								<Zap size={14} className="text-white" fill="currentColor" />
							</div>
							<span className="text-white/80 font-medium text-sm tracking-wide">myONE</span>
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-[1.08] tracking-tight">
							Your Digital
							<br />
							Growth Engine
						</h2>
						<div
							className="relative w-full flex-1 min-h-0 mt-2 -mx-8 px-0 max-h-[100px] sm:max-h-none"
							style={{ width: "calc(100% + 4rem)" }}
						>
							<InfinityMesh
								className="w-full h-full pointer-events-none"
								style={{ position: "relative" }}
								cameraZ={120}
							/>
						</div>
					</div>

					<div
						className={`${C} lg:col-start-1 lg:row-start-1 lg:row-span-2 p-6 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[280px] lg:min-h-0`}
						style={cardBg("218% 108%")}
					>
						<div>
							<div className="w-12 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mb-5">
								<Zap size={20} className="text-white" fill="currentColor" />
							</div>
							<h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900">
								Orchestrate
								<br />
								Your Digital
								<br />
								Growth
							</h3>
						</div>
						<div>
							<p className="text-lg font-bold text-slate-800">Request Your Strategy Session</p>
							<p className="text-base text-slate-500">Focus on measurable outcomes</p>
						</div>
					</div>

					<div
						className={`${C} lg:col-start-4 lg:row-start-1 p-0 min-h-[100px] lg:min-h-0`}
						style={cardBg("50% 120%")}
					>
						<MockAnalyticsCard />
					</div>

					<div
						className={`${C} lg:col-start-4 lg:row-start-2 p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] lg:min-h-0`}
						style={cardBg("-41% 110%")}
					>
						<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center mb-2">
							<Zap size={18} className="text-white" fill="currentColor" />
						</div>
						<p className="text-sm font-semibold text-slate-800 mb-0.5">Real-Time Reporting</p>
						<p className="text-xs text-slate-500">myONE Dash tracks every metric that matters</p>
					</div>

					<div
						className={`${C} lg:col-start-1 lg:row-start-3 p-5 sm:p-6 flex flex-col items-center justify-center text-center min-h-[120px] lg:min-h-0`}
						style={cardBg("215% -6%")}
					>
						<p className="text-sm font-semibold text-slate-800 mb-3">Powered by our AI Suite</p>
						<div className="flex items-center gap-3">
							<div className="flex flex-col items-center gap-1">
								<img src="/logo/ConversionIQ.svg" alt="ConversionIQ" className="w-8 h-8" />
								<span className="text-[10px] text-slate-500 font-medium">ConversionIQ</span>
							</div>
							<div className="flex flex-col items-center gap-1">
								<img src="/logo/Chatti.svg" alt="Chatti" className="w-8 h-8" />
								<span className="text-[10px] text-slate-500 font-medium">Chatti</span>
							</div>
							<div className="flex flex-col items-center gap-1">
								<img
									src="/logo/CommentResponder.svg"
									alt="Comment Responder"
									className="w-8 h-8"
								/>
								<span className="text-[10px] text-slate-500 font-medium whitespace-nowrap">
									Comment Responder
								</span>
							</div>
						</div>
					</div>

					<div
						className={`${C} lg:col-start-1 lg:row-start-4 p-0 min-h-[200px] lg:min-h-0`}
						style={cardBg("213% -151%")}
					>
						<MockSocialFeed />
					</div>

					<div
						className={`${C} lg:col-start-2 lg:row-start-4 p-5 sm:p-7 flex flex-col justify-end min-h-[140px] lg:min-h-0 bg-[#f8fafc]`}
					>
						<div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
							<GitBranch size={16} className="text-blue-600" />
						</div>
						<h4 className="text-[15px] font-semibold text-slate-800 mb-1">Multi-Channel Strategy</h4>
						<p className="text-sm text-slate-500 leading-relaxed">
							A strong multichannel content strategy fuels engagement.
						</p>
					</div>

					<div
						className={`${C} lg:col-start-3 lg:row-start-4 p-5 sm:p-7 flex flex-col justify-end min-h-[140px] lg:min-h-0 bg-[#f8fafc]`}
					>
						<div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
							<Crosshair size={16} className="text-blue-600" />
						</div>
						<h4 className="text-[15px] font-semibold text-slate-800 mb-1">Audience Intelligence</h4>
						<p className="text-sm text-slate-500 leading-relaxed">
							Audience intelligence turns marketing from reactive to proactive.
						</p>
					</div>

					<div
						className={`${C} lg:col-start-4 lg:row-start-3 lg:row-span-2 p-5 sm:p-7 flex flex-col min-h-[220px] sm:min-h-[280px] lg:min-h-0`}
						style={cardBg("-115% 0%")}
					>
						<div>
							<h4 className="text-[15px] font-semibold text-slate-800 mb-1">Campaign Blueprints</h4>
							<p className="text-sm text-slate-500 leading-relaxed">
								Pre-built frameworks to accelerate your launch.
							</p>
						</div>
						<div className="max-h-[120px] sm:max-h-none overflow-hidden">
							<MockScrollingSite />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
