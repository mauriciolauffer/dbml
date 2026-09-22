const { compileToDBML } = require('./lib/compile');
require('./cds-plugin');

module.exports = {
  compile: compileToDBML,
  compileToDBML
};
