import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Optional alias for cleaner imports
    },
  },
  optimizeDeps: {
    include: ['grpc-web'], // Ensure Vite pre-bundles gRPC-Web properly
  },
  build: {
    commonjsOptions: {
      include: [/grpc-web/, /node_modules/], // Allow CommonJS modules
    },
  },
});
