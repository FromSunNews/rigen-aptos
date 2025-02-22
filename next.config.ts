import { Configuration } from "webpack";

const nextConfig = {
  experimental: {
    turbo: {
      enabled: false
    }
  },
  webpack: (config: Configuration) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      net: false,
      tls: false,
      keyv: false
    };

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      keyv: require.resolve('keyv')
    };

    config.externals = [
      ...(config.externals as any[] || []),
      'keyv',
      'cacheable-request'
    ];
    
    return config;
  },
}

export default nextConfig;