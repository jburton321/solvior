"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedOneLogo from "@/components/shared/AnimatedOneLogo";

// ─── Founders (sticky video reveal with shrinking portal) ───────────────────

const VIDEO_SRC = "/media/team.mp4";

function Founders() {
	const sectionRef = useRef(null);
	const portalRef = useRef(null);
	const [logoVisible, setLogoVisible] = useState(false);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;
		const io = new IntersectionObserver(
			([e]) => { if (e.isIntersecting) setLogoVisible(true); },
			{ threshold: 0.05 }
		);
		io.observe(section);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		let ticking = false;

		const update = () => {
			ticking = false;
			const section = sectionRef.current;
			const portal = portalRef.current;
			if (!section || !portal) return;

			const rect = section.getBoundingClientRect();
			let p = -rect.top / window.innerHeight;
			p = Math.max(0, Math.min(1, p));

			const scale = 1 - p;
			const opacity = p > 0.85 ? 1 - (p - 0.85) / 0.15 : 1;
			portal.style.width = `${scale * 100}%`;
			portal.style.height = `${scale * 100}%`;
			portal.style.borderRadius = `${p * 50}px`;
			portal.style.opacity = `${opacity}`;
		};

		const handleScroll = () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(update);
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		update();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<section className="reverse-eclipse-section" ref={sectionRef}>
			<div className="eclipse-sticky-stage">
				<div className="eclipse-bg-blur">
					<video autoPlay muted loop playsInline src={VIDEO_SRC} />
					<div className="eclipse-gradient-overlay" />
				</div>

				<div className="eclipse-shrink-portal" ref={portalRef}>
					<div className="eclipse-yt-wrap">
						<video autoPlay muted loop playsInline src={VIDEO_SRC} />
					</div>
				</div>

				<div className="eclipse-header-layer">
					<AnimatedOneLogo
						active={logoVisible}
						className="mx-auto mb-4"
						style={{ width: "clamp(16rem, 40vw, 32rem)", display: "block", filter: "brightness(0) invert(1)" }}
					/>
					<h2 className="liquid-header" style={{ fontSize: "clamp(28px, 5vw, 48px)" }}>
						<span className="black-bar">You&apos;re Not Hiring an Agency.</span>
					</h2>
					<p className="text-white/80 text-base sm:text-xl md:text-2xl font-light leading-relaxed max-w-[600px] mx-auto">
						You&apos;re Hiring Founders Who&apos;ve Been in Your Seat.
					</p>
					<p className="text-white/50 text-xs sm:text-sm md:text-base mt-3 sm:mt-4 max-w-[480px] mx-auto leading-relaxed">
						Most agencies are black boxes. Faceless vendors running your budget on autopilot.
					</p>

				</div>
			</div>
		</section>
	);
}

// ─── FoundersStory (white card that overlaps the video) ─────────────────────

function FoundersStory() {
	const sectionRef = useRef(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		const obs = new IntersectionObserver(
			([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
			{ threshold: 0.15 }
		);
		obs.observe(el);
		return () => obs.disconnect();
	}, []);

	return (
		<section ref={sectionRef} className="relative z-10 flex items-end min-h-screen" style={{ marginTop: "-100vh" }}>
			<div
				className="relative overflow-hidden rounded-t-[20px] md:rounded-t-[45px] w-full"
				style={{ background: "#ffffff" }}
			>
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-black/[0.01]" />
					<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
					<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
				</div>

				<div className="relative max-w-4xl mx-auto px-6 sm:px-10 lg:px-8 py-14 sm:py-20">
					<div
						className="mb-12 transition-all duration-1000 ease-out"
						style={{
							opacity: visible ? 1 : 0,
							transform: visible ? "translateY(0)" : "translateY(40px)",
						}}
					>
						<div className="flex items-center gap-3 mb-8">
							<div className="w-8 h-px bg-slate-400" />
							<span className="text-[10px] font-bold uppercase text-slate-500">
								The People Behind Your Growth
							</span>
						</div>

						<p className="text-slate-700 text-base sm:text-lg md:text-xl leading-[1.8] font-light">
							ONE Agency was co-founded by serial entrepreneurs{" "}
							<span className="text-slate-900 font-medium">Jason Tremblay</span> (CEO) and{" "}
							<span className="text-slate-900 font-medium">Brooke Tremblay</span> (Chief Creative Officer),
							alongside <span className="text-slate-900 font-medium">John and Marcia Rowley</span>,
							founders of International Cruise &amp; Excursions.{" "}
							<span className="text-slate-900 font-semibold">Three INC 5000 companies built and sold.</span>
						</p>
					</div>

					<div
						className="mb-12 transition-all duration-1000 ease-out delay-200"
						style={{
							opacity: visible ? 1 : 0,
							transform: visible ? "translateY(0)" : "translateY(40px)",
						}}
					>
						<p className="text-slate-600 text-base sm:text-lg leading-[1.85] font-light">
							Your strategy is built by people who&apos;ve run payroll, lost sleep over acquisition costs,
							and know what revenue pressure feels like. They build your growth plan the way they&apos;d
							build their own, backed by{" "}
							<span className="text-slate-800 font-medium">years of managed media experience</span> and a
							full team of data scientists, creative directors, and conversion engineers working
							exclusively on your growth in{" "}
							<span className="text-slate-800 font-medium">Orlando, FL</span>.
						</p>
					</div>

					<div
						className="relative transition-all duration-1000 ease-out delay-500"
						style={{
							opacity: visible ? 1 : 0,
							transform: visible ? "translateY(0)" : "translateY(40px)",
						}}
					>
						<div className="flex items-start gap-5 sm:gap-6">
							<div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-slate-200 mt-1">
								<img
									src="/home/headshot.png"
									alt="Jason Tremblay"
									className="w-full h-full object-cover"
									loading="lazy"
									width={64}
									height={64}
								/>
							</div>
							<div className="border-l-2 border-slate-300 pl-6 sm:pl-8 py-1 flex-1">
								<blockquote className="text-slate-900 text-lg sm:text-xl md:text-2xl font-normal italic leading-relaxed">
									&ldquo;You don&apos;t pay us for impressions. You pay us to move the needle on your revenue.&rdquo;
								</blockquote>
								<cite className="block mt-4 not-italic text-slate-600 text-xs sm:text-sm font-medium">
									— Jason Tremblay, CEO &amp; Co-Founder
								</cite>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>
	);
}

// ─── Combined Export ────────────────────────────────────────────────────────

export default function FoundersReveal() {
	return (
		<>
			<Founders />
			<FoundersStory />
		</>
	);
}
