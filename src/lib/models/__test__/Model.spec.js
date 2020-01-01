import Model from 'lib/models/Model';

const resultSuccess = 'success';

describe('# lib/models/Model Spec Test', () => {

  describe('# _private 기본 값 확인', () => {
    const model = new Model();
    const { _uuid, _vo, _view, _model } = model;

    it('_uuid 는 string 타입이며, 기본으로 생성된다.', () => {
      expect(_uuid).toBeTruthy();
      expect(typeof _uuid).toBe('string');
    });

    it('생성된 _uuid 값이 uuidv4 규격이 맞는지 확인한다.', () => {
      const isUuidv4 = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/.test(_uuid);
      expect(isUuidv4).toEqual(true);
    });

    it('_vo 값이 null 인지 확인한다.', () => {
      expect(_vo).toEqual(null);
    });

    it('_view 값이 null 인지 확인한다.', () => {
      expect(_view).toEqual(null);
    });

    it('_model 값이 null 인지 확인한다.', () => {
      expect(_model).toEqual(null);
    });
  });

  describe('# abstract 메소드, 기본 호출 확인', () => {
    const abstractMethod = new Model();

    it('fromVo 메소드는, override 하여 사용해야 한다.', () => {
      expect(() => abstractMethod.fromVo()).toThrow(Error);
    });

    it('toModel 메소드는, override 하여 사용해야 한다.', () => {
      expect(() => abstractMethod.toModel()).toThrow(Error);
    });

    it('toVo 메소드는, override 하여 사용해야 한다.', () => {
      expect(() => abstractMethod.toVo()).toThrow(Error);
    });
  });

  describe('# abstract 메소드 override 후, 정상 호출 확인', () => {
    const abstractMethod = new Model();

    it('override 한 fromVo 메소드는, 정상호출 된다.', () => {
      abstractMethod.fromVo = () => resultSuccess;

      expect(abstractMethod.fromVo()).toEqual(resultSuccess);
    });

    it('override 한 toModel 메소드는, 정상호출 된다.', () => {
      abstractMethod.toModel = () => resultSuccess;

      expect(abstractMethod.toModel()).toEqual(resultSuccess);
    });

    it('override 한 toVo 메소드는, 정상호출 된다.', () => {
      abstractMethod.toVo = () => resultSuccess;

      expect(abstractMethod.toVo()).toEqual(resultSuccess);
    });
  });

  describe('# destroy 메소드 기능을 확인', () => {
    it('_private 기본 값들은 null 처리 된다.', () => {
      const model = new Model();
      model.destroy();
      const { _uuid, _vo, _view, _model } = model;

      expect(_uuid).toEqual(null);
      expect(_vo).toEqual(null);
      expect(_view).toEqual(null);
      expect(_model).toEqual(null);
    });
  });

});
