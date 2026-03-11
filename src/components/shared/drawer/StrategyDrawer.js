"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useDrawer } from "@/context/DrawerContext";
import {
	ChevronRight,
	Users,
	Target,
	Rocket,
	BarChart3,
	Zap,
	X,
} from "lucide-react";

const GOALS = [
	{ label: "More Leads", icon: Target, description: "Fill your pipeline with qualified prospects" },
	{ label: "More Sales", icon: BarChart3, description: "Convert traffic into measurable revenue" },
	{ label: "More Brand Awareness", icon: Rocket, description: "Dominate your market visibility" },
	{ label: "All of the Above", icon: Zap, description: "The complete growth engine" },
];

function StepTransition({ children, active }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (active) {
			const t = setTimeout(() => setMounted(true), 50);
			return () => clearTimeout(t);
		}
		setMounted(false);
	}, [active]);

	if (!active) return null;

	return (
		<div
			className="transition-all duration-500 ease-out"
			style={{
				opacity: mounted ? 1 : 0,
				transform: mounted ? "translateY(0)" : "translateY(12px)",
			}}
		>
			{children}
		</div>
	);
}

function FormInput({ label, type = "text", placeholder }) {
	return (
		<div>
			<label className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
				{label}
			</label>
			<input
				type={type}
				placeholder={placeholder}
				className="w-full bg-white/70 border border-slate-200 rounded-lg px-4 py-3 outline-none text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all duration-300"
				style={{ fontFamily: "var(--tj-ff-body)" }}
			/>
		</div>
	);
}

function NextButton({ onClick, label = "Next Step" }) {
	return (
		<button
			onClick={onClick}
			className="w-full group bg-slate-900 hover:bg-slate-800 text-white py-3.5 min-h-[44px] font-bold uppercase text-[10px] tracking-wide flex items-center justify-center gap-2 transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-slate-900/20 hover:-translate-y-0.5"
		>
			{label}
			<ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
		</button>
	);
}

function ConfettiBurst({ active }) {
	const [pieces, setPieces] = useState([]);
	const firedRef = useRef(false);

	useEffect(() => {
		if (active && !firedRef.current) {
			firedRef.current = true;
			const newPieces = Array.from({ length: 36 }, (_, i) => ({
				id: i,
				x: 20 + Math.random() * 60,
				delay: Math.random() * 0.3,
				duration: 1.2 + Math.random() * 1.4,
				rotation: Math.random() * 720 - 360,
				size: 4 + Math.random() * 5,
				drift: (Math.random() - 0.5) * 80,
				opacity: 0.6 + Math.random() * 0.4,
			}));
			setPieces(newPieces);
			setTimeout(() => setPieces([]), 3200);
		}
		if (!active) {
			firedRef.current = false;
		}
	}, [active]);

	if (pieces.length === 0) return null;

	const shapes = ["rounded-full", "rounded-sm", "rounded-none"];
	const tones = [
		"bg-slate-900", "bg-slate-700", "bg-slate-500",
		"bg-slate-400", "bg-slate-300", "bg-blue-400",
		"bg-blue-300", "bg-slate-800",
	];

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden">
			{pieces.map((p) => (
				<div
					key={p.id}
					className={`absolute ${shapes[p.id % shapes.length]} ${tones[p.id % tones.length]}`}
					style={{
						left: `${p.x}%`,
						top: "40%",
						width: p.size,
						height: p.id % 3 === 0 ? p.size : p.size * 0.5,
						opacity: 0,
						animation: `sd-confetti-fall ${p.duration}s ${p.delay}s ease-out forwards`,
						"--drift": `${p.drift}px`,
						"--rotation": `${p.rotation}deg`,
						"--start-opacity": p.opacity,
					}}
				/>
			))}
		</div>
	);
}

