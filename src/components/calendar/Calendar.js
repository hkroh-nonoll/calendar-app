import React, { useState, useCallback } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

import { currentDate, addMonth, startOfMonthDay, daysInMonth } from '../../util/date';

import ControlView from './ControlView';
import MonthView from './MonthView';
import WeekView from './WeekView';

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

const Calendar = () => {
  const [month, setMonth] = useState(currentDate());
  const [week] = useState(currentDate());
  const [startDay, setStartDay] = useState(startOfMonthDay(month));
  const [endDate, setEndDate] = useState(daysInMonth(month));
  const [viewType, setViewType] = useState('month');
  const [createMode, setCreateMode] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [eventModalDate, setEventModalDate] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);

  const onPrevMonthClick = useCallback(_ => {
    const prevMonth = addMonth({ date: month, value: -1 });
    setStartDay(startOfMonthDay(prevMonth));
    setEndDate(daysInMonth(prevMonth));
    setMonth(prevMonth);
  }, [month]);

  const onTodayClick = useCallback(_ => {
    console.log('Calendar onTodayClick');
    const today = currentDate();
    setStartDay(startOfMonthDay(today));
    setEndDate(daysInMonth(today));
    setMonth(today);
  }, []);

  const onNextMonthClick = useCallback(_ => {
    console.log('Calendar onNextMonthClick');
    const nextMonth = addMonth({ date: month, value: 1 });
    setStartDay(startOfMonthDay(nextMonth));
    setEndDate(daysInMonth(nextMonth));
    setMonth(nextMonth);
  }, [month]);

  const onViewTypeChange = useCallback(value => {
    console.log('Calendar onViewTypeChange', value);
    setViewType(value);
  }, [month]);

  const onDateClick = useCallback(date => {
    console.log('Calendar onDateClick');
    const selectedDate = moment(`${month.format('YYYY-MM')}-${date}`);
    setCreateMode(true);
    setEventModalDate(selectedDate);
    setVisibleModal(true);
  }, [month, week]);

  const onEventClick = useCallback((date, text) => {
    console.log('Calendar onEventClick', date, text);
    const selectedDate = moment(`${month.format('YYYY-MM')}-${date}`);
    setCreateMode(false);
    setEventModalDate(selectedDate);
    setModalTitle(text);
    setVisibleModal(true);
  }, [month, week]);

  const handleModalOk = () => {
    console.log('Calendar handleModalOk');
    setVisibleModal(false);
  }

  const handleModalCancel = () => {
    console.log('Calendar handleModalCancel');
    setVisibleModal(false);
  }

  useCallback(() => {
    return () => {
      setVisibleModal(false);
    }
  }, []);

  return (
    <div className="calendar">
      <ControlView 
        currentMonth={month.format('YYYY년 MM월')}
        onPrevMonthClick={onPrevMonthClick}
        onTodayClick={onTodayClick}
        onNextMonthClick={onNextMonthClick}
        onViewTypeChange={onViewTypeChange}
      />

      <View 
        currentMonth={month}
        currentWeek={week}
        viewType={viewType}
        startDay={startDay}
        endDate={endDate}
        onDateClick={onDateClick}
        onEventClick={onEventClick}
      />

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
    </div>
  );
}

export default Calendar;
