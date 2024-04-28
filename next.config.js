/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "cdn.shopclues.com",
			},
			{
				hostname: "hips.hearstapps.com",
			},
			{
				hostname: "images.immediate.co.uk",
			},
			{
				hostname: "images.unsplash.com",
			},
		],
	},
	async rewrites() {
		return [
			{
				source: "/api/",
				destination: "http://localhost:5000/api/",
			},
		];
	},
};

module.exports = nextConfig;
