import { csn2dbml } from './csn2dbml.js';
import cds from '@sap/cds';

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

export function compileToDBML(csn, options = {}) {
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

export default compileToDBML;
