import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CountTo',
      fileName: 'index'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    vue(),
    dts({
      outputDir: 'types',
      cleanVueFileName: true
    })
  ],
  resolve: {
    // alias: [{ find: /^@\/(.+)/, replacement: resolve(__dirname, '$1') }]
    alias: {
      '@': resolve(__dirname),
      '@components': resolve(__dirname, 'src/components')
    }
  }
})
