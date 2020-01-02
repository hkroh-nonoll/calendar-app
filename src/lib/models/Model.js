import { uuidv4 } from 'lib/utils/uuidv4';

import { MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN } from 'lib/constants/errorTypes';

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
   * @type {String}
   */
  _uuid = uuidv4();

  /**
   * vo 용 데이터 객체
   * @private
   * @memberof Model
   * @default null
   */
  _vo = null;

  /**
   * view 용 데이터 객체
   * @private
   * @memberof Model
   * @default null
   */
  _view = null;

  /**
   * vo <-> view 간 모델 관리용, 데이터 객체
   * @private
   * @memberof Model
   * @default null
   */
  _model = null;

  /**
   * vo 값을 view 로 처리할 메소드
   * @abstract
   * @throws {ERROR_TYPES/MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN} Model abstract method 를 override 하지 않은 경우
   * @memberof Model
   */
  fromVo() {
    if (!new.target || new.target === Model) {
      throw new Error(MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN);
    }
  }

  /**
   * vo <-> view 간 모델 관리용, 데이터 객체 처리할 메소드
   * @abstract
   * @throws {ERROR_TYPES/MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN} Model abstract method 를 override 하지 않은 경우
   * @memberof Model
   */
  toModel() {
    if (!new.target || new.target === Model) {
      throw new Error(MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN);
    }
  }

  /**
   * view 데이터를 vo 로 처리할 메소드
   * @abstract
   * @throws {ERROR_TYPES/MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN} Model abstract method 를 override 하지 않은 경우
   * @memberof Model
   */
  toVo() {
    if (!new.target || new.target === Model) {
      throw new Error(MODEL_ABSTRACT_METHODS_MUST_BE_OVERRIDDEN);
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