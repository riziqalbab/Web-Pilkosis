import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@assets', 
        replacement: path.resolve(__dirname, 'src/assets')
      },
      {
        find: '@components', 
        replacement: path.resolve(__dirname, 'src/components') 
      },
      {
        find: '@pages', 
        replacement: path.resolve(__dirname, 'src/pages') 
      },
      {
        find: '@utils', 
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: '@toastifyCss',
        replacement: path.resolve(__dirname, 'node_modules/react-toastify/dist/ReactToastify.css')
      }
    ]
  }
})
