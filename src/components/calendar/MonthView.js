import React from 'react';
import { Row, Col, Card } from 'antd';

import { DAY_NAME_WEEK, DAY_MILLISECONDS } from 'lib/constants/date';
import moment from 'moment';

const MonthViewHeader = () => {
  return (
    <Row className="calendar-header" type="flex" justify="start" align="top">
      {DAY_NAME_WEEK.map((day, index) => {
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
  const { onEventClick, date, title, startAt, endAt } = props;

  const handleClick = e => {
    e.stopPropagation();
    onEventClick({ date, title, startAt, endAt });
  }

  const dragStart = e => {
    // e.dataTransfer.effectAllowed = 'move';
    // e.dataTransfer.setData('text/html', this.dragged); 
    // console.log('dragStart', e);
  }
  
  const dragEnd = e => {
    // console.log('dragEnd', e);
  }

  return (
    <div 
      className="temp-event"
      onClick={handleClick}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
    >{ title }</div>
  );
}

const MonthViewList = props => {
  const { useStartDay, startDate, endDate, week, viewDateClick, viewEventClick, events } = props;

  const startDay = startDate.getDay();
  const endDateTime = endDate.getTime();

  const handleClick = date => {
    console.log('MonthViewList handleClick');
    viewDateClick(date);
  }

  const handleEventClick = (event, text) => {
    console.log('MonthViewList handleEventClick', event, text);
    viewEventClick(event, text);
  }

  const getEvents = (parentIndex, date, eventListner) => {
    // events.find()

    const hasEvents = events.filter(event => {
      const dateTime = date.getTime();
      const { startAt, endAt } = event;
      return +new Date(startAt) >= dateTime && +new Date(endAt) <= (dateTime + DAY_MILLISECONDS);
    });

    return (
      <>
        {hasEvents.map(event => {
          const { title, startAt, endAt } = event;
          return (
            <TempEvent 
              key={`event-${startAt}-${endAt}`}
              date={date}
              title={title}
              startAt={startAt}
              endAt={endAt}
              onEventClick={eventListner}
            />
          );
        })}
      </>
    );

    // const max = 5;
    // const min = 1;
    // const size = Math.floor(Math.random()*(max-min+1)) + min;
    // return Array(size).fill(1).map((_, index) => {
    //   return (
    //     <TempEvent key={`temp-event-${parentIndex}-${index}`} text={`일정 ${parentIndex}-${index}`} date={date} onEventClick={eventListner} />
    //   );
    // });
  }

  return (
    <Row className="calendar-date" type="flex" justify="start" align="top">
      {week.map((day, index) => {
        const value = day.getDate();
        const prevDate = (useStartDay && index < startDay);
        const isDimmed = day.getTime() > endDateTime || prevDate;
        const listener = _ => handleClick(day);
        const eventListner = (event, text) => handleEventClick(event, text);
        const event = getEvents(index, day, eventListner);

        // FIX 임시 처리
        const isToday = moment(new Date()).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD')
        const dateClassName = (() => {
          let className = '';
          className += isDimmed ? 'is-dimmed' : '';
          className += isToday ? 'temp-today' : '';
          return className;
        })();

        return (
          <Col 
            key={`view-${day}`}
            span={3}
            className={dateClassName}
            onClick={listener}
          >
            <Card className="temp-card" title={value} bordered={false}>{ event }</Card>
          </Col>
        );
      })}
    </Row>
  );
}

MonthViewList.defaultProps = {
  startDate: 1,
  endDate: 31,
  events: [],
  viewDateClick: () => {},
  viewEventClick: () => {}
}

const MonthView = props => {
  const { dates, startDate, endDate, onDateClick, onEventClick, events } = props;

  const handleDateClick = date => {
    console.log('MonthView handleDateClick', date);
    onDateClick(date);
  }

  const handleEventClick = (event, text) => {
    console.log('MonthView handleEventClick', event, text);
    onEventClick(event, text);
  }

  const dragOver = e => {
    // console.log('dragOver', e);
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
              events={events}
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
  events: [],
  onDateClick: () => {},
  onEventClick: () => {}
}

export default MonthView;
