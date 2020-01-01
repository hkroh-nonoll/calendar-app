import { HOUR_MILLISECONDS } from 'lib/constants/date';
import ExtsDate from 'lib/extensions/ExtsDate';
import Model from 'lib/models/Model';

/**
 * 일정(event) Model class<br/>
 * Calendar 에 등록되는 일정을 관리
 * @export
 * @class EventModel
 * @extends {Model}
 */
export default class EventModel extends Model {

  constructor(data) {
    super();

    this.setDefaultData(data);
  }

  /**
   * 기본값 설정
   * @param {object} [data={}]
   * @param {string} [data.title='']
   * @param {Date} [data.startAt=new Date()]
   * @param {Date} [data.endAt=ExtsDate.addHour({ date: new Date() })]
   * @returns {EvenModel}
   * @memberof EventModel
   */
  setDefaultData(data = {}) {
    const startAt = new Date();
    const endAt = ExtsDate.addHour({ date: startAt });

    this._vo = Object.assign({}, data);
    this._model = Object.assign({}, { uuid: this._uuid, title: '', startAt, endAt }, data);

    return this;
  }

  /**
   * 제목 설정
   * @param {string} title
   * @returns {EvenModel}
   * @memberof EventModel
   */
  setTitle(title) {
    this._model.title = title;
    return this;
  }

  /**
   * 시작일 설정
   * @param {string | Date} startAt
   * @returns {EvenModel}
   * @memberof EventModel
   */
  setStartAt(startAt) {
    this._model.startAt = new Date(startAt);
    return this;
  }

  /**
   * 종료일 설정
   * @param {string | Date} endAt
   * @returns {EvenModel}
   * @memberof EventModel
   */
  setEndAt(endAt) {
    this._model.endAt = endAt;
    return this;
  }

  /**
   * startAt, endAt 값의 유효성 검증<br/>
   * endAt - startAt 은 1시간이상 차이 나야함
   * @see DATE/HOUR_MILLISECONDS
   * @returns {boolean}
   * @memberof EventModel
   */
  validateDiff() {
    const { startAt, endAt } = this._model;
    return ExtsDate.diff(startAt, endAt) >= HOUR_MILLISECONDS;
  }

  /**
   * @memberof EventModel
   */
  fromVo() {
    return '';
  }

  /**
   * Model 값 반환
   * @returns {object} model
   * @returns {string} model.uuid
   * @returns {string} model.title
   * @returns {Date} model.startAt
   * @returns {Date} model.endAt
   * @memberof EventModel
   */
  toModel() {
    return this._model;
  }

  /**
   * @memberof EventModel
   */
  toVo() {
    return '';
  }

  /**
   * destroy
   * @memberof EventModel
   */
  destroy() {
    super.destroy();
    // TODO: 추가 처리할 요소가 생겼을때 작성한다
  }
}
