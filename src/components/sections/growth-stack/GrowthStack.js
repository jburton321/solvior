"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import useScrollReveal from "@/hooks/useScrollReveal";
import {
	ArrowRight,
	Target,
	Sparkles,
	Heart,
	Cloud,
	Share2,
	CalendarCheck,
	Workflow,
	Plug,
	X,
} from "lucide-react";


const ICONS = [
	Target,
	Sparkles,
	Heart,
	Cloud,
	Share2,
	CalendarCheck,
	Workflow,
	Plug,
];

const ACCENTS = [
	{ from: "#2563eb", to: "#0ea5e9" },
	{ from: "#0891b2", to: "#06b6d4" },
	{ from: "#0369a1", to: "#0284c7" },
	{ from: "#1d4ed8", to: "#3b82f6" },
	{ from: "#0e7490", to: "#22d3ee" },
	{ from: "#1e40af", to: "#60a5fa" },
	{ from: "#0c4a6e", to: "#38bdf8" },
	{ from: "#164e63", to: "#67e8f9" },
];

const stack = [
	{
		num: "01",
		title: "Customer Acquisition\u2122",
		prob: "Your next 1,000 customers are already\u00A0online.",
		sol: "We find them using 3rd-party data partnerships and creatives built to convert, then deliver them as qualified leads at scale. myONEdash\u2122 gives you real-time CPL, CPA, CTR, and creative performance drilled down to the AdSet.",
		detail:
			"Our Customer Acquisition engine is built on a foundation of 220M+ consumer records and real-time intent signals. We identify high-value prospects before they even enter your funnel, then serve them conversion-optimized creative across Meta, Google, Programmatic, and OTT. Every campaign integrates directly with your CRM through myONE Automations, ensuring zero workflow disruption. You get full transparency via myONEdash\u2122 with real-time CPL, CPA, CTR, impressions, and sales volume drilled down to the AdSet level.",
	},
	{
		num: "02",
		title: "Performance Creative\u2122",
		prob: "Your ads compete with thousands of others every day. Most get\u00A0ignored.",
		sol: "Every asset we build is centered on one goal, one audience, one action. Ad-to-landing-page continuity: copy, design, and offer unified across the full click\u00A0journey.",
		detail:
			"Performance Creative is not a design service. It is a revenue function. Every asset\u2014photo-rich statics, full-motion video, interactive carousels\u2014is built with one objective: convert. We maintain ad-to-landing-page continuity so that copy, design, and offer stay unified across the full click journey. Our creative team runs continuous A/B and multivariate tests, iterating on hooks, CTAs, and visual hierarchy until your cost-per-acquisition drops and your ROAS climbs.",
	},
	{
		num: "03",
		title: "Customer Engagement\u2122",
		prob: "Most of your visitors leave and never come back. That changes\u00A0here.",
		sol: "Referral Engine\u2122 turns your best customers into a self-sustaining acquisition channel. Retargeting and remarketing sequences re-engage bounced visitors with\u00A0precision.",
		detail:
			"Customer Engagement covers the entire post-click experience. Referral Engine\u2122 transforms your happiest customers into a self-sustaining acquisition channel through omni-channel sharing across social, email, SMS, and 10+ platforms. Retargeting and remarketing sequences use behavioral and keyword-based signals to re-engage bounced visitors with surgical precision. Every web experience is CRO-tested and conversion-optimized to lift your web-to-conversion rate measurably.",
	},
	{
		num: "04",
		title: "myONE DataCloud\u2122",
		prob: "Right now, your prospect data has gaps. Missing emails, missing demographics, missing buying\u00A0signals.",
		sol: "DataCloud fills those gaps across 220 million records and 4.4 billion data fields. Reverse-append proprietary attributes to every prospect and customer\u00A0record.",
		detail:
			"myONE DataCloud\u2122 is a proprietary data infrastructure containing 220 million records and 4.4 billion data fields. It powers persona-driven hypertargeting and identity resolution across every campaign we run. Reverse-append proprietary attributes\u2014demographics, psychographics, purchase intent, and behavioral signals\u2014to every prospect and customer record in your database. Uncover hidden audience segments and fuel every campaign with intelligence your competitors simply do not have access to.",
	},
	{
		num: "05",
		title: "Referral Engine\u2122",
		prob: "Your best customers already talk about you. This turns that into a revenue\u00A0channel.",
		sol: "Omni-channel referral capabilities across social, email, SMS, and 10+ channels. Frictionless, gamified sharing experience that\u00A0converts.",
		detail:
			"Referral Engine\u2122 provides omni-channel referral capabilities across social, email, SMS, and 10+ channels. The experience is frictionless and gamified\u2014your customers share because it feels rewarding, not because you asked. We layer paid media strategy on top to amplify program awareness and drive app downloads. The result is a compounding growth loop where your best customers become your most efficient acquisition channel.",
	},
	{
		num: "06",
		title: "myONE Booking Engine\u2122",
		prob: "Every second of friction between \"I'm interested\" and \"I'm booked\" costs you\u00A0revenue.",
		sol: "Real-time inventory management with direct web integration and API-driven loading. Mobile-first design with compelling destination visuals and urgency\u00A0triggers.",
		detail:
			"myONE Booking Engine\u2122 is a highly customizable travel booking engine built to convert, not just show availability. It features real-time inventory management with direct web integration and API-driven loading. The mobile-first design showcases compelling destination visuals, urgency triggers, and trust elements that drive bookings. It integrates with every major merchant provider and payment gateway, ensuring a frictionless path from interest to confirmed reservation.",
	},
	{
		num: "07",
		title: "myONE Automations\u2122",
		prob: "Every platform you use talks to every other platform. Automatically. No developer\u00A0required.",
		sol: "API-driven, fully customizable automation that connects everything. Data flows in, actions trigger out, and the manual work killing your team's capacity\u00A0disappears.",
		detail:
			"myONE Automations\u2122 is an API-driven engine with if/then logic and stepped triggering that connects every platform in your stack. Data flows in, actions trigger out, and the manual work killing your team's capacity disappears. Route leads based on behavior, score prospects in real-time, trigger follow-up sequences, and sync data across your CRM, email platform, and ad accounts\u2014all without a single line of code from your team.",
	},
	{
		num: "08",
		title: "Accelerated API Integrations\u2122",
		prob: "Your systems don't need to be replaced. They need to be\u00A0connected.",
		sol: "Future-proof your marketing infrastructure without ripping out what already works. ONE Agency bridges every platform, CRM, and data source through a centralized\u00A0architecture.",
		detail:
			"Accelerated API Integrations\u2122 future-proofs your marketing infrastructure without ripping out what already works. ONE Agency bridges every platform, CRM, and data source through a centralized architecture that scales with you. We handle the technical complexity so your team stays focused on strategy and growth. The result is a unified, real-time data ecosystem where every system communicates seamlessly.",
	},
];

