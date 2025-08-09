type EntityType = 'component' | 'helper' | 'modifier' | 'service' | 'util';

type CodemodOptions = {
  entity: {
    name: string;
    type: EntityType;
  };
  projectRoot: string;
  testAppLocation: string;
};

type Options = {
  entity: {
    name: string;
    type: EntityType;
  };
  projectRoot: string;
  testApp: {
    location: string;
  };
};

export type { CodemodOptions, Options };