function BudgetStep({ budget, budgetPercent, onBudgetChange, onNext }) {
	const bonusUnlocked = budget >= 20000;
	const [showBonus, setShowBonus] = useState(false);
	const [justUnlocked, setJustUnlocked] = useState(false);
	const prevUnlocked = useRef(false);

	useEffect(() => {
		if (bonusUnlocked && !prevUnlocked.current) {
			setJustUnlocked(true);
			setTimeout(() => setShowBonus(true), 80);
			setTimeout(() => setJustUnlocked(false), 2800);
		}
		if (bonusUnlocked) setShowBonus(true);
		if (!bonusUnlocked) setShowBonus(false);
		prevUnlocked.current = bonusUnlocked;
	}, [bonusUnlocked]);

	const thresholdPercent = ((20000 - 5000) / (100000 - 5000)) * 100;

	return (
		<div className="flex flex-col text-center relative">
			<ConfettiBurst active={justUnlocked} />

			<h3 className="text-base font-semibold mb-1 text-slate-900 tracking-tight leading-[1.2]">
				Your Growth Investment
			</h3>
			<p className="text-xs text-slate-400 mb-7 font-light">
				Set a monthly range. We will work within your budget.
			</p>
			<div className="mb-5 px-1">
				<div className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6 tabular-nums">
					${budget.toLocaleString()}
					<span className="text-sm font-bold text-slate-400">+/mo</span>
				</div>
				<div className="relative mb-4 h-6 flex items-center">
					<div className="w-full h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
						<div
							className="h-full rounded-full transition-all duration-150"
							style={{
								width: `${budgetPercent}%`,
								background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)",
							}}
						/>
					</div>
					<div
						className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-blue-500 shadow-md shadow-blue-200/50 pointer-events-none transition-all duration-150"
						style={{ left: `${budgetPercent}%` }}
					/>
					<div
						className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none"
						style={{ left: `${thresholdPercent}%` }}
					>
						<div className={`w-1 h-3 rounded-full transition-all duration-300 ${
							bonusUnlocked ? "bg-slate-400" : "bg-slate-300"
						}`} />
					</div>
					<input
						type="range"
						min="5000"
						max="100000"
						step="5000"
						value={budget}
						onChange={(e) => onBudgetChange(Number(e.target.value))}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					/>
				</div>
				<div className="flex justify-between items-start">
					<span className="font-bold text-[9px] uppercase text-slate-300 tracking-wider">$5K</span>
					<span className="font-bold text-[9px] uppercase text-slate-300 tracking-wider">$100K+</span>
				</div>
			</div>

			<div
				className="transition-all duration-700 ease-out overflow-hidden"
				style={{
					maxHeight: showBonus ? "160px" : "0px",
					opacity: showBonus ? 1 : 0,
				}}
			>
				<div className="pt-2 pb-6 text-center">
					<p className={`text-[10px] font-black uppercase tracking-[0.25em] mb-2 transition-all duration-500 ${
						justUnlocked ? "text-slate-900 scale-105" : "text-slate-700"
					}`}>
						Priority Access Unlocked
					</p>
					<p className="text-sm font-semibold text-slate-900 leading-snug">
						Priority Onboarding + Custom Ad Concept
					</p>
					<p className="text-[11px] text-slate-600 mt-1">
						$2,500 value &mdash; included with your investment
					</p>
				</div>
			</div>

			{!bonusUnlocked && (
				<p className="text-[10px] text-slate-500 mb-6 font-medium tracking-wide transition-all duration-300">
					Slide past $20K to unlock priority access
				</p>
			)}

			<NextButton
				onClick={onNext}
				label={bonusUnlocked ? "Claim Priority Access" : "Continue"}
			/>
		</div>
	);
}

