type EntityType =
  | {
      blueprint: 'glimmer' | 'template-only';
      type: 'component';
    }
  | {
      blueprint: 'class' | 'function';
      type: 'helper';
    }
  | {
      blueprint: 'class' | 'function';
      type: 'modifier';
    }
  | {
      blueprint: 'class';
      type: 'service';
    }
  | {
      blueprint: 'function';
      type: 'util';
    };

type CodemodOptions = {
  entity: EntityType & {
    name: string;
  };
  projectRoot: string;
  testAppLocation: string;
};

type Options = {
  addon: {
    name: string;
  };
  entity: EntityType & {
    camelizedName: string;
    doubleColonizedName: string;
    name: string;
    pascalizedName: string;
  };
  projectRoot: string;
  testApp: {
    location: string;
    name: string;
  };
};

export type { CodemodOptions, Options };
