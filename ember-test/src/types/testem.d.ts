declare module 'testem' {
  export default class Testem {
    restart(): void;

    setDefaultOptions(defaultOptions: Record<string, unknown>): void;

    startCI(
      options: Record<string, unknown>,
      finalizer: (exitCode: number | undefined, error?: Error) => void,
    ): void;

    startDev(
      options: Record<string, unknown>,
      finalizer: (exitCode: number | undefined, error?: Error) => void,
    ): void;
  }
}
