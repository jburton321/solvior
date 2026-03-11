import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: false,
	async redirects() {
		return [
			{ source: "/home-01", destination: "/home-1", permanent: false },
			{ source: "/pricing-plan", destination: "/contact", permanent: true },
		];
	},
};

export default nextConfig;
