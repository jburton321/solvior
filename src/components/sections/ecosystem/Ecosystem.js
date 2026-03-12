"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import {
	ArrowRight,
	Search,
	Smartphone,
	MonitorSpeaker,
	Zap,
	RotateCcw,
	Shield,
	Palette,
	Users,
	Target,
	Code,
	ChevronDown,
	X,
} from "lucide-react";
import QuoteButton from "@/components/shared/buttons/QuoteButton";
import useScrollReveal from "@/hooks/useScrollReveal";
import WebGLRipple from "./WebGLRipple";

// ─── Dashboard accent colors (for lightbox) ─────────────────────────────────

const DASHBOARD_ACCENTS = {
	"PAID SEARCH": "#0ea5e9",
	"PAID SOCIAL": "#0ea5e9",
	"PROGRAMMATIC": "#10b981",
	"MARKETING AUTOMATION": "#f59e0b",
	"REMARKETING & RETARGETING": "#ef4444",
	"ONLINE REPUTATION": "#10b981",
	"BRANDING & PRODUCT DEV": "#0ea5e9",
	"SOCIAL COMMUNITY": "#8b5cf6",
	"CRO": "#f59e0b",
	"SOFTWARE DEV & API": "#0ea5e9",
};

function getAccent(title) {
	return DASHBOARD_ACCENTS[title] || "#0ea5e9";
}

// ─── Service Node Data ───────────────────────────────────────────────────────

const LEFT_NODES = [
	{
		title: "PAID SEARCH",
		text: "Captured before competitors reach\u00A0them.",
		detail: "Dominate search results with Google & Microsoft paid campaigns. Reach customers actively searching for solutions. Start driving qualified leads today.",
		icon: <Search className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "+142%", label: "ROAS Increase", bars: [30, 42, 55, 48, 68, 82, 95] },
	},
	{
		title: "PAID SOCIAL",
		text: "Thumb-stopping creative that\u00A0converts.",
		detail: "Scale sales with Meta advertising. Scroll-stopping creative + precision targeting = conversions. Reach billions on Facebook, Instagram, and beyond.",
		icon: <Smartphone className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "+88%", label: "Conv. Rate", bars: [25, 38, 35, 52, 60, 72, 88] },
	},
	{
		title: "PROGRAMMATIC",
		text: "Continuous ROI\u00A0optimization.",
		detail: "Access ad inventory across the entire web. Real-time bidding + smart automation = maximum reach. Buy smarter, not harder.",
		icon: <MonitorSpeaker className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "3.2x", label: "Reach Scale", bars: [40, 55, 50, 65, 75, 80, 92] },
	},
	{
		title: "MARKETING AUTOMATION",
		text: "Instant lead\u00A0follow-up.",
		detail: "Nurture leads automatically. Send the right message at the right time. Personalize customer journeys from first click to conversion.",
		icon: <Zap className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "-67%", label: "Response Time", bars: [90, 78, 65, 55, 42, 35, 28] },
	},
	{
		title: "REMARKETING & RETARGETING",
		text: "Bringing visitors back to\u00A0finish.",
		detail: "Bring back window shoppers. Serve personalized ads to visitors who left. Turn abandonment into conversions with strategic retargeting.",
		icon: <RotateCcw className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "+54%", label: "Return Rate", bars: [20, 35, 45, 50, 62, 70, 78] },
	},
];

