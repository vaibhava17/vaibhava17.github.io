import legacy from '@vitejs/plugin-legacy'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

function resolve(dir: string) {
  return path.join(__dirname, dir)
}

export default ({mode}) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    plugins: [react(), legacy()],
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    server: {
      port: parseInt(env.VITE_PORT),
      // proxy: {
      //   '/api': {
      //     target: env.VITE_BASE_API_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, ''),
      //   },
      // },
    },
  })
} 