import React, { useState, useCallback, useEffect } from 'react';
import moment from 'moment';

import { VIEW_TYPE } from 'lib/constants/calendar';
import ExtsDate from 'lib/extensions/ExtsDate';

import { openNotificationSuccess, openNotificationWarning } from 'components/notification';
import ControlView from 'components/calendar/ControlView';
import MonthView from 'components/calendar/MonthView';
import WeekView from 'components/calendar/WeekView';
import EventModal from 'components/calendar/EventModal';

import CalendarModel from 'lib/models/Calendar/CalendarModel';
import EventModel from 'lib/models/Calendar/EventModel';

import { CALENDAR_INVALID_ADD_EVENT, EVENT_INVALID_TIME_DIFF } from 'lib/constants/errorTypes';

const View = props => {
  const { viewType } = props;

  switch(viewType) {
    case VIEW_TYPE.WEEK:
      return <WeekView {...props} />;

    case VIEW_TYPE.MONTH:
    default:
      return <MonthView {...props} />;
  }
}

const calendarModel = new CalendarModel();


/**
 * Component Calendar
 * @component
 * @example
 * import Calendar from 'lib/models/Calendar/EventModel';
 * import EventModel from 'lib/models/Calendar/EventModel';
 * const defaultDate = new Date();
 * const events = [{ title: '일정1', startAt: '2019-12-31T10:00:00+09:00', endAt: '2019-12-31T11:00:00+09:00' }];
 * // const events = [new EventModel({ title: '일정2' })];
 * 
 * ...
 * return (
 *   <Calendar defaultDate={defaultDate} events={events} />
 * );
 * ...
 */
