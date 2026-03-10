"use client";

import { useEffect, useRef, useState } from "react";

// ═══════════════════════════════════════════════════════════════
// SVG PATH DATA — "ONE" wordmark (4 segments)
// ═══════════════════════════════════════════════════════════════

const ONE_PATHS = [
	"M485.51,552v-49.5h135l-53-42h-82v-10.55c0-22.06,17.89-39.95,39.95-39.95h171.84c13.04,0,24.54,6.53,31.44,16.5h47.49c-10.06-34.94-42.24-60.5-80.41-60.5h-170.61c-46.22,0-83.7,37.47-83.7,83.7v90.8l5.86,4.34c8.54,5.41,15.33,7.33,25.23,7.16h12.91Z",
	"M728.76,535.5h-.01c-6.89,9.97-18.39,16.5-31.42,16.5h-227.42c-9.29,0-17.81-3.25-24.51-8.66l-7.87-5.81-220.77-165.35c-5.35-4.01-11.86-6.18-18.55-6.18l-219.7.5c-22.41,5.23-37.07,15-46.66,26.3-.15.18-.3.36-.45.54-.13.15-.25.31-.38.46-5.32,6.63-9.01,13.68-11.55,20.45-4.74,12.91-5.47,25.48-5.47,33.93,1.71-21.69,17.09-38.18,38.18-38.18h227.32c9.29,0,17.81,3.25,24.51,8.66l12.61,9.3v-.02l216.36,162.05c5.21,3.9,11.54,6.01,18.05,6.01h244.78c38.17,0,70.35-25.56,80.41-60.5h-47.47Z",
	"M208.02,421.5h0c-13.02-11.11-24.21-12.06-35.06-11.5-5.2.27-8.93,0-8.93,0v102.05c0,12.54-6.98,24.65-16.01,31.98-6.76,5.01-15.8,7.94-24.79,7.94H16.34v.03H-47.79c-21.1,0-38.21-17.11-38.21-38.21v-65.61c0-8.46.73-21.02,5.47-33.93,2.53-6.91,6.22-13.91,11.55-20.45.13-.15.25-.31.38-.46.15-.18.3-.36.45-.54,9.58-11.29,24.25-21.07,46.66-26.3v-.5h-24.8c-46.23,0-83.7,37.47-83.7,83.7v62.61c0,46.22,37.47,83.7,83.7,83.7H17.17v-.03h106.31c30.82,0,58.54-16.64,73.12-41.45h0s.01-.02.01-.02c0,0,0,0,0-.01.48-.82.95-1.65,1.41-2.5l-.1-.02c5.74-11.51,10.09-26.31,10.09-39.68v-90.8Z",
	"M729.33,535.5c-4.47,22.37-13.91,50.27-57.75,60.5h24.8c38.25,0,70.44-25.45,80.42-60.5h-47.47Z",
];

// ═══════════════════════════════════════════════════════════════
// SVG PATH DATA — "AGENCY" letters (6 individual glyphs)
// ═══════════════════════════════════════════════════════════════

const AGENCY_LETTER_PATHS = [
	"M-21.88,669.46l16.28,44.97h-5.88l-6.78-18.69h-12.22l-6.91,18.69h-5.91l16.5-44.97h4.92ZM-20.04,690.87l-4.31-11.94-4.34,11.94h8.66-.01Z",
	"M134.13,708.31c-4.6,4.42-9.96,6.62-16.06,6.62-6.54,0-12.07-2.25-16.58-6.77-4.51-4.51-6.77-9.92-6.77-16.23s2.25-11.65,6.77-16.19c4.51-4.54,10.04-6.81,16.58-6.81,6.08,0,11.66,2.31,16.72,6.94l-3.94,3.5c-4.12-3.65-8.39-5.47-12.78-5.47-4.79,0-8.93,1.75-12.42,5.23-3.49,3.49-5.23,7.76-5.23,12.8s1.74,9.37,5.23,12.84c3.49,3.48,7.63,5.22,12.42,5.22,4.1,0,7.58-1.15,10.44-3.44v-13.69h5.62v15.44h0Z",
	"M263.02,669.46v4.91h-18.81v15.12h18.81v4.91h-18.81v15.12h18.81v4.91h-24.47v-44.97h24.47Z",
	"M373.44,669.46l25.62,35.94v-35.94h5.66v44.97h-6.25l-24.97-35.03v35.03h-5.66v-44.97h5.6Z",
	"M544.48,704.53l3.94,3.5c-5.06,4.6-10.64,6.91-16.72,6.91-6.54,0-12.07-2.25-16.58-6.77-4.51-4.51-6.77-9.92-6.77-16.23s2.25-11.65,6.77-16.19c4.51-4.54,10.04-6.81,16.58-6.81,6.08,0,11.66,2.31,16.72,6.94l-3.94,3.5c-4.12-3.65-8.39-5.47-12.78-5.47-4.79,0-8.93,1.75-12.42,5.23-3.49,3.49-5.23,7.76-5.23,12.8s1.74,9.37,5.23,12.84c3.49,3.48,7.63,5.22,12.42,5.22,4.4,0,8.66-1.82,12.78-5.47Z",
	"M664.75,696.24l-15.44-26.78h6.25l12.03,20.81,12-20.81h6.25l-15.44,26.78v18.19h-5.66v-18.19h0Z",
];

