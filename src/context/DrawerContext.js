"use client";

import { createContext, useContext, useState, useCallback } from "react";

const DrawerContext = createContext(null);

export function DrawerProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);

	const openDrawer = useCallback(() => {
		setIsOpen(true);
		document.body.style.overflow = "hidden";
	}, []);

	const closeDrawer = useCallback(() => {
		setIsOpen(false);
		document.body.style.overflow = "";
	}, []);

	return (
		<DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
			{children}
		</DrawerContext.Provider>
	);
}

export function useDrawer() {
	const ctx = useContext(DrawerContext);
	if (!ctx) throw new Error("useDrawer must be used inside DrawerProvider");
	return ctx;
}
