"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import QuoteButton from "@/components/shared/buttons/QuoteButton";

const EXPERTISE = [
	{
		num: "01",
		title: "Paid Media",
		sub: "Precision-Engineered Campaigns That Outperform.",
		text: "Precision-engineered campaigns across search, social, programmatic and connected TV. We manage millions in media spend with real-time optimization, proprietary bidding algorithms and audience intelligence that consistently outperforms industry\u00A0benchmarks.",
		stat: "Millions in media spend managed with real-time\u00A0optimization.",
	},
	{
		num: "02",
		title: "Creative",
		sub: "Performance Creative Built on Data, Not Guesswork.",
		text: "Our in-house team produces conversion-focused assets \u2014 from ad creative and landing pages to full-funnel video \u2014 backed by multivariate testing and real-time analytics in myONE\u00A0Dash.",
		stat: "Multivariate testing and real-time analytics in myONE\u00A0Dash.",
	},
	{
		num: "03",
		title: "MarTech",
		sub: "Every Touchpoint Tracked, Measured and Optimized.",
		text: "We architect and integrate the marketing technology stack your growth demands \u2014 CRM, CDP, attribution, automation and custom API connections \u2014 so every touchpoint is tracked, measured and\u00A0optimized.",
		stat: "CRM, CDP, attribution, automation & custom API\u00A0integrations.",
	},
	{
		num: "04",
		title: "CRO",
		sub: "Systematic Experimentation Across Your Entire Funnel.",
		text: "We identify friction, run structured A/B and multivariate tests, and deploy data-backed changes that lift conversion rates and lower acquisition\u00A0costs.",
		stat: "Data-backed changes that lift conversion rates and lower\u00A0costs.",
	},
	{
		num: "05",
		title: "E-Commerce",
		sub: "End-to-End Growth for Brands Scaling Fast.",
		text: "Product feed optimization, dynamic retargeting, checkout UX, lifecycle automation and revenue attribution. We\u2019ve driven hundreds of thousands of transactions for brands scaling\u00A0fast.",
		stat: "Hundreds of thousands of e-commerce transactions\u00A0driven.",
	},
];

function ActivePanel({ step }) {
	return (
		<div className="skill-active-panel">
			<div className="skill-active-panel__glass" />
			<div className="skill-active-panel__inner">
				<div>
					<div className="skill-active-panel__header">
						<span className="skill-active-panel__num">{step.num}</span>
						<h3 className="skill-active-panel__title">{step.title}</h3>
					</div>
					<p className="skill-active-panel__sub">{step.sub}</p>
					<p className="skill-active-panel__text">{step.text}</p>
					<div className="mt-6">
						<QuoteButton className="white-btn" />
					</div>
				</div>
				<div>
					<div className="skill-active-panel__stat-row">
						<p className="skill-active-panel__stat">{step.stat}</p>
					</div>
					<div className="skill-active-panel__progress">
						<div className="skill-active-panel__progress-bar" />
					</div>
				</div>
			</div>
		</div>
	);
}

function CollapsedPanel({ step }) {
	return (
		<div className="skill-collapsed-panel">
			<span className="skill-collapsed-panel__num">{step.num}</span>
			<div className="skill-collapsed-panel__title-wrap">
				<span className="skill-collapsed-panel__title">{step.title}</span>
			</div>
			<div className="skill-collapsed-panel__icon">
				<ChevronRight size={12} />
			</div>
		</div>
	);
}

function MobileAccordion({ active, onSelect }) {
	return (
		<div className="skill-mobile-accordion">
			{EXPERTISE.map((step, i) => {
				const isActive = i === active;
				return (
					<div
						key={step.num}
						onClick={() => onSelect(i)}
						className={`skill-mobile-item ${i < EXPERTISE.length - 1 ? "skill-mobile-item--bordered" : ""}`}
					>
						<div className="skill-mobile-item__trigger">
							<span className={`skill-mobile-item__num ${isActive ? "is-active" : ""}`}>
								{step.num}
							</span>
							<span className={`skill-mobile-item__title ${isActive ? "is-active" : ""}`}>
								{step.title}
							</span>
							<ChevronRight
								size={16}
								className={`skill-mobile-item__chevron ${isActive ? "is-active" : ""}`}
							/>
						</div>
						<div
							className="skill-mobile-item__panel"
							style={{ maxHeight: isActive ? "400px" : "0" }}
						>
							<div className="skill-mobile-item__card">
								<p className="skill-mobile-item__sub">{step.sub}</p>
								<p className="skill-mobile-item__text">{step.text}</p>
								<div className="skill-mobile-item__stat-row">
									<p className="skill-mobile-item__stat">{step.stat}</p>
								</div>
								<div className="skill-active-panel__progress">
									<div className="skill-active-panel__progress-bar" />
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

const Skills1 = () => {
	const [active, setActive] = useState(4);
	const [isMobile, setIsMobile] = useState(false);
	const autoRef = useRef(null);
	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		check();
		window.addEventListener("resize", check);
		return () => window.removeEventListener("resize", check);
	}, []);

	const startAuto = () => {
		if (autoRef.current) clearInterval(autoRef.current);
		autoRef.current = setInterval(() => {
			setActive((prev) => (prev + 1) % EXPERTISE.length);
		}, 5000);
	};

	useEffect(() => {
		startAuto();
		return () => {
			if (autoRef.current) clearInterval(autoRef.current);
		};
	}, []);

	const handleClick = (i) => {
		setActive(i);
		startAuto();
	};

	return (
		<>
		<section className="skill-header-section">
			<div className="skill-header-row">
				<div className="sec-heading">
					<span className="sub-title">What We Do</span>
					<h2 className="sec-title text-anim">
						Tech Stack &amp; Expertise
					</h2>
				</div>
				<p className="skill-heading-desc">
					Our proprietary tech stack, persuasive creative and actionable
					data analytics overcome the failures of other major advertisers.
				</p>
			</div>
		</section>
		<section className="tj-skill-section">

			{isMobile ? (
				<MobileAccordion active={active} onSelect={handleClick} />
			) : (
				<div className="skill-desktop-accordion">
					{EXPERTISE.map((step, i) => {
						const isActive = i === active;
						return (
							<div
								key={step.num}
								onClick={() => handleClick(i)}
								className={`skill-hz-panel ${isActive ? "skill-hz-panel--active" : ""} ${i < EXPERTISE.length - 1 ? "skill-hz-panel--bordered" : ""}`}
								style={{ flex: isActive ? 5 : 1 }}
							>
								{isActive ? (
									<ActivePanel step={step} />
								) : (
									<CollapsedPanel step={step} />
								)}
							</div>
						);
					})}
				</div>
			)}

		</section>
		</>
	);
};

export default Skills1;