function StrategyForm() {
	const [step, setStep] = useState(1);
	const [budget, setBudget] = useState(5000);
	const budgetPercent = ((budget - 5000) / (100000 - 5000)) * 100;

	return (
		<div>
			<div className="px-1 py-2">
				<StepTransition active={step === 1}>
					<div className="flex flex-col">
						<h3 className="text-base font-semibold mb-1 text-center text-slate-900 tracking-tight leading-[1.2]">
							Tell us how to reach you
						</h3>
						<p className="text-xs text-slate-400 text-center mb-7 font-light">
							We will only use this to schedule your strategy session.
						</p>
						<div className="space-y-4">
							<FormInput label="Name" placeholder="Full Name" />
							<FormInput label="Email" type="email" placeholder="you@company.com" />
							<FormInput label="Phone" type="tel" placeholder="(555) 000-0000" />
							<div className="pt-1">
								<NextButton onClick={() => setStep(2)} />
							</div>
						</div>
					</div>
				</StepTransition>

				<StepTransition active={step === 2}>
					<div className="flex flex-col">
						<h3 className="text-base font-semibold mb-1 text-center text-slate-900 tracking-tight leading-[1.2]">
							What is your primary growth goal?
						</h3>
						<p className="text-xs text-slate-400 text-center mb-7 font-light">
							Select the one that matters most today.
						</p>
						<div className="grid grid-cols-1 gap-2.5">
							{GOALS.map((goal, i) => {
								const Icon = goal.icon;
								return (
									<button
										key={goal.label}
										onClick={() => setStep(3)}
										className="group p-4 text-left border border-slate-200/70 bg-white/50 hover:border-blue-300 hover:bg-white/80 hover:shadow-md hover:shadow-blue-100/40 transition-all duration-300 rounded-xl hover:-translate-y-0.5"
										style={{ animationDelay: `${i * 60}ms` }}
									>
										<div className="flex items-center gap-3.5">
											<div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-blue-100 group-hover:border-blue-200">
												<Icon size={16} className="text-blue-600" />
											</div>
											<div>
												<span className="font-bold uppercase text-[10px] text-slate-800 block mb-0.5 group-hover:text-blue-700 transition-colors">
													{goal.label}
												</span>
												<span className="text-[10px] text-slate-400 leading-relaxed group-hover:text-slate-500 transition-colors">
													{goal.description}
												</span>
											</div>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</StepTransition>

				<StepTransition active={step === 3}>
					<div className="flex flex-col">
						<h3 className="text-base font-semibold mb-1 text-center text-slate-900 tracking-tight leading-[1.2]">
							A few more details
						</h3>
						<p className="text-xs text-slate-400 text-center mb-7 font-light">
							Help us prepare the most relevant strategy for you.
						</p>
						<div className="space-y-4">
							<FormInput label="Company Name" placeholder="Your Company" />
							<FormInput label="Website URL" type="url" placeholder="https://..." />
							<div className="pt-1">
								<NextButton onClick={() => setStep(4)} />
							</div>
						</div>
					</div>
				</StepTransition>

				<StepTransition active={step === 4}>
					<BudgetStep
						budget={budget}
						budgetPercent={budgetPercent}
						onBudgetChange={setBudget}
						onNext={() => setStep(5)}
					/>
				</StepTransition>

				<StepTransition active={step === 5}>
					<div className="flex flex-col text-center py-6">
						<div className="flex flex-col items-center justify-center">
							<div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-6">
								<Users className="text-blue-600" size={26} />
							</div>
							<h3 className="text-base font-semibold uppercase tracking-tight mb-2 text-slate-900 leading-[1.2]">
								Book your call with Jon Epstein
							</h3>
							<p className="text-slate-400 text-xs font-light mb-8">
								Your dedicated performance strategist is ready for you.
							</p>
							<div className="bg-slate-50/80 border border-slate-200/60 p-6 rounded-xl w-full">
								<p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-3">
									Calendar Integration
								</p>
								<div className="grid grid-cols-3 gap-2 opacity-20">
									{[1, 2, 3, 4, 5, 6].map((i) => (
										<div key={i} className="h-8 bg-slate-300 rounded-md" />
									))}
								</div>
								<p className="text-[9px] text-slate-300 mt-3 font-light">
									[Integrated Scheduler Placeholder]
								</p>
							</div>
						</div>
					</div>
				</StepTransition>
			</div>

			{step > 1 && step < 5 && (
				<div className="mt-4 pt-4 border-t border-slate-200/60 flex justify-end">
					<button
						onClick={() => setStep(step - 1)}
						className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors"
					>
						Back
					</button>
				</div>
			)}
		</div>
	);
}

function DrawerProgress({ step }) {
	return (
		<div className="flex gap-1.5 mb-6">
			{[1, 2, 3, 4, 5].map((s) => (
				<div
					key={s}
					className={`h-1 rounded-full flex-1 transition-all duration-500 ${
						s <= step ? "bg-slate-900" : "bg-slate-200"
					}`}
				/>
			))}
		</div>
	);
}

export default function StrategyDrawer() {
	const { isOpen, closeDrawer } = useDrawer();
	const [portalRoot, setPortalRoot] = useState(null);
	const [animating, setAnimating] = useState(false);
	const [show, setShow] = useState(false);
	const panelRef = useRef(null);

	useEffect(() => {
		setPortalRoot(document.body);
	}, []);

	useEffect(() => {
		if (isOpen) {
			setAnimating(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setShow(true));
			});
		} else {
			setShow(false);
			const t = setTimeout(() => setAnimating(false), 400);
			return () => clearTimeout(t);
		}
	}, [isOpen]);

	const handleBackdropClick = useCallback((e) => {
		if (panelRef.current && !panelRef.current.contains(e.target)) {
			closeDrawer();
		}
	}, [closeDrawer]);

	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e) => {
			if (e.key === "Escape") closeDrawer();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isOpen, closeDrawer]);

	if (!portalRoot || !animating) return null;

	return createPortal(
		<div
			className="fixed inset-0 z-[9999] flex justify-end"
			onClick={handleBackdropClick}
			style={{ fontFamily: "var(--tj-ff-body)" }}
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 transition-all duration-400"
				style={{
					backgroundColor: show ? "rgba(5,17,41,0.55)" : "rgba(5,17,41,0)",
					backdropFilter: show ? "blur(4px)" : "blur(0px)",
				}}
			/>

			{/* Drawer panel */}
			<div
				ref={panelRef}
				className="relative w-full max-w-md h-full bg-white shadow-2xl shadow-slate-900/30 flex flex-col transition-transform duration-400 ease-out"
				style={{
					transform: show ? "translateX(0)" : "translateX(100%)",
				}}
			>
				{/* Header */}
				<div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
					<div>
						<h2 className="text-sm font-bold uppercase tracking-tight text-slate-900 leading-[1.2]" style={{ letterSpacing: "-0.025em" }}>
							Get a Quote
						</h2>
						<p className="text-[10px] text-slate-400 mt-0.5 font-light">
							Takes less than 2 minutes
						</p>
					</div>
					<button
						onClick={closeDrawer}
						className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
						aria-label="Close"
					>
						<X size={18} />
					</button>
				</div>

				{/* Scrollable body */}
				<div className="flex-1 overflow-y-auto px-6 py-6">
					<StrategyForm />
				</div>
			</div>

			<style>{`
				@keyframes sd-confetti-fall {
					0% {
						opacity: var(--start-opacity);
						transform: translateY(0) translateX(0) rotate(0deg) scale(1);
					}
					15% {
						opacity: var(--start-opacity);
					}
					100% {
						opacity: 0;
						transform: translateY(120px) translateX(var(--drift)) rotate(var(--rotation)) scale(0.3);
					}
				}
			`}</style>
		</div>,
		portalRoot
	);
}
