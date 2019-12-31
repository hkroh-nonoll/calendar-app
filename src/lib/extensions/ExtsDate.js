import { UNIT, WEEK_SIZE, MAX_DATES, START_DAY_WEEK } from '../constants/date';

/**
 * Date / DateTime 처리용 class 
 * @class ExtsDate
 */
class ExtsDate {

  static diff(before, after) {
    const beforDate = new Date(before);
    const afterDate = new Date(after);

    return afterDate.getTime() - beforDate.getTime();
  }

  /**
   * 날짜 포맷에 맞춰 문자열 반환 처리
   * TODO - 임시 처리, 추가 처리 필요
   * @param {string} format
   * @param {string | Date} date
   * @returns {string}
   * @memberof KDate
   */
  static format({ date, format }) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = `${dt.getMonth() + 1}`.padStart(2, '0');
    
    return `${year}년 ${month}월`;
  }

  /**
   * date 객체에서, 월 / 주 / 일 값을 변경하여 date 객체로 반환
   * @param {string | Date} date
   * @param {number} [value=1]
   * @param {NewType} [unit=UNIT.DAY]
   * @returns {Date}
   * @memberof KDate
   */
  static add({ date, value = 1, unit = UNIT.DAY }) {
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

  static addMonth({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.MONTH });
  }

  static addWeek({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value: value * 7, unit: UNIT.WEEK });
  }

  static addDate({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.DATE });
  }

  static addHour({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.HOUR });
  }

  /**
   * 월의 시작일 반환
   * @param {string | Date} [date=new Date()]
   * @returns {Date}
   * @memberof KDate
   */
  static startDateOfMonth({ date = new Date() }) {
    const startDate = new Date(date);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);  
    return startDate;
  }

  /**
   * 월의 시작일, 요일 반환
   * @param {string | Date} [date=new Date()]
   * @returns {number}
   * @memberof KDate
   */
  static startDayOfMonth({ date = new Date() }) {
    const startDate = ExtsDate.startDateOfMonth(date);
    return startDate.getDay();
  }

  /**
   * 월의 마지막날, Date 객체 반환
   * @param {string | Date} [date=new Date()]
   * @returns {Date}
   * @memberof KDate
   */
  static endOfMonth({ date = new Date() }) {
    const dt = new Date(date);
    const endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
    return endDate;
  }

  /**
   * 월의 마지막날, 일자 반환
   * @param {string | Date} [date=new Date()]
   * @returns {number}
   * @memberof KDate
   */
  static endDateOfMonth({ date = new Date() }) {
    const endDate = ExtsDate.endOfMonth(date);
    return endDate.getDate();
  }

  /**
   * 월의 마지막날, 요일 반환
   * @param {object} { date = new Date() }
   * @returns {number}
   * @memberof ExtsDate
   * @example
   * ```javascript
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const endDayOfMonth = ExtsDate.endDayOfMonth({ date: '2019-12' });
   * console.table(endDayOfMonth); // 31
   * ```
   */
  static endDayOfMonth({ date = new Date() }) {
    const endDate = ExtsDate.endOfMonth(date);
    return endDate.getDay();
  }

  /**
   * 월의 시작일, 마지막일을 6주 단위로 구성되도록하여 배열로 반환
   * TODO - 6주단위 표현을 옵션으로 처리할 경우 고려
   * @param {*} [month=new Date()]
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
}

export default ExtsDate;
