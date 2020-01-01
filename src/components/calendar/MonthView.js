import PropTypes from 'prop-types';
import React from 'react';

import MonthViewHeader from 'components/calendar/MonthViewHeader';
import MonthViewList from 'components/calendar/MonthViewList';

import EventModel from 'lib/models/Calendar/EventModel';

const MonthView = props => {
  const { dates, startDate, endDate, onDateClick, onEventClick, events } = props;

  const handleDateClick = date => onDateClick(date);
  const handleEventClick = ({ date, event }) => onEventClick({ date, event });
  const dragOver = e => {
    // console.log('dragOver', e);
  }

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