const RIGHT_NODES = [
	{
		title: "ONLINE REPUTATION",
		text: "Social proof fuels your\u00A0funnel.",
		detail: "Control your online narrative. Monitor reviews, respond professionally, build trust. Protect and enhance your brand reputation across all platforms.",
		icon: <Shield className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "4.8★", label: "Avg Rating", bars: [60, 65, 70, 72, 78, 85, 92] },
	},
	{
		title: "BRANDING & PRODUCT DEV",
		text: "Identity worth\u00A0promoting.",
		detail: "Stand out with thumb-stopping ads. Conversion-centered design that moves users from scrollers to buyers. Persuasive creative that actually converts.",
		icon: <Palette className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "+96%", label: "Brand Recall", bars: [22, 38, 48, 58, 72, 85, 96] },
	},
	{
		title: "SOCIAL COMMUNITY",
		text: "Engagement into\u00A0revenue.",
		detail: "Your comment sections turn from noise into engagement, and engagement into revenue. Active community management in your brand voice.",
		icon: <Users className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "+210%", label: "Engagement", bars: [18, 30, 45, 55, 70, 82, 95] },
	},
	{
		title: "CRO",
		text: "Tests to fix drop-off\u00A0points.",
		detail: "We identify exactly where your visitors drop off and build the test to fix it. More revenue from the traffic you already have.",
		icon: <Target className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "-42%", label: "CPL Reduction", bars: [88, 75, 68, 60, 52, 48, 38] },
	},
	{
		title: "SOFTWARE DEV & API",
		text: "Eliminating manual\u00A0processes.",
		detail: "Get live faster. Seamless API integrations with any platform. Stop development delays. Launch campaigns three weeks instead of three months.",
		proprietary: true,
		icon: <Code className="w-5 h-5" strokeWidth={2} />,
		chart: { metric: "3wk", label: "Time to Live", bars: [92, 80, 65, 50, 38, 28, 20] },
	},
];

const ALL_NODES = [...LEFT_NODES, ...RIGHT_NODES];

// ─── Wire / Layout Constants ─────────────────────────────────────────────────

const NODE_YS = [50, 145, 240, 335, 430];
const HUB_X = 500;
const HUB_Y = 240;

function buildWires(leftEdge, rightEdge) {
	return [
		...NODE_YS.map((y, i) => ({
			d: `M${HUB_X},${HUB_Y} C${HUB_X - 80},${HUB_Y} ${leftEdge + 30},${y} ${leftEdge},${y}`,
			idx: i,
		})),
		...NODE_YS.map((y, i) => ({
			d: `M${HUB_X},${HUB_Y} C${HUB_X + 80},${HUB_Y} ${rightEdge - 30},${y} ${rightEdge},${y}`,
			idx: i + 5,
		})),
	];
}

const AUTO_ORDER = [0, 5, 1, 6, 2, 7, 3, 8, 4, 9];
const AUTO_DELAY = 1800;
const PAUSE_AFTER_MANUAL = 3000;

// ─── Ecosystem Bot (animated mascot) ─────────────────────────────────────────

const LEFT_EYE = { cx: 312.661, cy: 267.993 };
const RIGHT_EYE = { cx: 580.661, cy: 267.993 };
const EYE_R = 31.267;
const MAX_OFFSET = 14;

const CARD_DIRS = {
	0: { x: -1, y: -0.7 },
	1: { x: -1, y: -0.35 },
	2: { x: -1, y: 0 },
	3: { x: -1, y: 0.35 },
	4: { x: -1, y: 0.7 },
	5: { x: 1, y: -0.7 },
	6: { x: 1, y: -0.35 },
	7: { x: 1, y: 0 },
	8: { x: 1, y: 0.35 },
	9: { x: 1, y: 0.7 },
};

