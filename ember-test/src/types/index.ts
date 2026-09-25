type CodemodOptions = {
  path: string;
  projectRoot: string;
  testPort: number | undefined;
  server: boolean | undefined;
};

type Options = {
  buildPath: string;
  launchBrowser: boolean;
  projectRoot: string;
  testPort: number | undefined;
};

export type { CodemodOptions, Options };
