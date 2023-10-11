import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    // These are the modules that users should be able to import from your
    // addon. Anything not listed here may get optimized away.
    addon.publicEntrypoints([
      '**/*.js',
      'index.ts',
      'template-registry.ts',
      'test-support.ts',
    ]),

    // These are the modules that should get reexported into the traditional
    // "app" tree. Things in here should also be in publicEntrypoints above, but
    // not everything in publicEntrypoints necessarily needs to go here.
    addon.appReexports([
      'components/**/*.js',
      'helpers/**/*.js',
      'modifiers/**/*.js',
      'services/**/*.js',
      'utils/**/*.js',
    ]),

    // Follow the V2 Addon rules about dependencies. Your code can import from
    // `dependencies` and `peerDependencies` as well as standard Ember-provided
    // package names.
    addon.dependencies(),

    // Implement CSS modules
    postcss({
      autoModules: false,
      modules: {
        generateScopedName: 'my-addon__[sha512:hash:base64:5]',
      },
    }),

    // This babel config should *not* apply presets or compile away ES modules.
    // It exists only to provide development niceties for you, like automatic
    // template colocation.
    //
    // By default, this will load the actual babel config from the file
    // babel.config.json.
    babel({
      babelHelpers: 'bundled',
      extensions: ['.gjs', '.gts', '.js', '.ts'],
    }),

    // Ensure that standalone .hbs files are properly integrated as Javascript.
    addon.hbs(),

    // Ensure that .gjs files are properly integrated as Javascript
    addon.gjs(),

    // addons are allowed to contain imports of .css files, which we want rollup
    // to leave alone and keep in the published output.
    addon.keepAssets([]),

    // Update public-assets field in package.json
    addon.publicAssets('public/assets', {
      exclude: ['**/.*'],
      namespace: 'my-addon',
    }),

    // Remove leftover build artifacts when starting a new build.
    addon.clean(),
  ],
};
