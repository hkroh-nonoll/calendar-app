import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Button, Typography, Radio } from 'antd';
import { VIEW_TYPE } from 'lib/constants/calendar';

const ButtonGroup = Button.Group;
const { Text } = Typography;

/**
 * ControlView<br><, >, 현재 월/주 표시, 월/주 전환 버튼
 * 
 * @alias components/calendar/ControlView
 * @module components/calendar/ControlView
 * 
 * @param {Object} props
 * @param {String} [props.currentMonth='YYYY년 MM월'] viewType Month 일 경우, 타이틀
 * @param {String} [props.currentWeek=VIEW_TYPE.MONTH] viewType Week 일 경우, 타이틀
 * @param {String} [props.defaultViewType=VIEW_TYPE.MONTH] 기본 화면 설정( 월 / 주 )
 * @param {Function} [props.onPrevClick=() => {}] " < " 버튼 클릭시
 * @param {Function} [props.onTodayClick=() => {}] "Today" 버튼 클릭시
 * @param {Function} [props.onNextClick=() => {}] " > " 버튼 클릭시
 * @param {Function} [props.onViewTypeChange=(viewType) => {}] "Month / Week" 버튼 클릭시 - viewType 전달
 * 
 * @see CALENDAR/VIEW_TYPE
 */
const ControlView = props => {
  const { currentMonth, currentWeek, viewType, onPrevClick, onTodayClick, onNextClick, onViewTypeChange } = props;

  const handlePrevClick = _ => onPrevClick();
  const handleTodayClick = _ => onTodayClick();
  const handleNextClick = _ => onNextClick();
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
  viewType: PropTypes.oneOf([
    VIEW_TYPE.MONTH,
    VIEW_TYPE.WEEK
  ]).isRequired,
  onPrevClick: PropTypes.func,
  onTodayClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onViewTypeChange: PropTypes.func
};

ControlView.defaultProps = {
  currentMonth: 'YYYY년 MM월',
  currentWeek: 'YYYY년 MM월 DD일 ~ YYYY년 MM월 DD일',
  viewType: VIEW_TYPE.MONTH,
  onPrevClick: () => {},
  onTodayClick: () => {},
  onNextClick: () => {},
  onViewTypeChange: () => {}
};

export default ControlView;
