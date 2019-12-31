import React, { useState, useCallback, useEffect } from 'react';
import { notification } from 'antd';
import moment from 'moment';

import ExtsDate from 'lib/extensions/ExtsDate';

import ControlView from 'components/calendar/ControlView';
import MonthView from 'components/calendar/MonthView';
import WeekView from 'components/calendar/WeekView';
import EventModal from 'components/calendar/EventModal';

const openNotificationWithIcon = ({ message = '', description = '' }) => {
  notification['warning']({ message, description });
};

const View = props => {
  const { viewType } = props;

  switch(viewType) {
    case 'week':
      return <WeekView {...props} />;
    case 'month':
    default:
      return <MonthView {...props} />;
  }
}

const Calendar = props => {
  const { defaultDate, events } = props;

  const [month, setMonth] = useState(defaultDate);
  const [week] = useState(defaultDate);
  const [startDate, setStartDate] = useState(ExtsDate.startDateOfMonth({ date: month }));
  const [endDate, setEndDate] = useState(ExtsDate.endOfMonth({ date: month }));
  const [viewType, setViewType] = useState('month');
  const [createMode, setCreateMode] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [eventTitle, setEventTitle] = useState(null);
  const [eventStartAt, setEventStartAt] = useState(null);
  const [eventEndAt, setEventEndAt] = useState(null);
  const [visibleDates, setVisibleDates] = useState(ExtsDate.monthToArray({ date: month }));
  const [eventList, setEventList] = useState(events);

  const updateMonth = month => {
    setStartDate(ExtsDate.startDateOfMonth({ date: month }));
    setEndDate(ExtsDate.endOfMonth({ date: month }));
    setVisibleDates(ExtsDate.monthToArray({ date: month }));
    setMonth(month);
  }

  const clearModal = () => {
    setEventTitle('');
    setVisibleModal(false);
  }

  const onPrevMonthClick = useCallback(_ => {
    console.log('Calendar onPrevMonthClick');
    const prevMonth = ExtsDate.addMonth({ date: month, value: -1 });
    updateMonth(prevMonth);
  }, [month]);

  const onTodayClick = useCallback(_ => {
    console.log('Calendar onTodayClick');
    updateMonth(defaultDate);
  }, [defaultDate]);

  const onNextMonthClick = useCallback(_ => {
    console.log('Calendar onNextMonthClick');
    const nextMonth = ExtsDate.addMonth({ date: month, value: 1 });
    updateMonth(nextMonth);
  }, [month]);

  const onViewTypeChange = useCallback(value => {
    console.log('Calendar onViewTypeChange', value);
    setViewType(value);
  }, []);

  const onDateClick = useCallback(date => {
    console.log('Calendar onDateClick');
    // const selectedDate = moment(`${moment(month).format('YYYY-MM')}-${date}`).format();
    // console.log('selectedDate', selectedDate, month, date);
    
    const startAt = date;
    const endAt = ExtsDate.addHour({ date });

    setEventTitle('');
    setEventStartAt(startAt);
    setEventEndAt(endAt);
    setVisibleModal(true);
  }, [month]);

  const onEventClick = useCallback(event => {
    // console.log('Calendar onEventClick', date, text);
    const { title, startAt, endAt } = event;
    console.log('Calendar onEventClick', title, startAt, endAt);
    // const selectedDate = moment(`${moment(month).format('YYYY-MM')}-${date}`);
    setEventTitle(title);
    setEventStartAt(startAt);
    setEventEndAt(endAt);
    setVisibleModal(true);
  }, [month]);

  const onModalConfirmClick = ({ form, title, startAt, endAt }) => {
    console.log('Calendar onModalConfirmClick', title, startAt, endAt);
    const diffTime = ExtsDate.diff(startAt, endAt);
    if (diffTime < 0) {
      openNotificationWithIcon({
        message: '입력 값을 확인하세요',
        description: '종료일은 시작일 이후 일자로 선택하세요.'
      });
      // TODO - eventList 중복 일자 검증 처리
      return;
    }

    const newEvent = {
      title,
      startAt: moment(startAt).format(),
      endAt: moment(endAt).format()
    };
    const list = eventList.concat([newEvent]);

    setEventList(list);
    clearModal();
  }

  const onModalCancelClick = () => {
    console.log('Calendar onCancelClick');
    clearModal();
  }

  const onModalSubmit = () => {
    console.log('Calendar onModalSubmit');
  }

  useEffect(() => {
    return () => {
      clearModal();
    }
  }, []);

  console.log('eventList', eventList);

  return (
    <div className="calendar">
      <ControlView 
        currentMonth={ExtsDate.format({ date: month, format: 'YYYY년 MM월' })}
        onPrevMonthClick={onPrevMonthClick}
        onTodayClick={onTodayClick}
        onNextMonthClick={onNextMonthClick}
        onViewTypeChange={onViewTypeChange}
      />

      <View 
        currentMonth={month}
        currentWeek={week}
        viewType={viewType}
        startDate={startDate}
        endDate={endDate}
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
          onConfirmClick={onModalConfirmClick}
          onCancelClick={onModalCancelClick}
          onSubmit={onModalSubmit}
        />
      }

{/* 
      <Modal
        title="일정 관리"
        visible={createMode && visibleModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form onSubmit={() => {}}>
          <Form.Item label="제목">
            <Input placeholder="일정 제목" />
          </Form.Item>
          <Form.Item label="시작">
            <DatePicker showTime defaultValue={eventModalDate} value={eventModalDate} format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item label="종료">
            <DatePicker showTime defaultValue={eventModalDate} value={eventModalDate} format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="일정 관리"
        visible={!createMode && visibleModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Form onSubmit={() => {}}>
          <Form.Item label="제목">
            <Input placeholder="일정 제목" defaultValue={!createMode && modalTitle} />
          </Form.Item>
          <Form.Item label="시작">
            <DatePicker showTime defaultValue={eventModalDate} value={eventModalDate} format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item label="종료">
            <DatePicker showTime defaultValue={eventModalDate} value={eventModalDate} format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>
      </Modal>
       */}
    </div>
  );
}

Calendar.defaultProps = {
  defaultDate: new Date(),
  events: [
    {
      title: '12월 31일 10 ~ 11시 일정',
      startAt: '2019-12-31T10:00:00+09:00',
      endAt: '2019-12-31T11:00:00+09:00'
    }
  ]
};

export default Calendar;
