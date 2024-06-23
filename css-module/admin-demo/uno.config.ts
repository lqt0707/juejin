import {defineConfig,presetUno} from 'uno.css'import { defineConfig } from 'vitest/config';
import presetRemToPx from 'unocss-preset-rem-to-px';

export default defineConfig({
  plugins: [
    presetUno(),
    presetRemToPx(),
  ],
  
});