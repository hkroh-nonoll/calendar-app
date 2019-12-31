import React, { useState, useCallback } from 'react';
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
  const { defaultDate } = props;

  const [month, setMonth] = useState(defaultDate);
  const [week] = useState(defaultDate);
  const [startDate, setStartDate] = useState(ExtsDate.startDateOfMonth({ date: month }));
  const [endDate, setEndDate] = useState(ExtsDate.endOfMonth({ date: month }));
  const [viewType, setViewType] = useState('month');
  const [createMode, setCreateMode] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [eventModalDate, setEventModalDate] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [visibleDates, setVisibleDates] = useState(ExtsDate.monthToArray({ date: month }));

  const updateMonth = month => {
    setStartDate(ExtsDate.startDateOfMonth({ date: month }));
    setEndDate(ExtsDate.endOfMonth({ date: month }));
    setVisibleDates(ExtsDate.monthToArray({ date: month }));
    setMonth(month);
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
    const selectedDate = moment(`${moment(month).format('YYYY-MM')}-${date}`);
    setCreateMode(true);
    setEventModalDate(selectedDate);
    setVisibleModal(true);
  }, [month]);

  const onEventClick = useCallback((date, text) => {
    console.log('Calendar onEventClick', date, text);
    const selectedDate = moment(`${moment(month).format('YYYY-MM')}-${date}`);
    setCreateMode(false);
    setEventModalDate(selectedDate);
    setModalTitle(text);
    setVisibleModal(true);
  }, [month]);

  const onModalConfirmClick = ({ title, startAt, endAt }) => {
    console.log('Calendar onModalConfirmClick', title, startAt, endAt);
    const diffTime = ExtsDate.diff(startAt, endAt);
    if (diffTime < 0) {
      openNotificationWithIcon({
        message: '입력 값을 확인하세요',
        description: '종료일은 시작일 이후 일자로 선택하세요.'
      });
    } else {
      setVisibleModal(false);
    }
  }

  const onModalCancelClick = () => {
    console.log('Calendar onCancelClick');
    setVisibleModal(false);
  }

  const onModalSubmit = () => {
    console.log('Calendar onModalSubmit');
  }

  useCallback(() => {
    return () => {
      setVisibleModal(false);
    }
  }, []);

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
        onDateClick={onDateClick}
        onEventClick={onEventClick}
      />

      <EventModal 
        visible={createMode && visibleModal}
        onConfirmClick={onModalConfirmClick}
        onCancelClick={onModalCancelClick}
        onSubmit={onModalSubmit}
      />

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
  defaultDate: new Date()
};

export default Calendar;
