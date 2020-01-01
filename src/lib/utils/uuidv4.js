/**
 * uuidv4 generator
 * @see https://www.ietf.org/rfc/rfc4122.txt
 * @see https://github.com/kelektiv/node-uuid
 * @see https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 * @returns {string}
 * @example
 * import { uuidv4 } from 'lib/utils/uuidv4';
 * console.log(uuidv4()); // 05b5e68e-7d37-4bde-ac1a-9923646b65f6
 */
export const uuidv4 = _ => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
  const r = Math.random() * 16 | 0;
  // eslint-disable-next-line no-mixed-operators
  const v = c === 'x' ? r : (r & 0x3 | 0x8);
  return v.toString(16);
});
