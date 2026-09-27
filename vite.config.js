import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  base: './',
  plugins: [
    ViteImageOptimizer({
      test: /\.(webp|svg)$/i,
      webp: { quality: 80, effort: 6 },
      svg: {
        multipass: true,
        plugins: [
          'preset-default',
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: { attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }] },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: [
        'index.html',
        'html/cadastro.html',
        'html/componentes.html',
        'html/projetos.html'
      ]
    }
  }
});