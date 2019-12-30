import React, { useState, useEffect } from 'react';

import { Row, Col, Card } from 'antd';

const WeekViewHeader = () => {
  return (
    <Row className="calendar-header" type="flex" justify="start" align="top">
      {['시간', '일', '월', '화', '수', '목', '금', '토'].map((day, index) => {
        return (
          <Col span={3} key={`day-${index}`}>
            <Card title={day} bordered={false}></Card>
          </Col>
        );
      })}
    </Row>
  );
}


const WeekView = () => {
  const [hourMarkerPos, setHourMarkerPos] = useState(0);
  const maxDayMilliseconds = 86400000;
  const renderDuration = 1000 * 1;
  let markerTimeout;

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

  const getTimeInfo = (_date = new Date()) => {
    return {
      _date,
      year: _date.getFullYear(),
      month: _date.getMonth(),
      date: _date.getDate(),
      hour: _date.getHours(),
      minute: _date.getMinutes(),
      second: _date.getSeconds(),
      time: _date.getTime()
    };
  }

  const getMillisecondsByDay = (hour, minute, second) => {
    return (hour * 60 * 60 * 1000) + (minute * 60 * 1000) + (second * 1000);
  }

  const hourMarkerRender = () => {
    const currentTime = getTimeInfo();
    const { hour, minute, second } = currentTime;
    const currentDayMilliseconds = getMillisecondsByDay(hour, minute, second);
    const percent = (currentDayMilliseconds / maxDayMilliseconds * 100).toFixed(2);

    setHourMarkerPos(`${percent}%`);
    markerTimeout = setTimeout(hourMarkerRender, renderDuration);
  }

  useEffect(() => {
    hourMarkerRender();
    return () => {
      clearTimeout(markerTimeout);
    }
  }, []);

  return (
    <div className="calendar-week">
      <WeekViewHeader />
      <Col type="flex" justify="start" align="top">
        {Array(24).fill(1).map((_, index) => {
          return (
            <Row key={`time-${index}`} type="flex" justify="start" align="top">
              <Col span={3}>
                <Card bordered={false}>{index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
              <Col span={3}>
                <Card bordered={false}>일정 {index}</Card>
              </Col>
            </Row>
          );
        })}
        <div style={{ ...hourMarkerStyle, top: hourMarkerPos }}>
          <div style={lineStyle}><span className="blind">Today</span></div>
          {/* 
          <div><span className="blind">이전 일자 표현</span></div>
          <div><span className="blind">Today</span></div>
          <div><span className="blind">Today 영역</span></div>
          <div><span className="blind">다음 일자 표현</span></div>
          */}
        </div>
      </Col>
    </div>
  );
}

WeekView.defaultProps = {}

export default WeekView;
