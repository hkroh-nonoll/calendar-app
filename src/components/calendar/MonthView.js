import PropTypes from 'prop-types';
import React from 'react';

import MonthViewHeader from 'components/calendar/MonthViewHeader';
import MonthViewList from 'components/calendar/MonthViewList';

import EventModel from 'lib/models/Calendar/EventModel';

/**
 * Month type 에 보여지는 View 처리
 * 
 * @alias components/calendar/MonthView
 * @module components/calendar/MonthView
 * 
 * @requires components/calendar/MonthViewHeader
 * @requires components/calendar/MonthViewList
 * 
 * @param {Object} props
 * @param {Date} props.currentMonth 해당 month Date 객체
 * @param {Date} props.startDate currentMonth 의 시작일 Date 객체
 * @param {Date} props.endDate currentMonth 의 마지막일 Date 객체
 * @param {Array.<Date>} props.dates view 에 노출할 Date 객체
 * @param {Array.<EventModel>} props.events view 에 노출할 events
 * @param {Function} [props.onDateClick=(date) => {}] date 영역 클릭시
 * @param {Function} [props.onEventClick=({ date, event }) => {}] eventView 영역 클릭시
 * 
 * @see EventModel
 */
const MonthView = props => {
  const { dates, startDate, endDate, onDateClick, onEventClick, events } = props;

  const handleDateClick = date => onDateClick(date);
  const handleEventClick = ({ date, event }) => onEventClick({ date, event });
  const dragOver = _ => {};

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
    </div>
  );
}

MonthView.propTypes = {
  currentMonth: PropTypes.instanceOf(Date).isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  dates: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))).isRequired,
  events: PropTypes.arrayOf(PropTypes.instanceOf(EventModel)).isRequired,
  onDateClick: PropTypes.func,
  onEventClick: PropTypes.func,
};

MonthView.defaultProps = {
  onDateClick: () => {},
  onEventClick: () => {}
}

export default MonthView;
