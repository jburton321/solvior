"use client";

import { useDrawer } from "@/context/DrawerContext";

export default function QuoteButton({ className }) {
	const { openDrawer } = useDrawer();
	return (
		<button
			type="button"
			onClick={openDrawer}
			className={`tj-primary-btn ${className || ""}`}
		>
			<span className="btn_inner">
				<span className="btn_icon">
					<span>
						<i className="tji-arrow-right"></i>
						<i className="tji-arrow-right"></i>
					</span>
				</span>
				<span className="btn_text">
					<span>Get a Quote</span>
				</span>
			</span>
		</button>
	);
}
