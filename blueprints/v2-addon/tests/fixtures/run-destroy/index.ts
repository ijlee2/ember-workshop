import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('run-destroy/input');
const outputProject = convertFixtureToJson('run-destroy/output');

export { inputProject, outputProject };
