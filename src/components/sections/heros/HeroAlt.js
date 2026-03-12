"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Zap, BarChart3, Activity, Target } from "lucide-react";
import ButtonPrimary from "@/components/shared/buttons/ButtonPrimary";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import FlipWords from "./FlipWords";
import { IncreaseCard, GrowthLineChart, BusinessBarChart, MetricPill } from "./HeroChartCards";

export default function HeroAlt() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const t = requestAnimationFrame(() => setMounted(true));
		return () => cancelAnimationFrame(t);
	}, []);

	return (
		<section className="relative min-h-[85vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-36 md:pt-40 lg:pt-48 pb-16 sm:pb-20 md:pb-24 overflow-hidden font-body" style={{ backgroundColor: "#F8FAFC" }}>
			<div className="absolute inset-0 hero-alt-grid z-0 pointer-events-none" />

			<div
				className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] sm:h-[600px] rounded-full blur-[120px] sm:blur-[160px] opacity-20 pointer-events-none"
				style={{ background: "radial-gradient(ellipse at center, rgba(8,145,178,0.3) 0%, rgba(6,182,212,0.1) 50%, transparent 80%)" }}
			/>

		<div className="max-w-5xl mx-auto text-center xl:text-left relative z-10 section-px pt-2 sm:pt-0">
			<div
					className={`font-heading text-body inline-flex items-center gap-2 font-bold mb-4 sm:mb-6 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
					style={{ color: "var(--tj-color-text-body)", transitionDelay: "100ms" }}
				>
					<span className="tracking-[0.15em] sm:tracking-[0.2em] uppercase text-sm sm:text-base">
						All you need is <span className="font-black" style={{ color: "#0475FF" }}>ONE</span>
					</span>
				</div>

				<h1
					className={`liquid-header liquid-header--dark font-heading mb-5 sm:mb-8 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
					style={{ transitionDelay: "200ms", fontSize: "clamp(2rem, 8vw, 94px)" }}
				>
					<span className="black-bar">
						Better{" "}
						<FlipWords />
						<br />
						starts here.
					</span>
				</h1>

				<p
					className={`font-body text-body max-w-2xl mx-auto xl:mx-0 mb-6 sm:mb-8 md:mb-10 text-sm sm:text-base leading-relaxed transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
					style={{ color: "var(--tj-color-text-body)", transitionDelay: "400ms" }}
				>
					More customers, lower costs, zero disruption. Our AI-powered MarTech, conversion-obsessed creative, and proprietary data intelligence work as one coordinated&nbsp;engine.
				</p>

				<div
					className={`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
					style={{ transitionDelay: "600ms" }}
				>
					<QuoteButton />
					<ButtonPrimary text="Creative Collection" url="/portfolios" className="white-btn" />
				</div>
			</div>

			{/* Mobile chart cards */}
			<div
				className={`xl:hidden relative z-10 mt-8 sm:mt-12 md:mt-16 section-px transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
				style={{ transitionDelay: "800ms" }}
			>
				<div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3 max-w-lg mx-auto sm:max-w-xl">
					<IncreaseCard />
					<MetricPill />
					<div className="sm:col-span-2">
						<GrowthLineChart />
					</div>
				</div>
			</div>

			{/* Desktop floating chart cards (interactive, animated) */}
			<div
				className={`absolute top-[22%] left-[12%] hidden xl:block animate-float-hero transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
				style={{ animationDelay: "1.2s", transitionDelay: "800ms" }}
			>
				<IncreaseCard />
			</div>

			<div
				className={`absolute bottom-20 left-[6%] hidden xl:block animate-float-hero transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
				style={{ transitionDelay: "1000ms" }}
			>
				<GrowthLineChart />
			</div>

			<div
				className={`absolute top-[26%] right-[8%] hidden xl:block animate-float-hero transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
				style={{ animationDelay: "2.5s", transitionDelay: "900ms" }}
			>
				<BusinessBarChart />
			</div>

			<div
				className={`absolute bottom-24 right-[15%] hidden xl:block animate-float-hero transition-all duration-1000 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
				style={{ animationDelay: "1.8s", transitionDelay: "1100ms" }}
			>
				<MetricPill />
			</div>

			{/* Desktop decorative depth cards (static, blurred for parallax feel) */}
			<div className="hidden xl:block pointer-events-none" aria-hidden="true">
				<div
					className="absolute -left-6 top-[14%] w-52 animate-float-hero"
					style={{ filter: "blur(0.5px) saturate(1.1) contrast(1.05)", opacity: 0.62, transform: "scale(0.95)", animationDelay: "3.2s" }}
				>
					<div className="rounded-2xl border border-white/50 p-4 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.6)", boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}>
						<div className="flex items-center gap-1.5 mb-2">
							<div className="w-5 h-5 rounded-md bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
								<Activity size={10} className="text-blue-600" />
							</div>
							<span className="text-[9px] font-black uppercase text-slate-700 tracking-wide">Impressions</span>
						</div>
						<span className="text-xl font-extrabold tracking-tighter text-slate-900 tabular-nums">2.4M</span>
						<div className="mt-2 flex items-end gap-1 h-10">
							{[40, 55, 35, 70, 60, 80, 65].map((h, i) => (
								<div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? "#0475FF" : "#cbd5e1" }} />
							))}
						</div>
					</div>
				</div>

				<div
					className="absolute -right-5 bottom-[8%] w-56 animate-float-hero"
					style={{ filter: "blur(0.5px) saturate(1.1) contrast(1.05)", opacity: 0.62, transform: "scale(0.95)", animationDelay: "2.6s" }}
				>
					<div className="rounded-2xl border border-white/50 p-4 backdrop-blur-xl" style={{ background: "rgba(255,255,255,0.6)", boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}>
						<div className="flex items-center gap-1.5 mb-2">
							<div className="w-5 h-5 rounded-md bg-blue-500/15 border border-blue-400/30 flex items-center justify-center">
								<BarChart3 size={10} className="text-blue-600" />
							</div>
							<span className="text-[9px] font-black uppercase text-slate-700 tracking-wide">Revenue</span>
						</div>
						<span className="text-xl font-extrabold tracking-tighter text-slate-900 tabular-nums">$182K</span>
						<svg viewBox="0 0 140 40" className="w-full mt-2">
							<defs>
								<linearGradient id="bgRevGrad" x1="0%" y1="0%" x2="0%" y2="100%">
									<stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
									<stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
								</linearGradient>
							</defs>
							<polygon points="0,40 0,32 20,28 40,30 60,22 80,18 100,20 120,12 140,8 140,40" fill="url(#bgRevGrad)" />
							<polyline points="0,32 20,28 40,30 60,22 80,18 100,20 120,12 140,8" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
						</svg>
					</div>
				</div>

				<div
					className="absolute -right-14 top-[8%] w-48 animate-float-hero"
					style={{ filter: "blur(2.5px) saturate(0.6) contrast(0.85) brightness(1.08)", opacity: 0.36, transform: "scale(0.78)", animationDelay: "0.8s" }}
				>
					<div className="rounded-2xl border border-white/25 p-4" style={{ background: "rgba(255,255,255,0.4)", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
						<div className="flex items-center gap-1.5 mb-2">
							<div className="w-5 h-5 rounded-md bg-blue-500/8 flex items-center justify-center">
								<Target size={10} className="text-blue-500" />
							</div>
							<span className="text-[9px] font-black uppercase text-slate-500 tracking-wide">CTR</span>
						</div>
						<span className="text-xl font-extrabold tracking-tighter text-slate-700 tabular-nums">4.7%</span>
						<div className="h-1.5 bg-slate-100/70 rounded-full mt-3 overflow-hidden">
							<div className="h-full rounded-full w-[72%]" style={{ background: "linear-gradient(90deg, #60a5fa, #93bbfd)" }} />
						</div>
					</div>
				</div>

				<div
					className="absolute -left-16 bottom-[5%] w-48 animate-float-hero"
					style={{ filter: "blur(2.5px) saturate(0.6) contrast(0.85) brightness(1.08)", opacity: 0.36, transform: "scale(0.78)", animationDelay: "1.5s" }}
				>
					<div className="rounded-2xl border border-white/25 p-4" style={{ background: "rgba(255,255,255,0.4)", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
						<div className="flex items-center gap-1.5 mb-2">
							<div className="w-5 h-5 rounded-md bg-blue-500/8 flex items-center justify-center">
								<Zap size={10} className="text-blue-500" />
							</div>
							<span className="text-[9px] font-black uppercase text-slate-500 tracking-wide">ROAS</span>
						</div>
						<div className="flex items-baseline gap-1">
							<span className="text-xl font-extrabold tracking-tighter text-slate-700 tabular-nums">6.2</span>
							<span className="text-[9px] font-bold text-emerald-500">x</span>
						</div>
						<div className="mt-2 grid grid-cols-4 gap-1">
							{[65, 80, 55, 90].map((h, i) => (
								<div key={i} className="rounded-sm" style={{ height: `${h * 0.3}px`, background: i === 3 ? "#60a5fa" : "#e2e8f0" }} />
							))}
						</div>
					</div>
				</div>

				<div
					className="absolute left-[2%] top-[72%] w-44 animate-float-hero"
					style={{ filter: "blur(5px) saturate(0.3) contrast(0.7) brightness(1.18)", opacity: 0.2, transform: "scale(0.6)", animationDelay: "4s" }}
				>
					<div className="rounded-2xl border border-white/15 p-3.5" style={{ background: "rgba(255,255,255,0.3)", boxShadow: "none" }}>
						<div className="flex items-center gap-1.5 mb-2">
							<div className="w-5 h-5 rounded-md bg-blue-500/5 flex items-center justify-center">
								<TrendingUp size={10} className="text-blue-400" />
							</div>
							<span className="text-[9px] font-black uppercase text-slate-400 tracking-wide">CPA</span>
						</div>
						<span className="text-lg font-extrabold tracking-tighter text-slate-500 tabular-nums">$12.40</span>
						<div className="h-1 bg-slate-100/50 rounded-full mt-2 overflow-hidden">
							<div className="h-full rounded-full w-[58%]" style={{ background: "linear-gradient(90deg, #93bbfd, #bfdbfe)" }} />
						</div>
					</div>
				</div>

				<div
					className="absolute right-[1%] top-[55%] w-44 animate-float-hero"
					style={{ filter: "blur(5px) saturate(0.3) contrast(0.7) brightness(1.18)", opacity: 0.2, transform: "scale(0.6)", animationDelay: "3.8s" }}
				>
					<div className="rounded-2xl border border-white/15 p-3.5" style={{ background: "rgba(255,255,255,0.3)", boxShadow: "none" }}>
						<div className="flex items-center gap-1.5 mb-2">
							<div className="w-5 h-5 rounded-md bg-blue-500/5 flex items-center justify-center">
								<Activity size={10} className="text-blue-400" />
							</div>
							<span className="text-[9px] font-black uppercase text-slate-400 tracking-wide">Sessions</span>
						</div>
						<span className="text-lg font-extrabold tracking-tighter text-slate-500 tabular-nums">48.2K</span>
						<div className="flex items-end gap-0.5 h-8 mt-2">
							{[30, 50, 40, 65, 55, 75, 60, 85, 70].map((h, i) => (
								<div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i >= 7 ? "#93bbfd" : "#e2e8f0" }} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
