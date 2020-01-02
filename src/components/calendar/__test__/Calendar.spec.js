import React from 'react';
import { render } from '@testing-library/react';

import Calendar from 'components/calendar/Calendar';
import { VIEW_TYPE } from 'lib/constants/calendar';

describe('# components/calendar/Calendar Spec Test', () => {
  
  describe('# Calendar 의 기본 렌더링 확인', () => {
    // 기본 viewType 은, VIEW_TYPE.MONTH
    it('VIEW_TYPE.MONTH: "2020년 01월" 텍스트가 존재한다.', () => {
      const defaultDate = new Date('2020-01-02T20:00:00');
      const { getByText } = render(<Calendar defaultDate={defaultDate} />);
      const text = getByText(/2020년 01월/i);
      expect(text).toBeInTheDocument();
    });

    it('VIEW_TYPE.WEEK: "2019년 12월 29일 ~ 2020년 01월 04일" 텍스트가 존재한다.', () => {
      const defaultDate = new Date('2020-01-02T20:00:00');
      const { getByText } = render(<Calendar defaultDate={defaultDate} defaultViewType={VIEW_TYPE.WEEK} />);
      const text = getByText(/2019년 12월 29일 ~ 2020년 01월 04일/i);
      expect(text).toBeInTheDocument();
    });

    it('VIEW_TYPE.MONTH: event를 등록하면 화면에 존재한다.', () => {
      const defaultDate = new Date('2020-01-02T20:00:00');
      const events = [{ title: 'event-mont', startAt: '2020-01-02T10:00:00+09:00', endAt: '2020-01-02T11:00:00+09:00' }];
      const { getByText } = render(<Calendar defaultDate={defaultDate} events={events} />);
      const text = getByText(/event-mont/i);
      expect(text).toBeInTheDocument();
    });

    it('VIEW_TYPE.WEEK: event를 등록하면 화면에 존재한다.', () => {
      const defaultDate = new Date('2020-01-02T20:00:00');
      const events = [{ title: 'event-week', startAt: '2020-01-02T10:00:00+09:00', endAt: '2020-01-02T11:00:00+09:00' }];
      const { getByText } = render(<Calendar defaultDate={defaultDate} defaultViewType={VIEW_TYPE.WEEK} events={events} />);
      const text = getByText(/event-week/i);
      expect(text).toBeInTheDocument();
    });
  });

});
