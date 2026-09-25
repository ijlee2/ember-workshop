type CodemodOptions = {
  filters: {
    filter: string | undefined;
    module: string | undefined;
  };
  path: string;
  projectRoot: string;
  testPort: number | undefined;
  server: boolean | undefined;
};

type Options = {
  buildPath: string;
  filters: {
    filter: string | undefined;
    module: string | undefined;
  };
  launchBrowser: boolean;
  projectRoot: string;
  testPort: number | undefined;
};

export type { CodemodOptions, Options };
