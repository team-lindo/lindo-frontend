const withTM = require('next-transpile-modules')([
  'rc-util', // 문제를 일으키는 패키지
  'antd',    // antd 패키지도 추가
]);

module.exports = withTM({
  reactStrictMode: true,
  staticPageGenerationTimeout: 120, 
  images: {
    domains: [], // 외부 도메인 이미지 사용 시 추가
    unoptimized: true, // 이미지 최적화 비활성화
  }, // 여기에 중괄호가 제대로 닫혀야 함
  webpack: (config) => {
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });
    return config;
  },
});
