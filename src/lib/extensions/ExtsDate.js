import { UNIT, WEEK_SIZE, MAX_HOURS, MAX_DATES, START_DAY_WEEK } from 'lib/constants/date';

/**
 * Date / DateTime 처리용 class 
 * @class ExtsDate
 */
class ExtsDate {

  /**
   * Date 의 hour, minute, second 를 ms 기준으로 반환
   * @static
   * @param {Object} data
   * @param {Number} data.hour 시
   * @param {Number} data.minute 분
   * @param {Number} data.second 초
   * @returns {Number}
   * @memberof ExtsDate
   */
  static getMillisecondsByDay = ({ hour = 0, minute = 0, second = 0}) => {
    return (hour * 60 * 60 * 1000) + (minute * 60 * 1000) + (second * 1000);
  }

  /**
   * after - before 으로 값 비교하여 반환
   * @static
   * @param {String | Date} before 이전 시간
   * @param {String | Date} after 이후 시간
   * @returns {Number}
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @param {String} [data.format=''] 변환 포맷
   * @returns {String}
   * @memberof ExtsDate
   */
  static format({ date = new Date(), format = '' }) {
    const dt = new Date(date);
    const year = dt.getFullYear();
    const month = `${dt.getMonth() + 1}`.padStart(2, '0');

    // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString

    if (format === 'YYYY년 MM월 DD일') {
      const date = `${dt.getDate()}`.padStart(2, '0');
      return `${year}년 ${month}월 ${date}일`;
    } else {
      return `${year}년 ${month}월`;
    }
    
  }

  /**
   * date 객체에서, 월 / 주 / 일 값을 변경하여 date 객체로 반환
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @param {Number} [data.value=1] 가감값
   * @param {String} [data.unit=UNIT.DAY] 단위값
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @param {Number} [data.value=1] 가감값
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addMonth({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.MONTH });
  }

  /**
   * date 값에 주 값을 가감
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @param {Number} [data.value=1] 가감값
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addWeek({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value: value * 7, unit: UNIT.WEEK });
  }

  /**
   * date 값에 일자 값을 가감
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @param {Number} [data.value=1] 가감값
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addDate({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.DATE });
  }

  /**
   * date 값에 시간 값을 가감
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @param {Number} [data.value=1] 가감값
   * @returns {Date}
   * @memberof ExtsDate
   */
  static addHour({ date = new Date(), value = 1 }) {
    return ExtsDate.add({ date, value, unit: UNIT.HOUR });
  }

  /**
   * 월의 시작일 반환
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @returns {number}
   * @memberof ExtsDate
   * @example
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const endDateOfMonth = ExtsDate.endDateOfMonth({ date: '2019-12' });
   * console.table(endDayOfMonth); // 31
   */
  static endDateOfMonth({ date = new Date() }) {
    const endDate = ExtsDate.endOfMonth(date);
    return endDate.getDate();
  }

  /**
   * 월의 마지막날, 요일 반환
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @returns {number}
   * @memberof ExtsDate
   * @example
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const endDayOfMonth = ExtsDate.endDayOfMonth({ date: '2019-12' });
   * console.table(endDayOfMonth); // 2 - 화
   */
  static endDayOfMonth({ date = new Date() }) {
    const endDate = ExtsDate.endOfMonth(date);
    return endDate.getDay();
  }

  /**
   * 월의 시작일, 마지막일을 6주 단위로 구성되도록하여 배열로 반환
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @returns {Array}
   * @memberof ExtsDate
   * @example
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const monthToArray = ExtsDate.monthToArray({ date: '2019-12-31' });
   * console.table(monthToArray);
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
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
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @returns {Date}
   * @memberof ExtsDate
   */
  static endDateOfWeek({ date = new Date() }) {
    const endDate = ExtsDate.startDateOfWeek({ date });
    endDate.setDate(endDate.getDate() + 6);
    return endDate;
  }

  /**
   * 주의 시작일 ~ 마지막일을 기준으로, 0 ~ 24시 단위로 구성되도록하여 배열로 반환
   * @static
   * @param {Object} data
   * @param {String | Date} [data.date=new Date()] date 객체
   * @returns {Array}
   * @memberof ExtsDate
   * @example
   * import ExtsDate from 'lib/extensions/ExtsDate';
   * const weekToArray = ExtsDate.weekToArray({ date: '2019-12-31' });
   * console.table(weekToArray);
   */
  static weekToArray({ date = new Date() }) {
    const start = ExtsDate.startDateOfWeek({ date });
    const startIndex = START_DAY_WEEK.findIndex(v => v === start.getDay());

    const weekArray = [];
    let cursor = ExtsDate.addDate({ date: start, value: -startIndex });
    let hour;

    Array(MAX_HOURS * WEEK_SIZE).fill(0).forEach((_, index) => {
      if (!(index % MAX_HOURS)) {
        hour = weekArray[Math.round(index / MAX_HOURS)] = [];
      }
      hour.push(cursor);
      cursor = ExtsDate.addHour({ date: cursor, value: 1 });
    });
    return weekArray;
  }
}

export default ExtsDate;
