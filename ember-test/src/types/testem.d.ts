declare module 'testem' {
  export default class Testem {
    setDefaultOptions(defaultOptions: Record<string, unknown>): void;

    startCI(
      options: Record<string, unknown>,
      finalizer: (exitCode: number | undefined, error?: Error) => void,
    ): void;
  }
}
