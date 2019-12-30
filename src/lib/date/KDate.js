import deepFreeze from '../deepFreeze';

/**
 * unit 상수 정의
 * @typedef {KDATE_UNIT}
 * @property {string} MONTH
 * @property {string} WEEK
 * @property {string} DAY
 */
export const KDATE_UNIT = deepFreeze({
  MONTH: 'MONTH',
  WEEK: 'WEEK',
  DATE: 'DATE'
});

/**
 * 요일 시작 index 값 상수 정의
 * 일 / 월 / 화 / 수 / 목 / 금 / 토
 */
export const KDATE_START_DAY_WEEK = deepFreeze([0, 1, 2, 3, 4, 5, 6]);


/**
 * Date / DateTime 처리용 class 
 * @class KDate
 * @extends {Date}
 */
class KDate extends Date {
  constructor(value = new Date()) {
    super(value);
  }

  /**
   * 날짜 포맷에 맞춰 문자열 반환 처리
   * TODO - 임시 처리, 추가 처리 필요
   * @param {string} format
   * @param {string | Date} date
   * @returns {string}
   * @memberof KDate
   */
  format(format, date) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = `${dt.getMonth() + 1}`.padStart(2, '0');
    
    return `${year}년 ${month}월`;
  }

  /**
   * date 객체에서, 월 / 주 / 일 값을 변경하여 date 객체로 반환
   * @param {string | Date} date
   * @param {number} [value=1]
   * @param {NewType} [unit=KDATE_UNIT.DAY]
   * @returns {Date}
   * @memberof KDate
   */
  add(date, value = 1, unit = KDATE_UNIT.DAY) {
    const dt = new Date(date);

    switch (unit) {
      case KDATE_UNIT.MONTH:
        dt.setDate(1);
        dt.setMonth(dt.getMonth() + value);
        break;

      case KDATE_UNIT.WEEK:
        dt.setDate(dt.getDate() + value);
        break;

      case KDATE_UNIT.DATE:
      default:
        dt.setDate(dt.getDate() + value);
        break;
    }

    return dt;
  }

  addMonth(value = 1, date) {
    return this.add(date || this, value, KDATE_UNIT.MONTH);
  }

  addWeek(value = 1, date) {
    return this.add(date || this, value * 7, KDATE_UNIT.WEEK);
  }

  addDate(value = 1, date) {
    return this.add(date || this, value, KDATE_UNIT.DATE);
  }

  /**
   * 월의 시작일 반환
   * @param {string | Date} [date=new Date()]
   * @returns
   * @memberof KDate
   */
  startDateOfMonth(date = new Date()) {
    const startDate = new Date(date);
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);  
    return startDate;
  }

  /**
   * 월의 시작일, 요일 반환
   * @param {string | Date} [date=new Date()]
   * @returns
   * @memberof KDate
   */
  startDayOfMonth(date = new Date()) {
    const startDate = this.startDateOfMonth(date);
    return startDate.getDay();
  }

  /**
   * 월의 마지막날, Date 객체 반환
   * @param {string | Date} [date=new Date()]
   * @returns {Date}
   * @memberof KDate
   */
  endOfMonth(date = new Date()) {
    const inputDate = new Date(date);
    const endDate = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);
    return endDate;
  }

  /**
   * 월의 마지막날, 일자 반환
   * @param {string | Date} [date=new Date()]
   * @returns {number}
   * @memberof KDate
   */
  endDateOfMonth(date = new Date()) {
    const endDate = this.endOfMonth(date);
    return endDate.getDate();
  }

  /**
   * 월의 마지막날, 요일 반환
   * @param {string | Date} [date=new Date()]
   * @returns {number}
   * @memberof KDate
   */
  endDayOfMonth(date = new Date()) {
    const endDate = this.endOfMonth(date);
    return endDate.getDay();
  }

  /**
   * 월의 시작일, 마지막일을 6주 단위로 구성되도록하여 배열로 반환
   * TODO - 6주단위 표현을 옵션으로 처리할 경우 고려
   * @param {*} [month=new Date()]
   * @returns {Array}
   * @memberof KDate
   * @example
   * ```javascript
   * const kdate = new KDate();
   * console.table(kdate.monthToArray('2019-12-31'));
   * ```
   */
  monthToArray(month = new Date()) {
    const start = this.startDateOfMonth(month);
    const startIndex = KDATE_START_DAY_WEEK.findIndex(v => v === start.getDay());
    // const end = this.endOfMonth(month);
    // const endIndex = KDATE_START_DAY_WEEK.findIndex(v => v === end.getDay());
    const totalDates = 42;

    const monthArray = [];
    let cursor = this.addDate(-startIndex, start);
    let week;

    Array(totalDates).fill(0).forEach((_, index) => {
      if (!(index % 7)) {
        week = monthArray[Math.round(index / 7)] = [];
      }
      week.push(cursor);
      cursor = this.addDate(1, cursor);
    });
    return monthArray;
  }
}

export default KDate;
