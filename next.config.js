const withTM = require('next-transpile-modules')([
  'rc-util', 
  'antd',   
]);

module.exports = withTM({
  reactStrictMode: true,
  staticPageGenerationTimeout: 120, 
    images: {
    domains: [], // 외부 도메인 이미지 사용 시 추가
    unoptimized: true, // 이미지 최적화 비활성화
  }, 
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
