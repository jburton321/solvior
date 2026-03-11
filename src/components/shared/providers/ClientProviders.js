"use client";

import { DrawerProvider } from "@/context/DrawerContext";
import StrategyDrawer from "@/components/shared/drawer/StrategyDrawer";

export default function ClientProviders({ children }) {
	return (
		<DrawerProvider>
			{children}
			<StrategyDrawer />
		</DrawerProvider>
	);
}
