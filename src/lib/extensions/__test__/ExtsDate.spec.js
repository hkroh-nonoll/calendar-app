import ExtsDate from 'lib/extensions/ExtsDate';

describe('# lib/extensions/ExtsDate Spec Test', () => {

  describe('# ExtsDate.diff 비교 기능 확인', () => {
    it('동일시간 비교 - 결과값은 0 이 된다.', () => {
      const resultZero = ExtsDate.diff(new Date('2019-12-31T23:00:00').getTime(), new Date('2019-12-31T23:00:00').getTime());
      expect(resultZero).toEqual(0);
    });

    it('하루일자 차이 비교 - 결과값은 86400000 이 된다.', () => {
      const resultDay = ExtsDate.diff(new Date('2019-12-31T23:00:00').getTime(), new Date('2020-01-01T23:00:00').getTime());
      expect(resultDay).toEqual(86400000);
    });
  });

});