const Calendar = props => {
  const { defaultDate, events } = props;

  const [month, setMonth] = useState(defaultDate);
  const [week, setWeek] = useState(ExtsDate.startDateOfWeek({ date: defaultDate }));
  const [startDate, setStartDate] = useState(ExtsDate.startDateOfMonth({ date: month }));
  const [endDate, setEndDate] = useState(ExtsDate.endOfMonth({ date: month }));
  const [viewType, setViewType] = useState(VIEW_TYPE.WEEK);
  const [visibleModal, setVisibleModal] = useState(false);
  const [eventTitle, setEventTitle] = useState(null);
  const [eventStartAt, setEventStartAt] = useState(null);
  const [eventEndAt, setEventEndAt] = useState(null);
  const [eventEdit, setEventEdit] = useState(null);
  const [visibleDates, setVisibleDates] = useState(
    viewType === VIEW_TYPE.MONTH 
    ? ExtsDate.monthToArray({ date: month })
    : ExtsDate.weekToArray(week)
  );
  const [eventList, setEventList] = useState([]);

  const updateMonth = date => {
    const changeMonth = { date };
    setStartDate(ExtsDate.startDateOfMonth(changeMonth));
    setEndDate(ExtsDate.endOfMonth(changeMonth));
    setVisibleDates(ExtsDate.monthToArray(changeMonth));
    setMonth(date);
    setWeek(ExtsDate.startDateOfWeek(changeMonth));
  };

  const updateWeek = date => {
    const changeWeek = { date };
    setStartDate(ExtsDate.startDateOfMonth(changeWeek));
    setEndDate(ExtsDate.endOfMonth(changeWeek));
    setVisibleDates(ExtsDate.weekToArray(changeWeek));
    setMonth(date);
    setWeek(ExtsDate.startDateOfWeek(changeWeek));
  };

  const clearModal = _ => {
    setEventEdit(null);
    setVisibleModal(false);
  }

  const onCalendarPrevClick = useCallback(_ => {
    switch (viewType) {
      case VIEW_TYPE.WEEK:
        const prevWeek = ExtsDate.addWeek({ date: week, value: -1 });
        updateWeek(prevWeek);
        break;

      case VIEW_TYPE.MONTH:
      default:
        const prevMonth = ExtsDate.addMonth({ date: month, value: -1 });
        updateMonth(prevMonth);
        break;
    }
  }, [month, week, viewType]);

  const onCalendarTodayClick = useCallback(_ => {
    switch (viewType) {
      case VIEW_TYPE.WEEK:
        updateWeek(defaultDate);
        break;

      case VIEW_TYPE.MONTH:
      default:
        updateMonth(defaultDate);
        break;
    }
  }, [defaultDate, month, week, viewType]);

  const onCalendarNextClick = useCallback(_ => {
    switch (viewType) {
      case VIEW_TYPE.WEEK:
      default:
        const nextWeek = ExtsDate.addWeek({ date: week, value: 1 });
        console.log('nextWeek', nextWeek);
        updateWeek(nextWeek);
        break;

      case VIEW_TYPE.MONTH:
        const nextMonth = ExtsDate.addMonth({ date: month, value: 1 });
        updateMonth(nextMonth);
        break;
    }
  }, [month, week, viewType]);

  const onCalendarViewTypeChange = useCallback(value => {
    switch (value) {
      case VIEW_TYPE.WEEK:
        updateWeek(week);
        break;

      case VIEW_TYPE.MONTH:
      default:
        updateMonth(month);
        break;
    }
    setViewType(value);
  }, []);

  const onDateClick = useCallback(date => {
    const startAt = date;
    const endAt = ExtsDate.addHour({ date });

    setEventTitle('');
    setEventStartAt(startAt);
    setEventEndAt(endAt);
    setVisibleModal(true);
  }, []);

  const onEventClick = useCallback(({ date, event }) => {
    const { title, startAt, endAt } = event.toModel();

    setEventTitle(title);
    setEventStartAt(startAt);
    setEventEndAt(endAt);
    setEventEdit(event);
    setVisibleModal(true);
  }, []);

  const onModalConfirmClick = ({ form, title, startAt, endAt }) => {
    try {
      if (!eventEdit) {
        // 신규 생성시
        // TODO: moment 의존성 제거
        const newEvent = new EventModel({ title, startAt: moment(startAt).format(), endAt: moment(endAt).format() });
        calendarModel.addEvent(newEvent);
        setEventList(calendarModel.getEventList());
        openNotificationSuccess({ message: '일정이 추가되었습니다.' });
      } else {
        // 수정
        calendarModel.modifyEvent(Object.assign({}, eventEdit.toModel(), { title, startAt, endAt }));
        setEventList(calendarModel.getEventList());
        openNotificationSuccess({ message: '일정이 수정되었습니다.' });
      }
      clearModal();
    } catch (error) {
      // validate 에러 대응 처리
      switch (error.message) {
        case EVENT_INVALID_TIME_DIFF:
          openNotificationWarning({ message: '입력 값을 확인하세요', description: '종료일은 시작일 이후 일자로 선택하세요.' });
          break;

        case CALENDAR_INVALID_ADD_EVENT:
          openNotificationWarning({ message: '입력 값을 확인하세요.', description: '중복되는 일정이 있습니다.' });
          break;

        default:
          openNotificationWarning({ message: '입력 값을 확인하세요', description: '' });
          break;
      }
    }
  }

  const onModelDeleteClick = () => {
    calendarModel.deleteEvent(eventEdit);
    setEventList(calendarModel.getEventList());
    clearModal();
  }

  const onModalCancelClick = _ => clearModal();
  const onModalSubmit = _ => console.log('Calendar onModalSubmit');

  // TODO: memo 처리 가능할지, Model 연결 테스트 진행
  useEffect(() => {
    calendarModel.setEventList(CalendarModel.toEvents(events));
    setEventList(calendarModel.getEventList());
    return () => calendarModel && calendarModel.destroy();
  }, [events]);

  useEffect(() => {
    return () => {
      clearModal();
    }
  }, []);

  return (
    <div className="calendar">
      <ControlView 
        currentMonth={ExtsDate.format({ date: month, format: 'YYYY년 MM월' })}
        currentWeek={
          `
          ${ExtsDate.format({
              date: ExtsDate.startDateOfWeek({ date: week }),
              format: 'YYYY년 MM월 DD일'
            })
          }
          ~
          ${ExtsDate.format({
              date: ExtsDate.endDateOfWeek({ date: week }),
              format: 'YYYY년 MM월 DD일'
            })
          }
          `
        }
        viewType={viewType}
        onPrevClick={onCalendarPrevClick}
        onTodayClick={onCalendarTodayClick}
        onNextClick={onCalendarNextClick}
        onViewTypeChange={onCalendarViewTypeChange}
      />

      <View 
        currentMonth={month}
        currentWeek={week}
        viewType={viewType}
        startDate={startDate}
        endDate={endDate}
        week={week}
        dates={visibleDates}
        events={eventList}
        onDateClick={onDateClick}
        onEventClick={onEventClick}
      />
      
      {/* 임시 - 재갱신 처리 */}
      {visibleModal && 
        <EventModal 
          visible={visibleModal}
          title={eventTitle}
          startAt={eventStartAt}
          endAt={eventEndAt}
          eventEdit={eventEdit}
          onConfirmClick={onModalConfirmClick}
          onCancelClick={onModalCancelClick}
          onDeleteClick={onModelDeleteClick}
          onSubmit={onModalSubmit}
        />
      }
    </div>
  );
}

const dummyEvents = (() => {
  const date = new Date('2020-01-01T00:00:00');
  return Array(2).fill(1).map((_, value) => {
    return {
      title: `일정 - ${value}`,
      startAt: ExtsDate.addHour({ date, value: value }),
      endAt: ExtsDate.addHour({ date, value: value + 1 })
    }
  });

  // return [
  //   {
  //     title: '12월 31일 10 ~ 11시 일정',
  //     startAt: '2019-12-31T10:00:00+09:00',
  //     endAt: '2019-12-31T11:00:00+09:00'
  //   }
  // ];
})();

Calendar.defaultProps = {
  defaultDate: new Date(),
  events: dummyEvents
};

export default Calendar;
