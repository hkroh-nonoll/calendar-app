import { deepFreeze } from '../utils/deepFreeze';

/**
 * unit 상수 정의
 * @readonly
 * @alias DATE/UNIT
 * @type {object}
 * @property {string} MONTH   월
 * @property {string} WEEK    주
 * @property {string} DAY     일
 * @default
 */
export const UNIT = deepFreeze({
  MONTH: 'MONTH', // 월
  WEEK: 'WEEK',   // 주
  DATE: 'DATE'    // 일
});

/**
 * 요일명 상수 정의
 * @readonly
 * @alias DATE/DAY_NAME_WEEK
 * @type {array}
 * @property {string} 0 - 일
 * @property {string} 1 - 월
 * @property {string} 2 - 화
 * @property {string} 3 - 수
 * @property {string} 4 - 목
 * @property {string} 5 - 금
 * @property {string} 6 - 토
 * @default ['일', '월', '화', '수', '목', '금', '토']
 */
export const DAY_NAME_WEEK = deepFreeze(['일', '월', '화', '수', '목', '금', '토']);

/**
 * 요일 시작 index 값 상수 정의
 * @readonly
 * @alias DATE/START_DAY_WEEK
 * @type {array}
 * @property {number} 0 - 일
 * @property {number} 1 - 월
 * @property {number} 2 - 화
 * @property {number} 3 - 수
 * @property {number} 4 - 목
 * @property {number} 5 - 금
 * @property {number} 6 - 토
 * @default [0, 1, 2, 3, 4, 5, 6]
 */
export const START_DAY_WEEK = deepFreeze([0, 1, 2, 3, 4, 5, 6]);

/**
 * 주당 요일수
 * @readonly
 * @alias DATE/WEEK
 * @type {number}
 * @default 7
 */
export const WEEK = 7;

/**
 * 최대 월 일자수 - WEEK(주당 요일수) * 6주
 * @readonly
 * @alias DATE/MAX_DATES
 * @type {number}
 * @default 42
 */
export const MAX_DATES = 7 * 6;


/**
 * date 관련 상수 정의
 * @readonly
 * @alias DATE
 * @type {object}
 */
export default {
  UNIT,
  DAY_NAME_WEEK,
  START_DAY_WEEK,
  WEEK,
  MAX_DATES
};