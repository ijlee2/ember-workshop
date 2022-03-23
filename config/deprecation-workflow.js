const deprecationIdsToSilence = [
  'ember-data:deprecate-array-like',
  'ember-data:deprecate-early-static',
];

const deprecationIdsToThrow = [];

/* global self */
self.deprecationWorkflow = self.deprecationWorkflow || {};

self.deprecationWorkflow.config = {
  workflow: [
    ...deprecationIdsToSilence.map((matchId) => ({
      handler: 'silence',
      matchId,
    })),

    ...deprecationIdsToThrow.map((matchId) => ({
      handler: 'throw',
      matchId,
    })),
  ],
};
