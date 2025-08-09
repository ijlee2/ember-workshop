import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('run-generate/input');
const outputProject = convertFixtureToJson('run-generate/output');

export { inputProject, outputProject };
