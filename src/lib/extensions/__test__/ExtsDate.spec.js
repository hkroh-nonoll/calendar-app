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

  describe('# ExtsDate.format 기능 확인', () => {
    it('ExtsDate.format({ date: "2020-01-02", format: "YYYY년 MM월" }) - 결과값은 "2020년 01월" 이 된다.', () => {
      const result = ExtsDate.format({ date: '2020-01-02"', format: 'YYYY년 MM월' });
      expect(result).toEqual('2020년 01월');
    });

    it('ExtsDate.format({ date: "2020-01-02", format: "YYYY년 MM월 DD일" }) - 결과값은 "2020년 01월 02일" 이 된다.', () => {
      const result = ExtsDate.format({ date: '2020-01-02"', format: 'YYYY년 MM월 DD일' });
      expect(result).toEqual('2020년 01월 02일');
    });
  });

  describe('# ExtsDate.add 기능 확인', () => {
    it('ExtsDate.format({ date: "2020-01-02", format: "YYYY년 MM월" }) - 결과값은 "2020년 01월" 이 된다.', () => {
      const result = ExtsDate.format({ date: '2020-01-02"', format: 'YYYY년 MM월' });
      expect(result).toEqual('2020년 01월');
    });

    it('ExtsDate.format({ date: "2020-01-02", format: "YYYY년 MM월 DD일" }) - 결과값은 "2020년 01월 02일" 이 된다.', () => {
      const result = ExtsDate.format({ date: '2020-01-02"', format: 'YYYY년 MM월 DD일' });
      expect(result).toEqual('2020년 01월 02일');
    });
  });

});
