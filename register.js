// eslint-disable-next-line import/no-extraneous-dependencies
const { register } = require('ts-node');

register({
  files: true,
  transpileOnly: true,
  project: './test/tsconfig.json',
});
