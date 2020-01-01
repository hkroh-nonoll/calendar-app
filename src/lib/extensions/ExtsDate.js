import { UNIT, WEEK_SIZE, MAX_DATES, START_DAY_WEEK } from '../constants/date';

/**
 * Date / DateTime 처리용 class 
 * @class ExtsDate
 */
class ExtsDate {

  /**
   * after - before 으로 값 비교하여 반환
   * @static
   * @param {string | Date} before
   * @param {string | Date} after
   * @returns {number}
   * @memberof ExtsDate
   */
  static diff(before, after) {
    const beforDate = new Date(before);
    const afterDate = new Date(after);

    return afterDate.getTime() - beforDate.getTime();
  }

  /**
   * 날짜 포맷에 맞춰 문자열 반환 처리
   * TODO - 임시 처리, format 추가 처리 고려
   * @static
   * @param {object} data
   * @param {string | Date} data.date date 객체
   * @param {string} data.format 변환 포맷
   * @default
   *  { date = new Date(), format = '' }
   * @returns {string}
   * @memberof ExtsDate
   */
  static format({ date = new Date(), format = '' }) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = `${dt.getMonth() + 1}`.padStart(2, '0');
    
    return `${year}년 ${month}월`;
  }

  /**
   * date 객체에서, 월 / 주 / 일 값을 변경하여 date 객체로 반환
   * @static
   * @param {object} data
   * @param {string | Date} data.date date 객체
   * @param {number} data.value 가감값
   * @param {string} data.unit 단위값
   * @default
   *  { date = new Date(), value = 1, unit = UNIT.DAY }
   * @see DATE/UNIT
   * @returns {Date}
   * @memberof ExtsDate
   */
  static add({ date = new Date(), value = 1, unit = UNIT.DAY }) {
    const dt = new Date(date);

    switch (unit) {
      case UNIT.MONTH:
        dt.setDate(1);
        dt.setMonth(dt.getMonth() + value);
        break;

      case UNIT.WEEK:
        dt.setDate(dt.getDate() + value);
        break;

      case UNIT.DATE:
        dt.setDate(dt.getDate() + value);
        break;

      case UNIT.HOUR:
      default:
        dt.setHours(dt.getHours() + value);
        break;
    }

    return dt;
  }

  /**
   * date 값에 월 값을 가감
   * @static
   * @param {object} { date = new Date(), value = 1 }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addMonth({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.MONTH });
  }

  /**
   * date 값에 주 값을 가감
   * @static
   * @param {object} { date = new Date(), value = 1 }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addWeek({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value: value * 6, unit: UNIT.WEEK });
  }

  /**
   * date 값에 일자 값을 가감
   * @static
   * @param {object} { date = new Date(), value = 1 }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addDate({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.DATE });
  }

  /**
   * date 값에 시간 값을 가감
   * @static
   * @param {object} { date = new Date(), value = 1 }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addHour({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.HOUR });
  }

  /**
   * 월의 시작일 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static startDateOfMonth({ date = new Date() }) {
    const startDate = new Date(date);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);  
    return startDate;
  }

  /**
   * 월의 시작일, 요일 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {number}
   * @memberof ExtsDate
   */
  static startDayOfMonth({ date = new Date() }) {
    const startDate = ExtsDate.startDateOfMonth(date);
    return startDate.getDay();
  }
  

  /**
   * 월의 마지막날, Date 객체 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static endOfMonth({ date = new Date() }) {
    const dt = new Date(date);
    const endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
    return endDate;
  }

  /**
   * 월의 마지막날, 일자 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {number}
   * @memberof ExtsDate
   * @example
   * ```javascript
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const endDateOfMonth = ExtsDate.endDateOfMonth({ date: '2019-12' });
   * console.table(endDayOfMonth); // 31
   * ```
   */
  static endDateOfMonth({ date = new Date() }) {
    const endDate = ExtsDate.endOfMonth(date);
    return endDate.getDate();
  }

  /**
   * 월의 마지막날, 요일 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {number}
   * @memberof ExtsDate
   * @example
   * ```javascript
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const endDayOfMonth = ExtsDate.endDayOfMonth({ date: '2019-12' });
   * console.table(endDayOfMonth); // 2 - 화
   * ```
   */
  static endDayOfMonth({ date = new Date() }) {
    const endDate = ExtsDate.endOfMonth(date);
    return endDate.getDay();
  }

  /**
   * 월의 시작일, 마지막일을 6주 단위로 구성되도록하여 배열로 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {Array}
   * @memberof ExtsDate
   * @example
   * ```javascript
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const monthToArray = ExtsDate.monthToArray({ date: '2019-12-31' });
   * console.table(monthToArray);
   * ```
   */
  static monthToArray({ date = new Date() }) {
    const start = ExtsDate.startDateOfMonth({ date });
    const startIndex = START_DAY_WEEK.findIndex(v => v === start.getDay());

    const monthArray = [];
    let cursor = ExtsDate.addDate({ date: start, value: -startIndex });
    let week;

    Array(MAX_DATES).fill(0).forEach((_, index) => {
      if (!(index % WEEK_SIZE)) {
        week = monthArray[Math.round(index / WEEK_SIZE)] = [];
      }
      week.push(cursor);
      cursor = ExtsDate.addDate({ date: cursor, value: 1 });
    });
    return monthArray;
  }


  /**
   * 주의 시작일 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static startDateOfWeek({ date = new Date() }) {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    startDate.setHours(0, 0, 0, 0);  
    return startDate;
  }
  
  /**
   * 주의 마지막일 반환
   * @static
   * @param {object} { date = new Date() }
   * @returns {Date}
   * @memberof ExtsDate
   */
  static endDateOfWeek({ date = new Date() }) {
    const endDate = ExtsDate.startDateOfWeek(date);
    endDate.setDate(endDate.getDate() + 6);
    return endDate;
  }
}

export default ExtsDate;
