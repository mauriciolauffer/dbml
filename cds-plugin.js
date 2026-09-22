import cds from '@sap/cds';
import { compileToDBML } from './lib/compile/index.js';

if (cds.compile?.to) {
  try {
    cds.extend(cds.compile.to.constructor).with(class {
      get dbml() {
        return compileToDBML;
      }
    });
  } catch (err) {
    // Fallback assignment if extend fails
    cds.compile.to.dbml = compileToDBML;
  }
}
