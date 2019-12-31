import React, { useState, useCallback } from 'react';
import { Modal, Form, Input, DatePicker } from 'antd';
import moment from 'moment';

import KDate from '../../lib/date/KDate';

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

const kdate = new KDate();

const Calendar = () => {
  const [month, setMonth] = useState(kdate);
  const [week] = useState(kdate);
  const [startDate, setStartDate] = useState(kdate.startDateOfMonth(month));
  const [endDate, setEndDate] = useState(kdate.endOfMonth(month));
  const [viewType, setViewType] = useState('month');
  const [createMode, setCreateMode] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [eventModalDate, setEventModalDate] = useState(null);
  const [modalTitle, setModalTitle] = useState(null);
  const [visibleDates, setVisibleDates] = useState(kdate.monthToArray(month));

  const updateMonth = month => {
    setStartDate(kdate.startDateOfMonth(month));
    setEndDate(kdate.endOfMonth(month));
    setVisibleDates(kdate.monthToArray(month));
    setMonth(month);
  }

  const onPrevMonthClick = useCallback(_ => {
    console.log('Calendar onPrevMonthClick');
    const prevMonth = kdate.addMonth(-1, month);
    updateMonth(prevMonth);
  }, [month]);

  const onTodayClick = useCallback(_ => {
    console.log('Calendar onTodayClick');
    const today = new KDate();
    updateMonth(today);
  }, []);

  const onNextMonthClick = useCallback(_ => {
    console.log('Calendar onNextMonthClick');
    const nextMonth = kdate.addMonth(1, month);
    updateMonth(nextMonth);
  }, [month]);

  const onViewTypeChange = useCallback(value => {
    console.log('Calendar onViewTypeChange', value);
    setViewType(value);
  }, []);

  const onDateClick = useCallback(date => {
    console.log('Calendar onDateClick');
    const selectedDate = moment(`${month.format('YYYY-MM')}-${date}`);
    setCreateMode(true);
    setEventModalDate(selectedDate);
    setVisibleModal(true);
  }, [month]);

  const onEventClick = useCallback((date, text) => {
    console.log('Calendar onEventClick', date, text);
    const selectedDate = moment(`${month.format('YYYY-MM')}-${date}`);
    setCreateMode(false);
    setEventModalDate(selectedDate);
    setModalTitle(text);
    setVisibleModal(true);
  }, [month]);

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
        currentMonth={kdate.format('YYYY년 MM월', month)}
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
