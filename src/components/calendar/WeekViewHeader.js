import React from 'react';
import { Row, Col, Card } from 'antd';

import { DAY_NAME_WEEK } from 'lib/constants/date';

/**
 * Week type 에 상단 영역 View 처리<br>시간 일 ~ 토 표현 처리
 * 
 * @alias components/calendar/WeekViewHeader
 * @module components/calendar/WeekViewHeader
 * 
 * @see DATE/DAY_NAME_WEEK
 */
const WeekViewHeader = () => {
  return (
    <Row className="calendar-header" type="flex" justify="start" align="top">
      {['시간', ...DAY_NAME_WEEK].map((day, index) => {
        return (
          <Col span={3} key={`day-${index}`}>
            <Card title={day} bordered={false}></Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default WeekViewHeader;
