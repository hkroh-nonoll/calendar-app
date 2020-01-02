import React, { useState, useEffect } from 'react';

import { Card, Row, Col } from 'antd';

import WeekViewHeader from 'components/calendar/WeekViewHeader';

// import EventModel from 'lib/models/Calendar/EventModel';
import WeekViewList from './WeekViewList';

const WeekView = props => {
  const { dates, startDate, endDate, onDateClick, onEventClick, events } = props;

  const handleDateClick = date => onDateClick(date);
  const handleEventClick = ({ date, event }) => onEventClick({ date, event });
  const dragOver = e => {
    // console.log('dragOver', e);
  }

  const [hourMarkerPos, setHourMarkerPos] = useState(0);
  const maxDayMilliseconds = 86400000;
  const renderDuration = 1000 * 1;
  // 23:28:21 GMT+0900 (한국 표준시) > 23:28
  const currentTime = new Date().toTimeString().replace(/.*(\d{2}:\d{2}):\d{2}.*/, '$1');

  const hourMarkerStyle = {
    position: 'absolute',
    width: '100%',
    display: 'table',
    top: hourMarkerPos
  };

  const lineStyle = {
    position: 'absolute',
    width: '100%',
    minHeight: 1,
    borderTop: '1px dashed #515ce6'
  };

  const getMillisecondsByDay = (hour, minute, second) => {
    return (hour * 60 * 60 * 1000) + (minute * 60 * 1000) + (second * 1000);
  }

  useEffect(() => {
    const hourMarkerRender = () => {
      const date = new Date();
      const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
      const currentDayMilliseconds = getMillisecondsByDay(hour, minute, second);
      const percent = (currentDayMilliseconds / maxDayMilliseconds * 100).toFixed(2);
      setHourMarkerPos(`${percent}%`);
    }
    hourMarkerRender();
    const markerTimeout = setInterval(() => hourMarkerRender, renderDuration);
    return () => clearInterval(markerTimeout);
  }, [renderDuration]);

  return (
    <div className="calendar-week">
      <WeekViewHeader />
      <Col type="flex" justify="start" align="top">
         <div onDragOver={dragOver}>
          <Row type="flex" justify="start" align="top">
            <Col span={3}>
              {Array(24).fill(1).map((_, index) => {
                const time = `${index}`.padStart(2, '0');
                return (
                  <Row key={`time-${index}`} className="calendar-date__event" type="flex" justify="start" align="top">
                    <Col span={24}>
                      <Card>{`${time}:00`}</Card>
                    </Col>
                  </Row>
                );
              })}
            </Col>
            {dates.map((week, index) => {
              return (
                <Col key={`time-${index}`} span={3}>
                  <WeekViewList key={`list-${index}`} 
                    useStartDay={index === 0}
                    startDate={startDate}
                    endDate={endDate}
                    week={week}
                    events={events}
                    viewDateClick={handleDateClick}
                    viewEventClick={handleEventClick}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
        <div style={{ ...hourMarkerStyle, top: hourMarkerPos }}>
          <Row>
            <Col span={3}>
              <span className="current-time">{currentTime}</span>
            </Col>
            <Col span={21}>
              <div style={lineStyle}><span className="blind">Today</span></div>
            </Col>
          </Row>
        </div>
      </Col>
    </div>
  );
}

WeekView.defaultProps = {
  onDateClick: () => {},
  onEventClick: () => {}
}

export default WeekView;
