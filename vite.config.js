import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
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