function EcosystemBot({ hovered, className }) {
	const containerRef = useRef(null);
	const [mouseDir, setMouseDir] = useState({ x: 0, y: 0 });
	const [blinking, setBlinking] = useState(false);

	useEffect(() => {
		const onMove = (e) => {
			const el = containerRef.current;
			if (!el) return;
			const r = el.getBoundingClientRect();
			const dx = e.clientX - (r.left + r.width / 2);
			const dy = e.clientY - (r.top + r.height / 2);
			const d = Math.sqrt(dx * dx + dy * dy) || 1;
			const n = Math.min(d / 500, 1);
			setMouseDir({ x: (dx / d) * n, y: (dy / d) * n });
		};
		window.addEventListener("mousemove", onMove);
		return () => window.removeEventListener("mousemove", onMove);
	}, []);

	useEffect(() => {
		let timeout;
		const scheduleBlink = () => {
			timeout = setTimeout(() => {
				setBlinking(true);
				setTimeout(() => setBlinking(false), 140);
				scheduleBlink();
			}, 2800 + Math.random() * 2200);
		};
		scheduleBlink();
		return () => clearTimeout(timeout);
	}, []);

	const dir = hovered !== null ? (CARD_DIRS[hovered] ?? mouseDir) : mouseDir;
	const px = dir.x * MAX_OFFSET;
	const py = dir.y * MAX_OFFSET * 0.4;

	return (
		<div ref={containerRef} className={className}>
			<svg viewBox="0 0 894 715" className="w-full h-full">
				<path d="M285.241 536C191.039 536 178.667 430.431 178.667 357.334V178.667C105.57 178.667 0 191.017 0 285.242V357.334C0 456.002 79.998 536 178.667 536H285.241Z" fill="#15C1FF" />
				<path d="M0 285.241C0 191.039 105.57 178.667 178.667 178.667H714.667C714.667 105.57 702.294 0 608.092 0H178.667C79.998 0 0 79.998 0 178.667V285.241Z" fill="#373299" />
				<path d="M608.1 0C702.302 0 714.674 105.57 714.674 178.667V357.333C787.771 357.333 893.341 322.627 893.341 228.425V178.667C893.341 79.998 813.343 0 714.674 0H608.1Z" fill="#F0264F" />
				<path d="M893.331 228.419C893.331 322.621 787.761 357.327 714.664 357.327H178.664C178.664 430.424 191.037 535.994 285.239 535.994H714.664C813.333 535.994 893.331 455.996 893.331 357.327V228.419Z" fill="#2F333D" />
				<path d="M446.667 714.667V536H290.334L446.667 714.667Z" fill="#2F333D" />
				<g style={{ transform: `translate(${px}px, ${py}px)`, transition: "transform 0.25s ease-out" }}>
					<ellipse cx={LEFT_EYE.cx} cy={LEFT_EYE.cy} rx={EYE_R} ry={blinking ? 4 : EYE_R} fill="#1F1E27" style={{ transition: "ry 0.1s ease-in-out" }} />
					<ellipse cx={RIGHT_EYE.cx} cy={RIGHT_EYE.cy} rx={EYE_R} ry={blinking ? 4 : EYE_R} fill="#1F1E27" style={{ transition: "ry 0.1s ease-in-out" }} />
				</g>
			</svg>
		</div>
	);
}

// ─── Modal Chart (Hero-style animated bar chart) ────────────────────────────

