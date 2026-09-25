type CodemodOptions = {
  path: string | undefined;
  projectRoot: string;
  testPort: number | undefined;
};

type Options = {
  buildPath: string;
  projectRoot: string;
  testPort: number | undefined;
};

export type { CodemodOptions, Options };
