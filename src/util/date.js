import moment from 'moment';

// unit 에 따라 일자를 변경하여 반환 하도록
export const add = ({ date = '', value, unit = 'month' }) => moment(date).add(value, unit);

// week 단위로 value 값에 따라 변경하여 반환
export const addWeek = ({ date = new Date(), value = 1 }) => add({ date, value, unit: 'week' });

// month 단위로 value 값에 따라 변경하여 반환
export const addMonth = ({ date = new Date(), value = 1 }) => add({ date, value, unit: 'month' });

// 해당 월에 시작일의 요일
export const startOfMonthDay = (date = new Date()) => moment(date).startOf('month').day();

// 해당 월에 최대 days 반환
export const daysInMonth = (date = new Date()) => moment(date).daysInMonth();

// 오늘 일자 정보 반환
export const currentDate = () => moment();