const CHART_DRAW = 1400;
const CHART_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function ModalChart({ chart }) {
	const [drawn, setDrawn] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setDrawn(true), 200);
		return () => clearTimeout(t);
	}, []);

	const maxH = Math.max(...chart.bars);

	return (
		<div
			className="rounded-2xl border border-white/40 p-5 backdrop-blur-xl"
			style={{ background: "rgba(255,255,255,0.55)" }}
		>
			<div className="flex justify-between items-center mb-1">
				<span className="text-[10px] font-black uppercase tracking-wide" style={{ color: "#364052" }}>
					{chart.label}
				</span>
				<div
					className="flex items-center gap-1"
					style={{
						opacity: drawn ? 1 : 0,
						transition: "opacity 500ms ease 600ms",
					}}
				>
					<div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#10b981" }} />
					<span className="text-[9px] font-bold" style={{ color: "#10b981" }}>Live</span>
				</div>
			</div>
			<div
				className="flex items-baseline gap-1 mb-4"
				style={{
					opacity: drawn ? 1 : 0,
					transition: "opacity 600ms ease 300ms",
				}}
			>
				<span className="text-xl font-extrabold tracking-tighter tabular-nums" style={{ color: "#051229" }}>
					{chart.metric}
				</span>
			</div>
			<div className="flex items-end justify-between gap-2 h-20 mb-2">
				{chart.bars.map((val, i) => {
					const pct = (val / maxH) * 100;
					const isMax = val === maxH;
					return (
						<div key={i} className="flex-1 flex flex-col items-center gap-1.5">
							<div className="w-full h-20 flex items-end">
								<div
									className="w-full rounded-md"
									style={{
										height: drawn ? `${pct}%` : "4%",
										background: isMax
											? "linear-gradient(180deg, #0475FF 0%, #3b82f6 100%)"
											: "linear-gradient(180deg, #e2e8f0 0%, #cbd5e1 100%)",
										transition: `height ${CHART_DRAW}ms ease-out ${i * 70}ms`,
									}}
								/>
							</div>
							<span className="text-[7px] font-bold uppercase" style={{ color: "#94a3b8" }}>
								{CHART_LABELS[i]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// ─── Ecosystem Lightbox ──────────────────────────────────────────────────────

function EcosystemLightbox({ node, onClose }) {
	const overlayRef = useRef(null);
	const [isClosing, setIsClosing] = useState(false);

	useEffect(() => {
		const onKey = (e) => {
			if (e.key === "Escape") handleClose();
		};
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, []);

	const handleClose = () => {
		setIsClosing(true);
		setTimeout(onClose, 250);
	};

	const handleOverlayClick = (e) => {
		if (e.target === overlayRef.current) handleClose();
	};

	return createPortal(
		<div
			ref={overlayRef}
			onClick={handleOverlayClick}
			className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
			style={{
				backgroundColor: isClosing ? "rgba(5, 18, 41, 0)" : "rgba(5, 18, 41, 0.7)",
				backdropFilter: isClosing ? "blur(0px)" : "blur(10px)",
				transition: "background-color 0.25s ease, backdrop-filter 0.25s ease",
			}}
		>
			<div
				className={`w-full max-w-md overflow-hidden ${
					isClosing ? "eco-modal-exit" : "eco-modal-enter"
				}`}
				style={{ borderRadius: 50 }}
			>
				{/* Dark header with icon + title */}
				<div
					className="relative px-7 sm:px-9 pt-7 sm:pt-9 pb-5"
					style={{ backgroundColor: "#051229" }}
				>
					{/* Subtle radial glow */}
					<div
						className="absolute inset-0 opacity-30 pointer-events-none"
						style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(4,117,255,0.4) 0%, transparent 70%)" }}
					/>

					<button
						onClick={handleClose}
						className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-colors"
					>
						<X size={14} className="text-white/60" />
					</button>

					<div className="relative flex items-center gap-4 mb-4">
						<div
							className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
							style={{ backgroundColor: "#0475FF" }}
						>
							{node.icon}
						</div>
						<div>
							<span
								className="text-[10px] font-bold uppercase block mb-1 tracking-[0.12em]"
								style={{ color: "#0475FF" }}
							>
								Channel Overview
							</span>
							<h3
								className="text-lg sm:text-xl font-bold uppercase leading-tight tracking-tight"
								style={{ color: "#f7f7f7", letterSpacing: "-0.04em" }}
							>
								{node.title}
							</h3>
						</div>
					</div>
				</div>

				{/* White body */}
				<div
					className="px-7 sm:px-9 py-6 sm:py-7"
					style={{ backgroundColor: "#f7f7f7" }}
				>
					<p
						className="text-sm sm:text-[15px] leading-relaxed"
						style={{ color: "#364052" }}
					>
						{node.detail}
					</p>

					{node.chart && (
						<div className="mt-5">
							<ModalChart chart={node.chart} />
						</div>
					)}

					<div className="mt-5 [&_.tj-primary-btn]:w-full">
						<QuoteButton />
					</div>

					{node.proprietary && (
						<div
							className="mt-5 inline-flex items-center gap-2 px-3.5 py-2 rounded-full"
							style={{ backgroundColor: "#dfecfd" }}
						>
							<span className="relative flex h-2 w-2">
								<span
									className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
									style={{ backgroundColor: "#0475FF" }}
								/>
								<span
									className="relative inline-flex rounded-full h-2 w-2"
									style={{ backgroundColor: "#0475FF" }}
								/>
							</span>
							<span
								className="text-[10px] font-black uppercase tracking-[0.08em]"
								style={{ color: "#0475FF" }}
							>
								Proprietary Technology
							</span>
						</div>
					)}
				</div>
			</div>
		</div>,
		document.body
	);
}

// ─── Node Column (Desktop) ───────────────────────────────────────────────────

function NodeColumn({ nodes, side, visible, hovered, onEnter, onLeave, onClick, indexOffset }) {
	const isLeft = side === "left";

	return (
		<div className="w-[280px] xl:w-[340px] flex-shrink-0 flex flex-col gap-1.5 relative z-10">
			{nodes.map((n, i) => {
				const idx = indexOffset + i;
				const active = hovered === idx;

				return (
					<div
						key={n.title}
						className={`relative rounded-xl overflow-hidden transition-all duration-500 cursor-pointer flex-1 group border backdrop-blur-md ${
							active
								? `shadow-lg shadow-blue-500/10 scale-[1.03] border-white/40 ${isLeft ? "-translate-x-2" : "translate-x-2"}`
								: "border-white/30 shadow-sm hover:shadow-md hover:border-white/50 hover:scale-[1.02]"
						} ${
							visible
								? "opacity-100 translate-x-0"
								: `opacity-0 ${isLeft ? "-translate-x-12" : "translate-x-12"}`
						}`}
						style={{ transitionDelay: visible ? `${idx * 100}ms` : "0ms" }}
						onMouseEnter={() => onEnter(idx)}
						onMouseLeave={onLeave}
						onClick={() => onClick(idx)}
					>
						<div
							className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}
							style={{ background: "linear-gradient(135deg, rgba(2,51,197,0.04) 0%, transparent 100%)" }}
						/>
						<div
							className={`absolute ${isLeft ? "left-0" : "right-0"} top-0 bottom-0 w-[3px] transition-all duration-500 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
							style={{ background: "linear-gradient(180deg, #0233C5 0%, #3b82f6 100%)" }}
						/>
						<div className="relative px-4 py-3 xl:px-5 xl:py-4 flex flex-col justify-center h-full transition-colors duration-300" style={{ background: "rgba(255,255,255,0.35)" }}>
							<div className="flex items-center gap-2.5 mb-1">
								<div className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-500 ${
									active
										? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
										: "bg-blue-50 text-blue-600 group-hover:bg-blue-100"
								}`}>
									{n.icon}
								</div>
								<h3 className="font-semibold text-xs xl:text-[13px] text-slate-900 uppercase leading-tight flex-1">
									{n.title}
								</h3>
								<ArrowRight
									className={`w-3.5 h-3.5 flex-shrink-0 text-blue-600 transition-all duration-300 ${
										active ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
									}`}
									strokeWidth={2.5}
								/>
							</div>
							<p className="text-xs xl:text-[12px] leading-relaxed transition-colors duration-300 text-slate-500">{n.text}</p>
						</div>
					</div>
				);
			})}
		</div>
	);
}

// ─── Desktop Ecosystem ───────────────────────────────────────────────────────

function DesktopEcosystem({ visible, hovered, onEnter, onLeave, onClick }) {
	const containerRef = useRef(null);
	const [wires, setWires] = useState(() => buildWires(320, 680));

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;
		const observer = new ResizeObserver((entries) => {
			const w = entries[0].contentRect.width;
			if (w > 0) {
				const left = (340 / w) * 1000;
				const right = ((w - 340) / w) * 1000;
				setWires(buildWires(left, right));
			}
		});
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	return (
		<div className="hidden lg:block">
			<div className="relative" ref={containerRef}>
				<svg
					className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
					viewBox="0 0 1000 480"
					preserveAspectRatio="none"
				>
					{wires.map((w) => (
						<g key={w.idx}>
							<path
								d={w.d}
								fill="none"
								stroke="#0233C5"
								strokeWidth={hovered === w.idx ? 2 : 1}
								opacity={hovered === null ? 0.08 : hovered === w.idx ? 0.35 : 0.03}
								style={{ transition: "all 0.4s ease" }}
							/>
							<circle r="2" fill="#0233C5" opacity={hovered === w.idx ? 0.5 : 0.12}>
								<animateMotion
									dur={`${2.5 + (w.idx % 5) * 0.4}s`}
									repeatCount="indefinite"
									path={w.d}
								/>
							</circle>
						</g>
					))}
				</svg>

				<div className="flex items-stretch justify-between relative z-[2]">
					<NodeColumn
						nodes={LEFT_NODES}
						side="left"
						visible={visible}
						hovered={hovered}
						onEnter={onEnter}
						onLeave={onLeave}
						onClick={onClick}
						indexOffset={0}
					/>

					{/* Spacer: hub is positioned at section center via absolute */}
					<div className="w-[240px] xl:w-[280px] flex-shrink-0 min-h-[440px]" aria-hidden="true" />

					<NodeColumn
						nodes={RIGHT_NODES}
						side="right"
						visible={visible}
						hovered={hovered}
						onEnter={onEnter}
						onLeave={onLeave}
						onClick={onClick}
						indexOffset={5}
					/>
				</div>
			</div>
		</div>
	);
}

// ─── Mobile Ecosystem ────────────────────────────────────────────────────────

function MobileEcosystem({ visible, onClick }) {
	const [expandedIdx, setExpandedIdx] = useState(null);

	const handleTap = useCallback((idx) => {
		setExpandedIdx((prev) => (prev === idx ? null : idx));
	}, []);

	return (
		<div className="relative">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 relative z-[2]">
				{ALL_NODES.map((n, i) => {
					const isExpanded = expandedIdx === i;

					return (
						<div
							key={n.title}
							className={`relative rounded-xl overflow-hidden border backdrop-blur-md shadow-sm transition-all duration-300 ${
								isExpanded ? "border-white/40 shadow-md" : "border-white/30"
							} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
							style={{ transitionDelay: visible ? `${i * 50}ms` : "0ms" }}
						>
							<div
								className={`absolute left-0 top-0 bottom-0 w-[3px] transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`}
								style={{ background: "linear-gradient(180deg, #0233C5 0%, #3b82f688 100%)" }}
							/>
							<div className="p-3 sm:p-4" style={{ background: "rgba(255,255,255,0.35)" }}>
								<button
									type="button"
									className="w-full text-left"
									onClick={() => handleTap(i)}
								>
									<div className="flex items-center gap-2.5 sm:gap-3">
										<div className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg transition-all duration-300 flex-shrink-0 ${
											isExpanded ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-blue-50 text-blue-600"
										}`}>
											{n.icon}
										</div>
										<h3 className="font-semibold text-xs sm:text-[13px] text-slate-900 uppercase leading-tight flex-1">
											{n.title}
										</h3>
										<ChevronDown
											size={18}
											className={`text-slate-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
										/>
									</div>
									<p className="text-slate-500 text-xs leading-relaxed mt-2 sm:mt-2.5">{n.text}</p>
								</button>

								{/* Expanded: full detail + CTA to open lightbox */}
								<div
									className="overflow-hidden"
									style={{
										maxHeight: isExpanded ? "400px" : "0px",
										opacity: isExpanded ? 1 : 0,
										transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease",
									}}
								>
									<div className="pt-3 mt-3 border-t border-slate-200/60 space-y-3">
										<p className="text-slate-600 text-sm leading-relaxed">{n.detail}</p>
										{n.proprietary && (
											<div className="flex items-center gap-2">
												<span className="relative flex h-2 w-2">
													<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0ea5e9] opacity-75" />
													<span className="relative inline-flex rounded-full h-2 w-2 bg-[#0ea5e9]" />
												</span>
												<span className="text-[10px] font-black uppercase text-blue-600">Proprietary Technology</span>
											</div>
										)}
										<button
											type="button"
											onClick={(e) => { e.stopPropagation(); onClick(i); }}
											className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide"
										>
											View full details →
										</button>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

// ─── Main Export ─────────────────────────────────────────────────────────────

function EcoBgCharts({ visible }) {
	/*
	 * Depth model — XY plane perspective.
	 * depth(x,y) = y×0.7 + centerProximity(x)×0.3
	 * depth ∈ [0,1], 0 = furthest, 1 = nearest.
	 */
	const computeDepth = (x, y) => {
		const centerProximity = 1 - Math.abs(x - 0.5) * 2;
		return Math.min(1, Math.max(0, y * 0.7 + centerProximity * 0.3));
	};

	const RINGS = [
		{ x: 0.30, y: 0.12, size: 120, delay: 0 },
		{ x: 0.32, y: 0.55, size: 90, delay: 1.2 },
		{ x: 0.36, y: 0.80, size: 100, delay: 2.4 },
		{ x: 0.70, y: 0.10, size: 110, delay: 0.6 },
		{ x: 0.66, y: 0.52, size: 80, delay: 1.8 },
		{ x: 0.68, y: 0.84, size: 95, delay: 3.0 },
		{ x: 0.40, y: 0.35, size: 70, delay: 2.0 },
		{ x: 0.62, y: 0.28, size: 75, delay: 0.8 },
	];

	return (
		<div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
			{/* Pulsing rings — depth-sorted */}
			{RINGS
				.map((r) => ({ ...r, depth: computeDepth(r.x, r.y) }))
				.sort((a, b) => a.depth - b.depth)
				.map((ring, i) => {
					const ringScale = 0.55 + ring.depth * 0.55;
					const ringOpacity = 0.12 + ring.depth * 0.28;
					const dotSize = 3 + ring.depth * 4;
					return (
						<div
							key={`pulse-${i}`}
							className="absolute"
							style={{
								top: `${ring.y * 100}%`,
								left: `${ring.x * 100}%`,
								width: ring.size * ringScale,
								height: ring.size * ringScale,
								transform: "translate(-50%, -50%)",
								opacity: visible ? ringOpacity : 0,
								transition: `opacity 1s ease ${ring.delay + 0.5}s`,
								zIndex: Math.round(ring.depth * 10),
								filter: `brightness(${(0.7 + ring.depth * 0.35).toFixed(2)})`,
							}}
						>
							{[0, 1, 2].map((r) => (
								<div
									key={r}
									className="absolute inset-0 rounded-full border border-blue-400/20"
									style={{
										animation: visible ? `ecoPulseRing 3s ease-out ${ring.delay + r * 0.8}s infinite` : "none",
										borderWidth: ring.depth > 0.5 ? 1.5 : 1,
									}}
								/>
							))}
							<div
								className="absolute rounded-full"
								style={{
									width: dotSize,
									height: dotSize,
									top: "50%",
									left: "50%",
									transform: "translate(-50%, -50%)",
									backgroundColor: "#0475FF",
									opacity: 0.25 + ring.depth * 0.25,
								}}
							/>
						</div>
					);
				})}
		</div>
	);
}

export default function Ecosystem() {
	const { ref, visible } = useScrollReveal(0);
	const [activeIdx, setActiveIdx] = useState(null);
	const [lightboxIdx, setLightboxIdx] = useState(null);
	const autoStep = useRef(0);
	const pauseUntil = useRef(0);

	useEffect(() => {
		if (!visible) return;
		const id = setInterval(() => {
			if (Date.now() < pauseUntil.current) return;
			setActiveIdx(AUTO_ORDER[autoStep.current % AUTO_ORDER.length]);
			autoStep.current += 1;
		}, AUTO_DELAY);
		return () => clearInterval(id);
	}, [visible]);

	const handleEnter = useCallback((idx) => {
		setActiveIdx(idx);
	}, []);

	const handleLeave = useCallback(() => {
		setActiveIdx(null);
		pauseUntil.current = Date.now() + PAUSE_AFTER_MANUAL;
	}, []);

	const handleClick = useCallback((idx) => {
		setLightboxIdx(idx);
	}, []);

	return (
		<section id="ecosystem" ref={ref} className="relative py-12 sm:py-16 overflow-hidden section-px" style={{ backgroundColor: "#F8FAFC" }}>
			{/* Ripple: full section background */}
			<div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} style={{ zIndex: 0 }}>
				<WebGLRipple visible={visible} />
			</div>
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-blue-500/[0.02] rounded-full blur-[140px]" />
				<div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-sky-500/[0.015] rounded-full blur-[120px]" />
				<div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/[0.015] rounded-full blur-[100px]" />
			</div>

			{/* Header — always in flow */}
			<div className={`relative z-20 text-center pointer-events-none transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
				<div className="sec-heading mb-0">
					<span className="sub-title">Your Channels, Fully Managed</span>
					<h2 className="sec-title text-anim">
						Everywhere Your Customers{" "}
						<br />
						<span>Make Decisions, We&apos;re There.</span>
					</h2>
				</div>
			</div>

			{/* Desktop: centered layout with fixed height */}
			<div className="hidden lg:block relative z-10">
				<div className="min-h-[520px] flex items-center justify-center" aria-hidden="true" />
				<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full min-h-[480px] section-px">
					<div className="relative w-full h-full min-h-[480px]">
						<EcoBgCharts visible={visible} />
						<DesktopEcosystem visible={visible} hovered={activeIdx} onEnter={handleEnter} onLeave={handleLeave} onClick={handleClick} />
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
							<div className="flex flex-col items-center justify-center text-center w-[220px] h-[220px] xl:w-[260px] xl:h-[260px] rounded-full border border-white/30 backdrop-blur-md shadow-sm" style={{ background: "rgba(255,255,255,0.35)" }}>
								<EcosystemBot hovered={activeIdx} className="w-[90px] xl:w-[110px] mb-2" />
								<span className="text-[8px] font-black uppercase text-blue-600">Fully Managed</span>
								<h4 className="text-lg xl:text-xl font-bold uppercase tracking-tight text-slate-900 mt-1.5 leading-tight">CHANNELS</h4>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile: flow-based layout — hub then cards, section grows with content */}
			<div className="lg:hidden relative z-10 pt-6 sm:pt-8 pb-4">
				<div className="hidden sm:block">
					<EcoBgCharts visible={visible} />
				</div>
				{/* Hub */}
				<div className="flex justify-center mb-6 sm:mb-8">
					<div className="flex flex-col items-center justify-center text-center w-[120px] h-[120px] sm:w-[170px] sm:h-[170px] rounded-full border border-white/30 backdrop-blur-md shadow-sm" style={{ background: "rgba(255,255,255,0.35)" }}>
						<EcosystemBot hovered={null} className="w-[50px] sm:w-[75px] mb-1.5" />
						<span className="text-[7px] font-black uppercase text-blue-600">Fully Managed</span>
						<h4 className="text-sm sm:text-base font-bold uppercase tracking-tight text-slate-900 mt-1 leading-tight">CHANNELS</h4>
					</div>
				</div>
				<MobileEcosystem visible={visible} onClick={handleClick} />
			</div>

			{lightboxIdx !== null && (
				<EcosystemLightbox
					node={ALL_NODES[lightboxIdx]}
					onClose={() => setLightboxIdx(null)}
				/>
			)}

			<style>{`
				@keyframes ecoModalIn {
					from { opacity: 0; transform: scale(0.92) translateY(12px); }
					to { opacity: 1; transform: scale(1) translateY(0); }
				}
				@keyframes ecoModalOut {
					from { opacity: 1; transform: scale(1) translateY(0); }
					to { opacity: 0; transform: scale(0.92) translateY(12px); }
				}
				.eco-modal-enter {
					animation: ecoModalIn 0.25s ease-out;
				}
				.eco-modal-exit {
					animation: ecoModalOut 0.2s ease-in forwards;
				}
				@keyframes ecoPulseRing {
					0% { transform: scale(0.3); opacity: 0.6; }
					100% { transform: scale(1); opacity: 0; }
				}
			`}</style>
		</section>
	);
}
