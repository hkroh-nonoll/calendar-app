import { deepFreeze } from 'lib/utils/deepFreeze';

/**
 * calendar viewType 상수 정의
 * @readonly
 * @alias CALENDAR/VIEW_TYPE
 * @type {object}
 * @property {string} MONTH   월
 * @property {string} WEEK    주
 * @default
 */
export const VIEW_TYPE = deepFreeze({
  MONTH: 'MONTH',
  WEEK: 'WEEK'
});

/**
 * calendar 관련 상수 정의
 * @readonly
 * @alias CALENDAR
 * @type {object}
 */
export default {
  VIEW_TYPE
};