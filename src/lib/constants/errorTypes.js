/**
 * Calendar 일정 추가시에 유효하지 않은 경우
 * @readonly
 * @alias ERROR_TYPES/CALENDAR_INVALID_ADD_EVENT
 * @type {string}
 * @default 'CALENDAR_INVALID_ADD_EVENT'
 */
export const CALENDAR_INVALID_ADD_EVENT = 'CALENDAR_INVALID_ADD_EVENT';

/**
 * Calendar 등록된 일정과 매칭되지 않을 경우
 * @readonly
 * @alias ERROR_TYPES/CALENDAR_INVALID_MATCHED_EVENT
 * @type {string}
 * @default 'CALENDAR_INVALID_MATCHED_EVENT'
 */
export const CALENDAR_INVALID_MATCHED_EVENT = 'CALENDAR_INVALID_MATCHED_EVENT';

/**
 * 일정 시작일 / 종료일 규격이 유효하지 않은 경우
 * @readonly
 * @alias ERROR_TYPES/EVENT_INVALID_TIME_DIFF
 * @type {string}
 * @default 'EVENT_INVALID_TIME_DIFF'
 */
export const EVENT_INVALID_TIME_DIFF = 'EVENT_INVALID_TIME_DIFF';

/**
 * error 관련 상수 정의
 * @readonly
 * @alias ERROR_TYPES
 * @type {object}
 */
export default {
  CALENDAR_INVALID_ADD_EVENT,
  CALENDAR_INVALID_MATCHED_EVENT,
  EVENT_INVALID_TIME_DIFF
}