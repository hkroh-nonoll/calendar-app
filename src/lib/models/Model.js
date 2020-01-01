import { uuidv4 } from 'lib/utils/uuidv4';

/**
 * 기본 Model Class
 * @export
 * @class Model
 */
export default class Model {

  /**
   * model 고유 uuid
   * @private
   * @memberof Model
   */
  _uuid = uuidv4();

  /**
   * vo 용 데이터 객체
   * @private
   * @memberof Model
   */
  _vo = null;

  /**
   * view 용 데이터 객체
   * @private
   * @memberof Model
   */
  _view = null;

  /**
   * vo <-> view 간 모델 관리용, 데이터 객체
   * @private
   * @memberof Model
   */
  _model = null;

  /**
   * vo 값을 view 로 처리할 메소드
   * @abstract
   * @memberof Model
   */
  fromVo() {
    if (!new.target || new.target === Model) {
      throw new Error('Model fromVo 을 override 하세요');
    }
  }

  /**
   * vo <-> view 간 모델 관리용, 데이터 객체 처리할 메소드
   * @abstract
   * @memberof Model
   */
  toModel() {
    if (!new.target || new.target === Model) {
      throw new Error('Model toModel 을 override 하세요');
    }
  }

  /**
   * view 데이터를 vo 로 처리할 메소드
   * @abstract
   * @memberof Model
   */
  toVo() {
    if (!new.target || new.target === Model) {
      throw new Error('Model toVo 을 override 하세요');
    }
  }

  /**
   * destroy
   * @memberof Model
   */
  destroy() {
    this._uuid = null;
    this._vo = null;
    this._view = null;
    this._model = null;
  }
}