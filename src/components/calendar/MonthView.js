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
  const { useStartDay, startDay, start, end, viewDateClick, viewEventClick } = props;

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
      {Array(7).fill(1).map((_, index) => {
        const value = start + index;
        const prevDate = (useStartDay && index < startDay);
        const isDimmed = value > end || prevDate;
        let title = isDimmed ? value % end : value;
        const listener = _ => handleClick(title);
        const eventListner = (date, text) => handleEventClick(date, text);
        const content = index % 3 === 0 ? getEvents(index, title, eventListner) : null;
        return (
          <Col className={isDimmed ? 'is-dimmed' : ''} span={3} key={`view-${title}`} onClick={listener}>
            <Card className="temp-card" title={title} bordered={false}>{ content }</Card>
          </Col>
        );
      })}
    </Row>
  );
}

MonthViewList.defaultProps = {
  start: 1,
  end: 31,
  viewDateClick: () => {},
  viewEventClick: () => {}
}

const MonthView = props => {
  const { startDay, endDate, onDateClick, onEventClick } = props;

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


  const weeks = Array(6).fill(1).map((value, index) => value + (index * 7));

  return (
    <div className="calendar-view">
      <MonthViewHeader />
      <div onDragOver={dragOver}>
        {weeks.map((value, index) => {
          return (
            <MonthViewList key={`list-${value}`} 
              useStartDay={index === 0}
              startDay={startDay}
              start={value}
              end={endDate}
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
  startDay: 0,
  endDate: 31,
  onDateClick: () => {},
  onEventClick: () => {}
}

export default MonthView;
