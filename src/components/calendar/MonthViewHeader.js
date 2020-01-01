import React from 'react';
import { Row, Col, Card } from 'antd';

import { DAY_NAME_WEEK } from 'lib/constants/date';

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
