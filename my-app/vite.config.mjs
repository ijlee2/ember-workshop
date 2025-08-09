import { loadTranslations } from '@ember-intl/vite';
import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    modules: {
      generateScopedName: 'my-app__[hash]-[local]',
    },
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
    loadTranslations(),
  ],
});
