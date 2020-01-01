import React from 'react';

import { Row, Col, Button, Typography, Radio } from 'antd';

const ButtonGroup = Button.Group;
const { Text } = Typography;

const ControlView = props => {
  const { currentMonth, viewType, onPrevMonthClick, onTodayClick, onNextMonthClick, onViewTypeChange } = props;

  const handlePrevClick = _ => {
    console.log('handlePrevClick');
    onPrevMonthClick();
  }

  const handleTodayClick = _ => {
    console.log('handleTodayClick');
    onTodayClick();
  }

  const handleNextClick = _ => {
    console.log('handleNextClick');
    onNextMonthClick();
  }

  const handleViewTypeChange = e => {
    const { value } = e.target;
    console.log('handleViewTypeChange', value);
    onViewTypeChange(value);
  }

  return (
    <>
      <Row type="flex" justify="space-between" align="middle">
        <Col span={7}>
          <ButtonGroup>
            <Button shape="circle" icon="left" onClick={handlePrevClick} />
            <Button onClick={handleTodayClick}>Today</Button>
            <Button shape="circle" icon="right" onClick={handleNextClick} />
          </ButtonGroup>
        </Col>
        <Col span={7}>
          {viewType === 'month' 
            ? <Text>{currentMonth}</Text>
            : <Text>{currentMonth} ~ {currentMonth}</Text>
          }
        </Col>
        <Col span={7}>
          <Radio.Group defaultValue={viewType} buttonStyle="solid" onChange={handleViewTypeChange}>
            <Radio.Button value="month">Month</Radio.Button>
            <Radio.Button value="week">Week</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    </>
  );
}

ControlView.defaultProps = {
  currentMonth: 'YYYY년 MM월',
  viewType: 'month',
  onPrevMonthClick: () => {},
  onTodayClick: () => {},
  onNextMonthClick: () => {},
  onViewTypeChange: () => {}
}

export default ControlView;
