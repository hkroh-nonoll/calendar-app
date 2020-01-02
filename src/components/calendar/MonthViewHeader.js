import React from 'react';
import { Row, Col, Card } from 'antd';

import { DAY_NAME_WEEK } from 'lib/constants/date';

/**
 * Month type 에 상단 영역 View 처리<br>일 ~ 토 표현 처리
 * 
 * @alias components/calendar/MonthViewHeader
 * @module components/calendar/MonthViewHeader
 * 
 * @see DATE/DAY_NAME_WEEK
 */
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

export default MonthViewHeader;
