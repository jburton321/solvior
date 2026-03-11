"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
import {
	Star,
	TrendingUp,
	Activity,
	Zap,
	Sparkles,
	Hotel,
	Car,
	Stethoscope,
	Home,
	Sun,
	ShoppingCart,
	Landmark,
	Scissors,
	UtensilsCrossed,
	Bug,
	GraduationCap,
	Heart,
	Briefcase,
	Scale,
	Cpu,
	Anchor,
	Gem,
	Building2,
} from "lucide-react";

function easeOutExpo(t) {
	return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function useAnimatedCounter({ end, duration = 2000, decimals = 0, prefix = "", suffix = "" }) {
	const [display, setDisplay] = useState(`${prefix}0${suffix}`);
	const [started, setStarted] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !started) {
					setStarted(true);
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [started]);

	useEffect(() => {
		if (!started) return;
		let raf;
		const start = performance.now();
		const animate = (now) => {
			const elapsed = now - start;
			const progress = Math.min(elapsed / duration, 1);
			const value = easeOutExpo(progress) * end;
			setDisplay(`${prefix}${value.toFixed(decimals)}${suffix}`);
			if (progress < 1) {
				raf = requestAnimationFrame(animate);
			}
		};
		raf = requestAnimationFrame(animate);
		return () => cancelAnimationFrame(raf);
	}, [started, end, duration, decimals, prefix, suffix]);

	return { ref, display };
}

// ═══════════════════════════════════════════════════════════════
// STREAMING CHART (Live myONE Dash area chart)
// ═══════════════════════════════════════════════════════════════

const POINT_COUNT = 40;
const UPDATE_INTERVAL = 140;
const BASE_VALUE = 55;
const SMOOTHING = 0.35;

// Deterministic initial curve so server and client match (avoids hydration mismatch)
const INITIAL_CHART_POINTS = Array.from({ length: POINT_COUNT }, (_, i) =>
	Math.max(15, Math.min(90, BASE_VALUE + 12 * Math.sin((i / (POINT_COUNT - 1)) * Math.PI * 1.5)))
);

function generatePoint(prev) {
	const drift = (Math.random() - 0.5) * 6;
	const mean = BASE_VALUE + Math.sin(Date.now() / 4000) * 6;
	const reversion = (mean - prev) * 0.04;
	const raw = prev + drift + reversion;
	return Math.max(15, Math.min(90, raw));
}

function buildPath(points, w, h, closed) {
	const stepX = w / (points.length - 1);
	const toY = (v) => h - (v / 100) * h;
	let d = `M0,${toY(points[0])}`;
	for (let i = 1; i < points.length; i++) {
		const x0 = (i - 1) * stepX;
		const x1 = i * stepX;
		const cpx = (x0 + x1) / 2;
		d += ` C${cpx},${toY(points[i - 1])} ${cpx},${toY(points[i])} ${x1},${toY(points[i])}`;
	}
	if (closed) {
		d += ` L${w},${h} L0,${h} Z`;
	}
	return d;
}

