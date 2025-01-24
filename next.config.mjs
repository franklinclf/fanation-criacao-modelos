/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/dashboard/pecas",
				destination: "/dashboard/pecas/1",
				permanent: true,
			},
			{
				source: "/dashboard/pecas/0",
				destination: "/dashboard/pecas/1",
				permanent: true,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "firebasestorage.googleapis.com",
			},
		],
	},
};

export default nextConfig;