function StackModal({ item, index, onClose }) {
	const Icon = ICONS[index];
	const accent = ACCENTS[index];
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		requestAnimationFrame(() => setMounted(true));
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const handleClose = useCallback(() => {
		setMounted(false);
		setTimeout(onClose, 300);
	}, [onClose]);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") handleClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [handleClose]);

	return createPortal(
		<div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center sm:p-6">
			<div
				className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${mounted ? "opacity-100" : "opacity-0"}`}
				onClick={handleClose}
			/>
			<div
				className={`relative w-full sm:max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-white shadow-2xl transition-all duration-300 ${
					mounted
						? "opacity-100 sm:scale-100 translate-y-0"
						: "opacity-0 sm:scale-95 translate-y-full sm:translate-y-4"
				}`}
			>
				<div className="sm:hidden sticky top-0 z-20 flex justify-center pt-3 pb-1 bg-white rounded-t-2xl">
					<div className="w-10 h-1 rounded-full bg-slate-300" />
				</div>
				<div
					className="hidden sm:block h-1 rounded-t-2xl"
					style={{
						background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
					}}
				/>
				<button
					onClick={handleClose}
					className="absolute top-3 right-3 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-all duration-200 z-20"
				>
					<X size={16} />
				</button>
				<div className="p-5 pt-2 sm:p-10">
					<div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
						<div
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center border flex-shrink-0"
							style={{
								borderColor: `${accent.from}20`,
								backgroundColor: `${accent.from}08`,
							}}
						>
							<Icon
								size={18}
								strokeWidth={1.8}
								style={{ color: accent.from }}
							/>
						</div>
						<div className="min-w-0">
							<span className="text-[10px] font-bold uppercase text-slate-600">
								{item.num}
							</span>
							<h3 className="text-lg sm:text-xl font-semibold uppercase tracking-tight text-slate-900">
								{item.title}
							</h3>
						</div>
					</div>
					<div
						className="px-4 py-3 sm:px-5 sm:py-4 rounded-xl mb-6 sm:mb-8 border"
						style={{
							backgroundColor: `${accent.from}06`,
							borderColor: `${accent.from}15`,
						}}
					>
						<p
							className="text-[11px] sm:text-xs font-bold uppercase leading-relaxed"
							style={{ color: accent.from }}
						>
							{item.prob}
						</p>
					</div>
					<div className="flex items-center gap-3 mb-4 sm:mb-6">
						<div
							className="w-10 h-px"
							style={{
								background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
							}}
						/>
						<span className="text-[9px] font-black uppercase text-slate-500">
							How it works
						</span>
					</div>
					<p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed sm:leading-[1.8]">
						{item.detail}
					</p>
					<div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 pb-2 sm:pb-0">
						<QuoteButton />
						<button
							onClick={handleClose}
							className="py-4 px-6 border border-slate-200 text-slate-500 font-bold uppercase text-xs hover:border-slate-300 hover:text-slate-700 transition-all duration-300 rounded-xl"
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
}

function StackCard({ item, index, visible, onLearnMore }) {
	const Icon = ICONS[index];
	const accent = ACCENTS[index];
	const [expanded, setExpanded] = useState(false);

	return (
		<div
			className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white transition-all duration-700 sm:hover:-translate-y-1.5 sm:hover:shadow-2xl sm:hover:shadow-blue-500/[0.08] ${
				visible
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-10"
			}`}
			style={{ transitionDelay: visible ? `${index * 80}ms` : "0ms" }}
		>
			<div
				className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
				style={{
					background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
				}}
			/>
			<div
				className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-all duration-700"
				style={{
					background: `radial-gradient(circle, ${accent.from}15, transparent)`,
				}}
			/>

			<button
				className="sm:hidden relative z-10 w-full flex items-center gap-3.5 p-4 text-left bg-transparent border-none cursor-pointer"
				onClick={() => setExpanded((e) => !e)}
			>
				<div
					className="w-9 h-9 rounded-lg flex items-center justify-center border flex-shrink-0"
					style={{
						borderColor: `${accent.from}20`,
						backgroundColor: `${accent.from}08`,
					}}
				>
					<Icon
						size={15}
						strokeWidth={1.8}
						style={{ color: accent.from }}
					/>
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="text-[15px] font-semibold uppercase tracking-tight text-slate-900 truncate">
						{item.title}
					</h3>
				</div>
				<span
					className="text-2xl font-bold leading-none tracking-tight select-none flex-shrink-0"
					style={{
						background: `linear-gradient(135deg, ${accent.from}30, ${accent.to}15)`,
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
					}}
				>
					{item.num}
				</span>
				<div
					className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
					style={{ backgroundColor: `${accent.from}10` }}
				>
					<ArrowRight
						size={12}
						style={{ color: accent.from }}
						className={`transition-transform duration-300 ${expanded ? "rotate-90" : ""}`}
					/>
				</div>
			</button>

			<div
				className="sm:hidden overflow-hidden transition-all duration-500 ease-in-out"
				style={{
					maxHeight: expanded ? "600px" : "0px",
					opacity: expanded ? 1 : 0,
				}}
			>
				<div className="px-4 pb-5 pt-1">
					<div
						className="px-4 py-3 rounded-xl mb-4 border"
						style={{
							backgroundColor: `${accent.from}06`,
							borderColor: `${accent.from}12`,
						}}
					>
						<p
							className="text-[11px] font-bold uppercase leading-relaxed"
							style={{ color: accent.from }}
						>
							{item.prob}
						</p>
					</div>
					<div className="flex items-center gap-3 mb-4">
						<div
							className="w-6 h-px flex-shrink-0"
							style={{
								background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
							}}
						/>
						<span className="text-[8px] font-black uppercase text-slate-500">
							Solution
						</span>
					</div>
					<p className="text-sm text-slate-500 leading-relaxed mb-4">
						{item.sol}
					</p>
					<button
						onClick={onLearnMore}
						className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
					>
						<span
							className="text-[10px] font-bold uppercase"
							style={{ color: accent.from }}
						>
							Learn more
						</span>
						<ArrowRight
							size={12}
							style={{ color: accent.from }}
						/>
					</button>
				</div>
			</div>

			<div className="hidden sm:flex relative z-10 p-8 md:p-10 flex-col min-h-[380px]">
				<div className="flex items-start justify-between mb-8">
					<div
						className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
						style={{
							borderColor: `${accent.from}20`,
							backgroundColor: `${accent.from}08`,
						}}
					>
						<Icon
							size={18}
							strokeWidth={1.8}
							style={{ color: accent.from }}
							className="transition-colors duration-500"
						/>
					</div>
					<span
						className="text-6xl font-bold leading-none tracking-tight select-none transition-all duration-500"
						style={{
							background: `linear-gradient(135deg, ${accent.from}18, ${accent.to}08)`,
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
						}}
					>
						{item.num}
					</span>
				</div>
				<h3 className="text-[17px] font-semibold uppercase tracking-tight mb-5 text-slate-900">
					{item.title}
				</h3>
				<div
					className="px-4 py-3 rounded-xl mb-5 border transition-all duration-500"
					style={{
						backgroundColor: `${accent.from}06`,
						borderColor: `${accent.from}12`,
					}}
				>
					<p
						className="text-[11px] font-bold uppercase leading-relaxed"
						style={{ color: accent.from }}
					>
						{item.prob}
					</p>
				</div>
				<div className="flex items-center gap-3 mb-5">
					<div
						className="h-px flex-shrink-0 transition-all duration-700 group-hover:w-10"
						style={{
							width: "24px",
							background: `linear-gradient(90deg, ${accent.from}, ${accent.to})`,
						}}
					/>
					<span className="text-[8px] font-black uppercase text-slate-500">
						Solution
					</span>
				</div>
				<p className="text-sm text-slate-500 leading-relaxed flex-1">
					{item.sol}
				</p>
				<button
					onClick={onLearnMore}
					className="mt-6 flex items-center gap-2 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 cursor-pointer bg-transparent border-none p-0"
				>
					<span
						className="text-[10px] font-bold uppercase"
						style={{ color: accent.from }}
					>
						Learn more
					</span>
					<ArrowRight
						size={12}
						style={{ color: accent.from }}
						className="transition-transform duration-300 group-hover:translate-x-1"
					/>
				</button>
			</div>
		</div>
	);
}

