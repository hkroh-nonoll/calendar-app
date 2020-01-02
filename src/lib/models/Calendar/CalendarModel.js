import Model from 'lib/models/Model';
import EventModel from 'lib/models/Calendar/EventModel';
import { MINUTE_MILLISECONDS } from 'lib/constants/date';
import { CALENDAR_INVALID_ADD_EVENT, CALENDAR_INVALID_MATCHED_EVENT, EVENT_INVALID_TIME_DIFF } from 'lib/constants/errorTypes';

/**
 * Calendar Model class<br/>
 * Calendar data 관리
 * @export
 * @class CalendarModel
 * @extends {Model}
 */
export default class CalendarModel extends Model {

  constructor() {
    super();

    this._events = [];
  }

  /**
   * Calendar 에 event 추가
   * @param {object | EventModel} eventData
   * @returns {CalendarModel}
   * @throws {ERROR_TYPES/EVENT_INVALID_TIME_DIFF} 일정 시작일 / 종료일 규격이 유효하지 않은 경우
   * @throws {ERROR_TYPES/CALENDAR_INVALID_ADD_EVENT} Calendar event 추가시에 유효하지 않은 경우
   * @memberof CalendarModel
   */
  addEvent(eventData) {
    const isEventModel = eventData instanceof EventModel;

    let event;
    if (!isEventModel) {
      event = new EventModel(eventData);
    } else {
      event = eventData;
    }

    if (!event.validateDiff()) {
      throw new Error(EVENT_INVALID_TIME_DIFF);
    }

    if (!this.isValidEventList(event)) {
      throw new Error(CALENDAR_INVALID_ADD_EVENT);
    }

    this._events.push(event);
    this.sortEventList();

    return this;
  }

  /**
   * Calendar 에 등록된 event 수정
   * @param {object | EventModel} eventData
   * @returns {CalendarModel}
   * @throws {ERROR_TYPES/CALENDAR_INVALID_MATCHED_EVENT} Calendar 등록된 event와 매칭되지 않을 경우
   * @throws {ERROR_TYPES/EVENT_INVALID_TIME_DIFF} 일정 시작일 / 종료일 규격이 유효하지 않은 경우
   * @throws {ERROR_TYPES/CALENDAR_INVALID_ADD_EVENT} Calendar event 추가시에 유효하지 않은 경우
   * @memberof CalendarModel
   */
  modifyEvent(eventData) {
    const isEventModel = eventData instanceof EventModel;

    let event;
    if (!isEventModel) {
      event = new EventModel(eventData);
    } else {
      event = eventData;
    }

    const matched = this.getEventList().findIndex(data => data.toModel().uuid === event.toModel().uuid);

    if (!(~matched)) {
      throw new Error(CALENDAR_INVALID_MATCHED_EVENT);
    }

    if (!event.validateDiff()) {
      throw new Error(EVENT_INVALID_TIME_DIFF);
    }

    if (!this.isValidEventList(event)) {
      throw new Error(CALENDAR_INVALID_ADD_EVENT);
    }

    const copy = this.getEventList().slice(0);
    copy.splice(matched, 1, event);

    this.setEventList(copy);
    this.sortEventList();

    return this;
  }

  /**
   * Calendar 에 등록된 event 제거
   * @param {object | EventModel} eventData
   * @returns {CalendarModel}
   * @throws {ERROR_TYPES/CALENDAR_INVALID_MATCHED_EVENT} Calendar 등록된 event와 매칭되지 않을 경우
   * @memberof CalendarModel
   */
  deleteEvent(eventData) {
    const isEventModel = eventData instanceof EventModel;

    let event;
    if (!isEventModel) {
      event = new EventModel(eventData);
    } else {
      event = eventData;
    }

    const matched = this.getEventList().findIndex(data => data.toModel().uuid === event.toModel().uuid);

    if (!(~matched)) {
      throw new Error(CALENDAR_INVALID_MATCHED_EVENT);
    }

    const copy = this.getEventList().slice(0);
    copy.splice(matched, 1);

    this.setEventList(copy);
    this.sortEventList();

    return this;
  }

  /**
   * 신규 event가, 기존 등록되어 있는 리스트에 중복되는 케이스가 있는 지 검증
   * @param {EventModel} newEvent
   * @returns {boolean}
   * @memberof CalendarModel
   */
  isValidEventList(newEvent) {
    let { startAt: newStartAt, endAt: newEndAt, uuid: newUuid } = newEvent.toModel();
    newStartAt = +new Date(newStartAt) + MINUTE_MILLISECONDS;
    newEndAt = +new Date(newEndAt) - MINUTE_MILLISECONDS;

    const events = this.getEventList();
    const isValid = (events || []).every(event => {
      let { startAt, endAt, uuid } = event.toModel();
      startAt = +new Date(startAt) + MINUTE_MILLISECONDS;
      endAt = +new Date(endAt) - MINUTE_MILLISECONDS;

      // 중복 시간 체크
      if ((newStartAt >= startAt && newStartAt <= endAt) || (newEndAt >= startAt && newEndAt <= endAt)) {
        // 동일 uuid 판단
        if (uuid === newUuid) return true;
        else return false;
      }

      return true;
    });

    return isValid;
  }

  /**
   * event 일괄 설정
   * @param {array} events
   * @returns {CalendarModel}
   * @memberof CalendarModel
   */
  setEventList(events) {
    this._events = CalendarModel.toEvents(events);
    return this;
  }

  /**
   * Calendar 에 등록된 event 반환
   * @returns {array.<EventModel>}
   * @memberof CalendarModel
   */
  getEventList() {
    return this._events || [];
  }

  /**
   * 시간순으로 정렬
   * @returns {CalendarModel}
   * @memberof CalendarModel
   */
  sortEventList() {
    this._events.sort((a, b) => {
      const { startAt: aStart } = a.toModel();
      const { startAt: bStart } = b.toModel();
      return (+new Date(aStart)) - (+new Date(bStart));
    });
    return this;
  }

  /**
   * Calendar 에 등록 가능한 event 로 반환
   * @static
   * @param {array} events
   * @returns {array.<EventModel>}
   * @memberof CalendarModel
   */
  static toEvents(events) {
    return (events || [])
      .map(event => {
        if (event instanceof EventModel) {
          return event;
        } else {
          return new EventModel(event);
        }
      })
      .filter(event => event);
  }

  /**
   * @memberof CalendarModel
   */
  fromVo() {
    // TODO: 추가 처리할 요소가 생겼을때 작성한다
    return '';
  }

  /**
   * @memberof CalendarModel
   */
  toModel() {
    // TODO: 추가 처리할 요소가 생겼을때 작성한다
    return '';
  }

  /**
   * @memberof CalendarModel
   */
  toVo() {
    // TODO: 추가 처리할 요소가 생겼을때 작성한다
    return '';
  }

  /**
   * destroy
   * @memberof CalendarModel
   */
  destroy() {
    // TODO: 추가 처리할 요소가 생겼을때 작성한다
    super.destroy();
  }
}
