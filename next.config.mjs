/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ],
    // 배포 환경(특히 정적 호스팅/설정 꼬임)에서도 /_next/image 404가 나지 않도록 최적화를 끕니다.
    // 데모용이므로 성능보단 "항상 동작"을 우선합니다.
    unoptimized: true
  }
};

export default nextConfig;


