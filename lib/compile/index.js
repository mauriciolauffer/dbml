const { csn2dbml } = require('./csn2dbml');
const cds = require('@sap/cds');

const events = {
  /**
   * Called before DBML conversion is started.
   * Can be used to modify the CSN or options before conversion.
   */
  before: 'compile.to.dbml',
  /**
   * Called after DBML conversion is done.
   * Can be used to modify the resulting DBML string before returning.
   */
  after: 'after:compile.to.dbml',
};

function compileToDBML(csn, options = {}) {
  cds.emit(events.before, { csn, options });
  let result = csn2dbml(csn, options);
  const param = { csn, options, result };
  cds.emit(events.after, param);
  if (param.result !== undefined) {
    result = param.result;
  }
  return result;
}

compileToDBML.events = events;

module.exports = {
  compileToDBML
};
