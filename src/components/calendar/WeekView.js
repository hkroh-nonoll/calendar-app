import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import { Card, Row, Col } from 'antd';

import ExtsDate from 'lib/extensions/ExtsDate';
import EventModel from 'lib/models/Calendar/EventModel';

import WeekViewHeader from 'components/calendar/WeekViewHeader';
import WeekViewList from 'components/calendar/WeekViewList';

/**
 * Week type 에 보여지는 View 처리
 * 
 * @alias components/calendar/WeekView
 * @module components/calendar/WeekView
 * 
 * @requires components/calendar/WeekViewHeader
 * @requires components/calendar/WeekViewList
 * 
 * @param {Object} props
 * @param {Date} props.startDate 주의 시작일 Date 객체
 * @param {Date} props.endDate 주의 마지막일 Date 객체
 * @param {Array.<Date>} props.dates view 에 노출할 Date 객체
 * @param {Array.<EventModel>} props.events view 에 노출할 events
 * @param {Function} [props.onDateClick=(date) => {}] date 영역 클릭시
 * @param {Function} [props.onEventClick=({ date, event }) => {}] eventView 영역 클릭시
 * 
 * @see EventModel
 */
const WeekView = props => {
  const {
    startDate,
    endDate,
    dates,
    events,
    onDateClick,
    onEventClick
  } = props;

  const handleDateClick = date => onDateClick(date);
  const handleEventClick = ({ date, event }) => onEventClick({ date, event });
  const dragOver = _ => {};

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

  useEffect(() => {
    const hourMarkerRender = () => {
      const date = new Date();
      const [hour, minute, second] = [date.getHours(), date.getMinutes(), date.getSeconds()];
      const currentDayMilliseconds = ExtsDate.getMillisecondsByDay({ hour, minute, second });
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


WeekView.propTyps = {
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))).isRequired,
  events: PropTypes.arrayOf(PropTypes.instanceOf(EventModel)).isRequired,
  onDateClick: PropTypes.func,
  onEventClick: PropTypes.func,
};

WeekView.defaultProps = {
  onDateClick: () => {},
  onEventClick: () => {}
};

export default WeekView;
