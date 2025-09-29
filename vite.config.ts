import path from 'path';
import { defineConfig, loadEnv } from 'vite';


export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const thirdPartyKey = env.THIRD_PARTY_API_KEY || '';
    const thirdPartyBase = env.THIRD_PARTY_BASE_URL || env.THIRD_PARTY_API_BASE_URL || '';
    const thirdPartyModel = env.THIRD_PARTY_MODEL_NAME || env.THIRD_PARTY_MODEL || '';
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || thirdPartyKey || ''),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
        'process.env.THIRD_PARTY_API_KEY': JSON.stringify(thirdPartyKey),
        'process.env.THIRD_PARTY_BASE_URL': JSON.stringify(thirdPartyBase),
        'process.env.THIRD_PARTY_MODEL_NAME': JSON.stringify(thirdPartyModel),
        'process.env.THIRD_PARTY_API_BASE_URL': JSON.stringify(thirdPartyBase),
        'process.env.THIRD_PARTY_MODEL': JSON.stringify(thirdPartyModel)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
