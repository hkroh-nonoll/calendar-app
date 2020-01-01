import Model from 'lib/models/Model';
import EventModel from 'lib/models/Calendar/EventModel';
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
    console.log('matched', matched);
    copy.splice(matched, 1);
    console.log(copy);

    this.setEventList(copy);
    this.sortEventList();

    return this;
  }

  isValidEventList(newEvent) {
    let { startAt: newStartAt, endAt: newEndAt, uuid: newUuid } = newEvent.toModel();
    newStartAt = +new Date(newStartAt);
    newEndAt = +new Date(newEndAt);

    const events = this.getEventList();
    const isValid = (events || []).every(event => {
      let { startAt, endAt, uuid } = event.toModel();
      startAt = +new Date(startAt);
      endAt = +new Date(endAt);

      if (uuid === newUuid) {
        return true;
      }

      if (newStartAt >= startAt && newStartAt <= endAt) {
        return false;
      }

      if (newEndAt >= startAt && newEndAt <= endAt) {
        return false;
      }

      return true;
    });

    return isValid;
  }

  setEventList(events) {
    // const isVaild = (events || []).every(event => this.isValidEventList(event));
    // if (isVaild) {
    //   this._events = events;
    // }
    this._events = events;
    return this;
  }

  getEventList() {
    return this._events;
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

  static toEvents(events) {
    return (events || [])
      .map(event => new EventModel(event))
      .filter(event => event);
  }

  fromVo(vo) {
    return this.toEvents(vo);
  }

  toModel() {
    return this._model;
  }

  toVo() {
    return '';
  }

  destroy() {}
}
