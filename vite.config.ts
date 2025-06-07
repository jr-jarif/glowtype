// D:\my-ts-app\glowtype-ratata\vite.config.ts
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'; // Make sure to import react plugin

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()], // Make sure the plugins array is here
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    },
    // *** ADD THIS LINE FOR GITHUB PAGES ***
    base: '/glowtype/', // Your GitHub repository name with leading and trailing slashes
    // ************************************

    build: {
      outDir: 'dist', // Ensure your build output directory is 'dist'
    },
  };
});