function StreamingChart() {
	const [points, setPoints] = useState(INITIAL_CHART_POINTS);
	const rafId = useRef(0);
	const lastTick = useRef(0);
	const lastValue = useRef(INITIAL_CHART_POINTS[INITIAL_CHART_POINTS.length - 1]);

	const tick = useCallback(() => {
		const now = Date.now();
		if (now - lastTick.current >= UPDATE_INTERVAL) {
			lastTick.current = now;
			const rawNext = generatePoint(lastValue.current);
			const smoothed = lastValue.current * (1 - SMOOTHING) + rawNext * SMOOTHING;
			lastValue.current = smoothed;
			setPoints((prev) => {
				const next = [...prev.slice(1), smoothed];
				return next;
			});
		}
		rafId.current = requestAnimationFrame(tick);
	}, []);

	useEffect(() => {
		rafId.current = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(rafId.current);
	}, [tick]);

	const W = 320;
	const H = 80;
	const linePath = buildPath(points, W, H, false);
	const areaPath = buildPath(points, W, H, true);
	const lastY = H - (points[points.length - 1] / 100) * H;

	return (
		<div className="relative w-full" style={{ aspectRatio: `${W}/${H}` }}>
			<svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full" style={{ overflow: "visible" }}>
				<defs>
					<linearGradient id="chart-grad-dash" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.35" />
						<stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="0" />
					</linearGradient>
					<linearGradient id="line-grad-dash" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="rgb(34,211,238)" stopOpacity="0.2" />
						<stop offset="100%" stopColor="rgb(34,211,238)" stopOpacity="1" />
					</linearGradient>
					<filter id="glow-dash">
						<feGaussianBlur stdDeviation="2" result="blur" />
						<feMerge>
							<feMergeNode in="blur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
				</defs>
				<g aria-hidden="true">
					{[20, 40, 60, 80].map((y) => (
						<line key={y} x1={0} y1={H - (y / 100) * H} x2={W} y2={H - (y / 100) * H} stroke="rgb(100,116,139)" strokeOpacity={0.1} strokeWidth={0.5} />
					))}
					<path d={areaPath} fill="url(#chart-grad-dash)" />
					<path d={linePath} fill="none" stroke="url(#line-grad-dash)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
					<circle cx={W} cy={lastY} r={3} fill="rgb(34,211,238)" filter="url(#glow-dash)" />
					<circle cx={W} cy={lastY} r={5} fill="rgb(34,211,238)" opacity={0.2}>
						<animate attributeName="r" values="5;10;5" dur="2.5s" repeatCount="indefinite" />
						<animate attributeName="opacity" values="0.25;0;0.25" dur="2.5s" repeatCount="indefinite" />
					</circle>
				</g>
			</svg>
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════
// BENTO SCROLLING SITE (Industry cards mini-dashboard)
// ═══════════════════════════════════════════════════════════════

const INDUSTRY_DATA = [
	{ name: "Hospitality", icon: Hotel, color: "#0891b2", roas: "4.2x", leads: "1.8K", trend: 72 },
	{ name: "Automotive", icon: Car, color: "#0ea5e9", roas: "3.8x", leads: "2.4K", trend: 65 },
	{ name: "Healthcare", icon: Stethoscope, color: "#06b6d4", roas: "5.1x", leads: "960", trend: 84 },
	{ name: "Real Estate", icon: Home, color: "#14b8a6", roas: "3.5x", leads: "1.2K", trend: 58 },
	{ name: "Roofing & Solar", icon: Sun, color: "#f59e0b", roas: "6.3x", leads: "3.1K", trend: 91 },
	{ name: "eCommerce", icon: ShoppingCart, color: "#0891b2", roas: "4.7x", leads: "5.6K", trend: 78 },
	{ name: "Financial", icon: Landmark, color: "#0284c7", roas: "3.9x", leads: "890", trend: 62 },
	{ name: "Beauty", icon: Scissors, color: "#ec4899", roas: "5.4x", leads: "2.1K", trend: 86 },
	{ name: "Food & Bev", icon: UtensilsCrossed, color: "#f97316", roas: "3.2x", leads: "1.5K", trend: 54 },
	{ name: "Pest Control", icon: Bug, color: "#22c55e", roas: "7.1x", leads: "4.2K", trend: 93 },
	{ name: "Education", icon: GraduationCap, color: "#6366f1", roas: "4.0x", leads: "1.1K", trend: 68 },
	{ name: "Non-Profit", icon: Heart, color: "#ef4444", roas: "3.6x", leads: "740", trend: 51 },
	{ name: "Franchise", icon: Building2, color: "#0891b2", roas: "4.5x", leads: "1.9K", trend: 75 },
	{ name: "Cruise & Travel", icon: Anchor, color: "#0ea5e9", roas: "5.8x", leads: "2.7K", trend: 88 },
	{ name: "D2C", icon: Gem, color: "#8b5cf6", roas: "6.0x", leads: "3.8K", trend: 82 },
	{ name: "Legal", icon: Scale, color: "#64748b", roas: "4.9x", leads: "620", trend: 70 },
	{ name: "Technology", icon: Cpu, color: "#06b6d4", roas: "5.2x", leads: "1.4K", trend: 79 },
	{ name: "Vacation", icon: Briefcase, color: "#0d9488", roas: "4.8x", leads: "2.0K", trend: 74 },
];

function BentoScrollingSite({ visible }) {
	const scrollRef = useRef(null);

	useEffect(() => {
		if (!visible) return;
		const el = scrollRef.current;
		if (!el) return;
		let raf;
		let t = 0;
		function tick() {
			t += 0.0015;
			const max = el.scrollHeight - el.clientHeight;
			const progress = (Math.sin(t) + 1) / 2;
			el.scrollTop = progress * max;
			raf = requestAnimationFrame(tick);
		}
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [visible]);

	return (
		<div className={`relative h-[100px] sm:h-full rounded-xl overflow-hidden border border-slate-200/80 bg-slate-50 shadow-sm transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
			<div className="flex items-center justify-between px-2.5 py-1.5 bg-white border-b border-slate-200/60">
				<div className="flex items-center gap-1.5">
					<div className="w-3.5 h-3.5 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600" />
					<div className="h-1.5 w-12 rounded-full bg-slate-800/70" />
				</div>
				<div className="flex items-center gap-1">
					<div className="h-1 w-6 rounded-full bg-slate-200" />
					<div className="h-1 w-6 rounded-full bg-cyan-500/40" />
				</div>
			</div>
			<div ref={scrollRef} className="overflow-hidden h-[calc(100%-28px)]">
				<div className="p-1.5 grid grid-cols-2 gap-1.5">
					{INDUSTRY_DATA.map((industry, idx) => {
						const Icon = industry.icon;
						return (
							<div key={idx} className="bg-white rounded-lg border border-slate-100 p-2 flex flex-col gap-1.5">
								<div className="flex items-center gap-1.5">
									<div className="w-4 h-4 rounded-md flex items-center justify-center shrink-0" style={{ backgroundColor: `${industry.color}12`, border: `1px solid ${industry.color}20` }}>
										<Icon size={7} style={{ color: industry.color }} strokeWidth={2.2} />
									</div>
									<span className="text-[5px] font-bold text-slate-700 truncate leading-none">{industry.name}</span>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<span className="text-[4px] font-semibold text-slate-400 block leading-none">ROAS</span>
										<span className="text-[7px] font-extrabold text-slate-800 leading-none">{industry.roas}</span>
									</div>
									<div className="text-right">
										<span className="text-[4px] font-semibold text-slate-400 block leading-none">Leads</span>
										<span className="text-[7px] font-extrabold text-slate-800 leading-none">{industry.leads}</span>
									</div>
								</div>
								<div className="flex items-center gap-1">
									<div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
										<div className="h-full rounded-full" style={{ width: `${industry.trend}%`, background: `linear-gradient(90deg, ${industry.color}60, ${industry.color})` }} />
									</div>
									<div className="flex items-center gap-0.5">
										<TrendingUp size={4} style={{ color: industry.color }} />
										<span className="text-[4px] font-bold" style={{ color: industry.color }}>{industry.trend}%</span>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════
// REVEAL CARD WRAPPER
// ═══════════════════════════════════════════════════════════════

function RevealCard({ children, delay = 0, className = "" }) {
	const { ref, visible } = useScrollReveal(delay);
	return (
		<div ref={ref} className={`${className} transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.97]"}`}>
			{children}
		</div>
	);
}

// ═══════════════════════════════════════════════════════════════
// CARD 1: 19+ INDUSTRIES
// ═══════════════════════════════════════════════════════════════

const INDUSTRIES = [
	"Hospitality",
	"Vacation Ownership",
	"Automotive",
	"Healthcare",
	"Franchise",
	"Real Estate",
	"Cruise & Travel",
	"Home Services",
	"Roofing & Solar",
	"eCommerce",
	"Financial Services",
	"Beauty & Wellness",
	"Food & Beverage",
	"Pest Control",
	"Education",
	"Non-Profit",
	"D2C",
	"Legal",
	"Technology",
];

function IndustriesCard() {
	const { ref, display } = useAnimatedCounter({ end: 19, suffix: "+", duration: 1800 });
	const { ref: chartRef, visible: chartVisible } = useScrollReveal(100);
	const doubled = [...INDUSTRIES, ...INDUSTRIES];

	return (
		<RevealCard delay={0} className="relative md:row-span-2 rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[520px] md:min-h-0 group bg-white border border-slate-200/80 shadow-sm">
			<div className="absolute top-0 right-0 w-60 h-60 bg-cyan-500/[0.06] rounded-full blur-3xl" />
			<div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/[0.04] rounded-full blur-3xl" />
			<div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-slate-200 flex items-center justify-center bg-slate-50 transition-all duration-500 group-hover:border-cyan-500/30 group-hover:bg-cyan-50">
				<span className="text-slate-900 font-black text-sm tracking-tight">24/7</span>
			</div>
			<div ref={chartRef} className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col h-full gap-2">
				<div>
					<h3 className="text-2xl md:text-3xl font-bold uppercase text-slate-900 leading-[0.9] tracking-tight mb-2">
						<span ref={ref}>{display}</span>
						<br />
						Industries.
					</h3>
					<p className="text-[10px] font-black uppercase text-slate-500 leading-loose">
						Driving results across
						<br />
						diverse market&nbsp;verticals.
					</p>
				</div>
				<div className="flex-1 min-h-0">
					<BentoScrollingSite visible={chartVisible} />
				</div>
				<div className="space-y-2 overflow-hidden">
					<div className="relative overflow-hidden">
						<div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
						<div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
						<div className="flex gap-2 animate-scroll whitespace-nowrap" style={{ animationDuration: "35s" }}>
							{doubled.map((industry, i) => (
								<span key={`a-${industry}-${i}`} className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-bold uppercase text-slate-600 shrink-0 transition-colors duration-300 hover:border-cyan-500/40 hover:text-blue-700 hover:bg-cyan-50">
									{industry}
								</span>
							))}
						</div>
					</div>
					<div className="relative overflow-hidden">
						<div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
						<div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
						<div className="flex gap-1.5 sm:gap-2 animate-scroll whitespace-nowrap" style={{ animationDuration: "45s", animationDirection: "reverse" }}>
							{[...doubled].reverse().map((industry, i) => (
								<span key={`b-${industry}-${i}`} className="inline-flex items-center px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[9px] sm:text-[10px] font-bold uppercase text-slate-600 shrink-0 transition-colors duration-300 hover:border-cyan-500/40 hover:text-blue-700 hover:bg-cyan-50">
									{industry}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</RevealCard>
	);
}

// ═══════════════════════════════════════════════════════════════
// CARD 2: SPEED TO MARKET (21 Days)
// ═══════════════════════════════════════════════════════════════

const VELOCITY_PHASES = [
	{ label: "Discovery & Audit", day: "1-3", icon: Activity },
	{ label: "Strategy Build", day: "4-8", icon: TrendingUp },
	{ label: "Creative Production", day: "9-14", icon: Zap },
	{ label: "Launch & Optimize", day: "15-21", icon: Star },
];

function CampaignVelocityCard() {
	const [activePhase, setActivePhase] = useState(0);
	const [pulseKey, setPulseKey] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setActivePhase((prev) => (prev + 1) % VELOCITY_PHASES.length);
			setPulseKey((k) => k + 1);
		}, 2800);
		return () => clearInterval(id);
	}, []);

	const progress = ((activePhase + 1) / VELOCITY_PHASES.length) * 100;
	const circumference = 2 * Math.PI * 54;
	const offset = circumference - (progress / 100) * circumference;
	const phase = VELOCITY_PHASES[activePhase];
	const PhaseIcon = phase.icon;

	return (
		<RevealCard delay={100} className="relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[320px] sm:min-h-[340px] md:min-h-0 group cursor-default">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[100px] bg-cyan-500/10 transition-all duration-700" />
			<div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-2">
				{/* Circle + 21 Days: centered as one unit */}
				<div className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] flex-shrink-0">
					{/* Faint concentric pulse rings — no inline opacity so keyframes control 0.4 → 0 */}
					{[0, 1, 2].map((i) => (
						<div
							key={`${pulseKey}-${i}`}
							className="absolute inset-0 rounded-full border border-cyan-500/30 pointer-events-none"
							style={{
								animation: `velocityPulse 2.4s ease-out ${i * 0.5}s infinite`,
							}}
						/>
					))}
					<svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120" aria-hidden="true">
						<circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
						<circle cx="60" cy="60" r="54" fill="none" stroke="url(#velocityGrad)" strokeWidth="3" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
						<defs>
							<linearGradient id="velocityGrad" x1="0%" y1="0%" x2="100%" y2="0%">
								<stop offset="0%" stopColor="#0891b2" />
								<stop offset="100%" stopColor="#06b6d4" />
							</linearGradient>
						</defs>
					</svg>
					{/* 21 + DAYS + icon: absolutely centered inside the circle */}
					<div className="absolute inset-0 flex flex-col items-center justify-center text-center">
						<div className="w-11 h-11 rounded-xl flex items-center justify-center border border-cyan-500/25 bg-cyan-50/80 mb-2 transition-all duration-500 shrink-0" style={{ boxShadow: "0 0 20px rgba(8,145,178,0.12)" }}>
							<PhaseIcon size={18} className="text-cyan-700" strokeWidth={1.8} />
						</div>
						<span className="text-[1.75rem] sm:text-[2rem] font-black text-slate-900 tracking-tighter leading-none block">21</span>
						<span className="text-[9px] font-black uppercase text-slate-400 tracking-widest mt-0.5 block">DAYS</span>
					</div>
				</div>
				{/* Phase label + dots below the circle */}
				<div className="text-center transition-all duration-500 mt-5">
					<span className="text-[10px] font-black uppercase text-cyan-700 block">{phase.label}</span>
					<span className="text-[8px] font-bold uppercase text-slate-400 mt-0.5 block">Day {phase.day}</span>
				</div>
				<div className="flex items-center gap-2 mt-3">
					{VELOCITY_PHASES.map((_, i) => (
						<div key={i} className="h-1 rounded-full transition-all duration-500" style={{ width: i <= activePhase ? 20 : 8, backgroundColor: i <= activePhase ? "#0891b2" : "#e2e8f0", boxShadow: i <= activePhase ? "0 0 6px rgba(8,145,178,0.3)" : "none" }} />
					))}
				</div>
			</div>
			<div className="relative z-10 flex items-center gap-2 mt-auto pt-2">
				<Zap size={14} className="text-cyan-700" strokeWidth={2} />
				<span className="text-[9px] font-black uppercase text-cyan-700/70">Speed to Market</span>
			</div>
		</RevealCard>
	);
}

// ═══════════════════════════════════════════════════════════════
// CARD 3: REAL-TIME PERFORMANCE REPORTING
// ═══════════════════════════════════════════════════════════════

const METRIC_CHANNELS = [
	{ label: "META", color: "#0891b2" },
	{ label: "GOOG", color: "#06b6d4" },
	{ label: "TKTK", color: "#22d3ee" },
	{ label: "EMAIL", color: "#67e8f9" },
];

// Deterministic initial values so server and client match (avoids hydration error)
const INITIAL_METRICS = [52, 58, 64, 70];

function useSimulatedMetrics() {
	const [metrics, setMetrics] = useState(INITIAL_METRICS);
	const tick = useCallback(() => {
		setMetrics((prev) =>
			prev.map((v) => {
				const delta = (Math.random() - 0.45) * 12;
				return Math.max(15, Math.min(95, v + delta));
			})
		);
	}, []);
	useEffect(() => {
		const id = setInterval(tick, 1800);
		return () => clearInterval(id);
	}, [tick]);
	return metrics;
}

function ReportingCard() {
	const metrics = useSimulatedMetrics();
	return (
		<RevealCard delay={200} className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 md:p-10 flex flex-col justify-between min-h-[200px] sm:min-h-[260px] md:min-h-0 group relative overflow-hidden cursor-default">
			<div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/[0.05] rounded-full blur-3xl transition-all duration-700 group-hover:bg-cyan-500/[0.08] group-hover:w-56 group-hover:h-56" />
			<div className="relative z-10">
				<h3 className="text-xl md:text-2xl font-bold uppercase text-slate-900 leading-[0.9] tracking-tight">
					Real-Time
					<br />
					Performance
					<br />
					Reporting.
				</h3>
			</div>
			<div className="relative z-10 mt-6 space-y-2.5">
				{METRIC_CHANNELS.map((ch, i) => (
					<div key={ch.label} className="flex items-center gap-3">
						<span className="text-[8px] font-black text-blue-600 w-10 shrink-0">{ch.label}</span>
						<div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
							<div className="h-full rounded-full transition-all duration-[1400ms] ease-out" style={{ width: `${metrics[i]}%`, background: `linear-gradient(90deg, ${ch.color}55, ${ch.color})`, boxShadow: `0 0 6px ${ch.color}30` }} />
						</div>
						<span className="text-[9px] font-bold tabular-nums text-slate-500 w-8 text-right transition-all duration-700">{metrics[i].toFixed(0)}%</span>
					</div>
				))}
			</div>
			<div className="flex items-center gap-3 relative z-10 mt-4">
				<Activity size={14} className="text-blue-600 opacity-0 transition-all duration-500 group-hover:opacity-100" />
				<p className="text-[10px] font-black uppercase text-blue-600 leading-loose transition-colors duration-500 group-hover:text-slate-500">
					Focused on measurable outcomes
					<br />
					and long-term&nbsp;success.
				</p>
			</div>
		</RevealCard>
	);
}

// ═══════════════════════════════════════════════════════════════
// CARD 4: ROTATING CAPABILITIES
// ═══════════════════════════════════════════════════════════════

const CAPABILITY_ITEMS = [
	{ icon: Zap, color: "#2563eb", label: "Performance Creative", desc: "Ads that convert, not just impress" },
	{ icon: TrendingUp, color: "#0891b2", label: "Customer Acquisition", desc: "Full-funnel growth engine" },
	{ icon: Activity, color: "#059669", label: "myONE Dash", desc: "Real-time campaign analytics" },
	{ icon: Sparkles, color: "#d97706", label: "AI-Powered Targeting", desc: "Persona-driven hypertargeting" },
];

function RecordsCard() {
	const [activeIdx, setActiveIdx] = useState(0);
	const [fading, setFading] = useState(false);

	useEffect(() => {
		const id = setInterval(() => {
			setFading(true);
			setTimeout(() => {
				setActiveIdx((prev) => (prev + 1) % CAPABILITY_ITEMS.length);
				setFading(false);
			}, 350);
		}, 3000);
		return () => clearInterval(id);
	}, []);

	const current = CAPABILITY_ITEMS[activeIdx];

	return (
		<RevealCard delay={150} className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[220px] md:min-h-0 group relative overflow-hidden cursor-default">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] transition-all duration-700 opacity-10" style={{ backgroundColor: current.color }} />
			<div className="relative z-10 flex flex-col items-center">
				<div className="relative w-14 h-14 mb-5">
					{CAPABILITY_ITEMS.map((item, i) => {
						const Icon = item.icon;
						const isActive = i === activeIdx;
						return (
							<div key={item.label} className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out" style={{ opacity: isActive && !fading ? 1 : 0, transform: isActive && !fading ? "scale(1) translateY(0)" : fading && isActive ? "scale(0.5) translateY(8px)" : "scale(0.5) translateY(-8px)" }}>
								<div className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500" style={{ borderColor: `${item.color}25`, backgroundColor: `${item.color}0c`, boxShadow: `0 0 20px ${item.color}15` }}>
									<Icon size={22} style={{ color: item.color }} strokeWidth={1.8} />
								</div>
							</div>
						);
					})}
				</div>
				<div className="transition-all duration-400 mb-2" style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(4px)" : "translateY(0)" }}>
					<span className="text-lg font-extrabold text-slate-900 block tracking-tight">{current.label}</span>
				</div>
				<div className="transition-all duration-400" style={{ opacity: fading ? 0 : 1, transform: fading ? "translateY(4px)" : "translateY(0)" }}>
					<p className="text-[11px] font-medium text-slate-500 leading-relaxed">{current.desc}</p>
				</div>
				<div className="flex gap-1.5 mt-4">
					{CAPABILITY_ITEMS.map((_, i) => (
						<div key={i} className="h-1 rounded-full transition-all duration-500" style={{ width: i === activeIdx ? 16 : 6, backgroundColor: i === activeIdx ? current.color : "#cbd5e1" }} />
					))}
				</div>
			</div>
		</RevealCard>
	);
}

// ═══════════════════════════════════════════════════════════════
// CARD 5: LIVE myONE DASH PREVIEW
// ═══════════════════════════════════════════════════════════════

function DashFeedCard() {
	return (
		<RevealCard delay={250} className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-6 md:p-8 flex flex-col justify-end min-h-[160px] sm:min-h-[200px] md:min-h-0 group relative overflow-hidden">
			<div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/[0.04] rounded-full blur-3xl transition-all duration-700 group-hover:bg-cyan-500/[0.06]" />
			<div className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative overflow-hidden transition-all duration-500 group-hover:border-cyan-200">
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/[0.03] to-cyan-500/0 transition-all duration-700 group-hover:via-cyan-500/[0.06]" />
				<div className="relative z-10">
					<div className="flex items-center justify-between mb-3">
						<div className="flex items-center gap-2.5">
							<span className="relative flex h-2 w-2">
								<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
								<span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
							</span>
							<span className="text-[9px] font-black uppercase text-slate-500">Live myONE Dash&nbsp;Preview</span>
						</div>
						<Zap size={12} className="text-blue-600/60" />
					</div>
					<div className="mb-4">
						<StreamingChart />
					</div>
					<div className="flex items-center justify-between">
						<span className="text-xs font-bold text-slate-700 tracking-tight">Campaign Performance</span>
						<div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
							<TrendingUp size={13} className="text-blue-600" />
							<span className="text-[10px] font-bold text-blue-600">Live</span>
						</div>
					</div>
				</div>
			</div>
		</RevealCard>
	);
}

// ═══════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════

export default function BentoGrid() {
	return (
		<section className="pt-10 pb-16 section-px" style={{ backgroundColor: "#ffffff" }}>
			<div className="mx-auto">
				<div className="sec-heading mb-10 sm:mb-14 text-center">
					<h2 className="sec-title text-anim">
						The Growth Infrastructure.
					</h2>
					<p className="desc mx-auto">
						Everything you need to dominate your market — speed, data, creative, and real-time intelligence working in concert.
					</p>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-[1.35fr_1fr] gap-1.5 md:h-[680px]">
					<IndustriesCard />
					<CampaignVelocityCard />
					<ReportingCard />
					<RecordsCard />
					<DashFeedCard />
				</div>
			</div>
		</section>
	);
}