export default function GrowthStack() {
	const { ref, visible } = useScrollReveal(0);
	const [activeModal, setActiveModal] = useState(null);

	return (
		<section
			ref={ref}
			id="growth-engine"
			className="relative z-10 py-14 sm:py-20 md:py-28 lg:py-32 px-5 sm:px-8 md:px-12 lg:px-20"
			style={{ backgroundColor: "#ffffff" }}
		>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/[0.03] rounded-full blur-[120px]" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px]" />
			</div>
			<div className="relative z-10 flex flex-col md:flex-row md:items-start gap-10 sm:gap-16 md:gap-14 lg:gap-20">
				<div
					className={`md:w-[38%] md:sticky md:top-32 md:self-start transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
				>
					<div className="sec-heading mb-10 sm:mb-14">
						<span className="sub-title">
							Deploy Your Growth Stack
						</span>
						<h2 className="sec-title text-anim">
							The Technology Your Competition{" "}
							<span>Can't Buy, Build, or Replicate.</span>
						</h2>
					</div>
					<p
						className="desc mb-8 sm:mb-14"
						style={{ color: "var(--tj-color-text-body)" }}
					>
						Your customers make decisions at dozens of touchpoints. Miss one,
						and you lose the sale. The ONE Stack covers every single one: from
						first impression through closed transaction and repeat purchase.
						Built on proprietary technology. Managed by
						performance&nbsp;obsessives.
					</p>
					<QuoteButton />
				</div>
				<div className="md:w-[62%] grid sm:grid-cols-2 gap-4">
					{stack.map((s, i) => (
						<StackCard
							key={s.num}
							item={s}
							index={i}
							visible={visible}
							onLearnMore={() => setActiveModal(i)}
						/>
					))}
				</div>
			</div>
			{activeModal !== null && (
				<StackModal
					item={stack[activeModal]}
					index={activeModal}
					onClose={() => setActiveModal(null)}
				/>
			)}
		</section>
	);
}
