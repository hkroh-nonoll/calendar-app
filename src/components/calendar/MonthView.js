import React from 'react';

import { Row, Col, Card } from 'antd';

const MonthViewHeader = () => {
  return (
    <Row className="calendar-header" type="flex" justify="start" align="top">
      {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => {
        return (
          <Col span={3} key={`day-${index}`}>
            <Card title={day} bordered={false}></Card>
          </Col>
        );
      })}
    </Row>
  );
}

const TempEvent = props => {
  const { onEventClick, date, text } = props;
  const handleClick = e => {
    e.stopPropagation();
    onEventClick(date, text);
  }

  const dragStart = e => {
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', this.dragged); 
    console.log('dragStart', e);
  }
  
  const dragEnd = e => {
    console.log('dragEnd', e);
  }

  return (
    <div onClick={handleClick}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >{ text }</div>
  );
}

const MonthViewList = props => {
  const { useStartDay, startDate, endDate, week, viewDateClick, viewEventClick } = props;

  const startDay = startDate.getDay();
  const endDateTime = endDate.getTime();

  const handleClick = date => {
    console.log('MonthViewList handleClick');
    viewDateClick(date);
  }

  const handleEventClick = (date, text) => {
    console.log('MonthViewList handleEventClick', date, text);
    viewEventClick(date, text);
  }

  const getEvents = (parentIndex, date, eventListner) => {
    const max = 5;
    const min = 1;
    const size = Math.floor(Math.random()*(max-min+1)) + min;
    return Array(size).fill(1).map((_, index) => {
      return (
        <TempEvent key={`temp-event-${parentIndex}-${index}`} text={`일정 ${parentIndex}-${index}`} date={date} onEventClick={eventListner} />
      );
    });
  }

  return (
    <Row className="calendar-date" type="flex" justify="start" align="top">
      {week.map((day, index) => {
        const value = day.getDate();
        const prevDate = (useStartDay && index < startDay);
        const isDimmed = day.getTime() > endDateTime || prevDate;
        const listener = _ => handleClick(day);
        const eventListner = (date, text) => handleEventClick(date, text);
        const content = index % 3 === 0 ? getEvents(index, day, eventListner) : null;
        return (
          <Col className={isDimmed ? 'is-dimmed' : ''} span={3} key={`view-${day}`} onClick={listener}>
            <Card className="temp-card" title={value} bordered={false}>{ content }</Card>
          </Col>
        );
      })}
    </Row>
  );
}

MonthViewList.defaultProps = {
  startDate: 1,
  endDate: 31,
  viewDateClick: () => {},
  viewEventClick: () => {}
}

const MonthView = props => {
  const { dates, startDate, endDate, onDateClick, onEventClick } = props;

  const handleDateClick = date => {
    console.log('MonthView handleDateClick', date);
    onDateClick(date);
  }

  const handleEventClick = (date, text) => {
    console.log('MonthView handleEventClick', date, text);
    onEventClick(date, text);
  }

  const dragOver = e => {
    console.log('dragOver', e);
  }


  // const weeks = Array(6).fill(1).map((value, index) => value + (index * 7));

  return (
    <div className="calendar-view">
      <MonthViewHeader />
      <div onDragOver={dragOver}>
        {dates.map((week, index) => {
          return (
            <MonthViewList key={`list-${index}`} 
              useStartDay={index === 0}
              startDate={startDate}
              endDate={endDate}
              week={week}
              viewDateClick={handleDateClick}
              viewEventClick={handleEventClick}
            />
          );
        })}
      </div>
      {/* <DatePicker /> */}
    </div>
  );
}

MonthView.defaultProps = {
  startDate: 1,
  endDate: 31,
  onDateClick: () => {},
  onEventClick: () => {}
}

export default MonthView;