// ═══════════════════════════════════════════════════════════════
// ANIMATION TIMING CONSTANTS
// ═══════════════════════════════════════════════════════════════

const BASE_OPACITY = 0.15;
const DRAW_DURATION = 2800;
const STAGGER = 180;
const HOLD_DURATION = 3000;
const DIM_DURATION = 800;
const TYPE_DELAY_START = 1400;
const TYPE_LETTER_INTERVAL = 120;

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function AnimatedOneLogo({ active, className = "", style }) {
	const pathRefs = useRef([]);
	const letterRefs = useRef([]);
	const lengths = useRef([]);
	const [ready, setReady] = useState(false);
	const timerRef = useRef(0);
	const typeTimersRef = useRef([]);

	useEffect(() => {
		const measured = [];
		pathRefs.current.forEach((el) => {
			if (el) {
				const len = el.getTotalLength();
				measured.push(len);
				el.style.strokeDasharray = `${len}`;
				el.style.strokeDashoffset = `${len}`;
				el.style.fillOpacity = `${BASE_OPACITY}`;
			}
		});
		lengths.current = measured;

		letterRefs.current.forEach((el) => {
			if (el) {
				el.style.opacity = `${BASE_OPACITY}`;
				el.style.transform = "translateY(0)";
			}
		});

		setReady(true);
	}, []);

	useEffect(() => {
		if (!active || !ready) return;

		function clearTypeTimers() {
			typeTimersRef.current.forEach((t) => window.clearTimeout(t));
			typeTimersRef.current = [];
		}

		function typeIn() {
			clearTypeTimers();

			AGENCY_LETTER_PATHS.forEach((_, i) => {
				const t = window.setTimeout(() => {
					const el = letterRefs.current[i];
					if (!el) return;
					el.style.transition = "opacity 250ms ease, transform 250ms ease";
					el.style.opacity = "1";
					el.style.transform = "translateY(0)";
				}, TYPE_DELAY_START + i * TYPE_LETTER_INTERVAL);
				typeTimersRef.current.push(t);
			});
		}

		function dimLetters() {
			letterRefs.current.forEach((el, i) => {
				if (!el) return;
				const delay = i * 40;
				el.style.transition = `opacity ${DIM_DURATION}ms ease ${delay}ms`;
				el.style.opacity = `${BASE_OPACITY}`;
			});
		}

		function drawIn() {
			const totalDrawTime = (ONE_PATHS.length - 1) * STAGGER + DRAW_DURATION;

			pathRefs.current.forEach((el, i) => {
				if (!el) return;
				const len = lengths.current[i];
				const delay = i * STAGGER;

				el.style.transition = "none";
				el.style.strokeDashoffset = `${len}`;
				el.style.fillOpacity = `${BASE_OPACITY}`;

				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						el.style.transition = [
							`stroke-dashoffset ${DRAW_DURATION}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delay}ms`,
							`fill-opacity 700ms ease ${delay + DRAW_DURATION * 0.55}ms`,
						].join(", ");
						el.style.strokeDashoffset = "0";
						el.style.fillOpacity = "1";
					});
				});
			});

			typeIn();

			timerRef.current = window.setTimeout(dimDown, totalDrawTime + HOLD_DURATION);
		}

		function dimDown() {
			pathRefs.current.forEach((el, i) => {
				if (!el) return;
				const delay = i * 50;
				el.style.transition = `fill-opacity ${DIM_DURATION}ms ease ${delay}ms, stroke-dashoffset ${DIM_DURATION}ms ease ${delay}ms`;
				el.style.fillOpacity = `${BASE_OPACITY}`;
				el.style.strokeDashoffset = `${lengths.current[i]}`;
			});

			dimLetters();

			const totalDimTime = (ONE_PATHS.length - 1) * 50 + DIM_DURATION;
			timerRef.current = window.setTimeout(drawIn, totalDimTime + 200);
		}

		drawIn();

		return () => {
			window.clearTimeout(timerRef.current);
			clearTypeTimers();
		};
	}, [active, ready]);

	return (
		<svg
			viewBox="-300 350 1400 400"
			className={className}
			style={style}
			aria-label="ONE Agency logo"
		>
			{ONE_PATHS.map((d, i) => (
				<path
					key={`one-${i}`}
					ref={(el) => {
						pathRefs.current[i] = el;
					}}
					d={d}
					fill="currentColor"
					stroke="currentColor"
					strokeWidth="3"
					strokeLinecap="round"
					strokeLinejoin="round"
					style={{ fillOpacity: BASE_OPACITY }}
				/>
			))}
			{AGENCY_LETTER_PATHS.map((d, i) => (
				<path
					key={`letter-${i}`}
					ref={(el) => {
						letterRefs.current[i] = el;
					}}
					d={d}
					fill="currentColor"
					style={{ opacity: BASE_OPACITY }}
				/>
			))}
		</svg>
	);
}
