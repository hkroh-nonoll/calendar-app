import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Typography, Radio } from 'antd';
import { VIEW_TYPE } from 'lib/constants/calendar';

const ButtonGroup = Button.Group;
const { Text } = Typography;

const ControlView = props => {
  const { currentMonth, currentWeek, viewType, onPrevMonthClick, onTodayClick, onNextMonthClick, onViewTypeChange } = props;

  const handlePrevClick = _ => onPrevMonthClick();
  const handleTodayClick = _ => onTodayClick();
  const handleNextClick = _ => onNextMonthClick();
  const handleViewTypeChange = e => onViewTypeChange(e.target.value);

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
          {viewType === VIEW_TYPE.MONTH ? <Text>{currentMonth}</Text> : <Text>{currentWeek}</Text>}
        </Col>
        <Col span={7}>
          <Radio.Group defaultValue={viewType} buttonStyle="solid" onChange={handleViewTypeChange}>
            <Radio.Button value={VIEW_TYPE.MONTH}>Month</Radio.Button>
            <Radio.Button value={VIEW_TYPE.WEEK}>Week</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    </>
  );
}

ControlView.propTypes = {
  currentMonth: PropTypes.string,
  currentWeek: PropTypes.string,
  viewType: PropTypes.string.isRequired,
  onPrevMonthClick: PropTypes.func,
  onTodayClick: PropTypes.func,
  onNextMonthClick: PropTypes.func,
  onViewTypeChange: PropTypes.func
};

ControlView.defaultProps = {
  currentMonth: 'YYYY년 MM월',
  currentWeek: 'YYYY년 MM월 DD일 ~ YYYY년 MM월 DD일',
  viewType: VIEW_TYPE.MONTH,
  onPrevMonthClick: () => {},
  onTodayClick: () => {},
  onNextMonthClick: () => {},
  onViewTypeChange: () => {}
};

export default ControlView;
