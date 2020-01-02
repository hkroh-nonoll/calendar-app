import PropTypes from 'prop-types';
import React from 'react';

import EventModel from 'lib/models/Calendar/EventModel';

/**
 * Month / Week 에 보여지는 Event View<br>클릭시 date, eventModal 을 전달
 * 
 * @alias components/calendar/EventView
 * @module components/calendar/EventView
 * 
 * @param {Object} props
 * @param {Date} props.date 해당 date
 * @param {EventModel} props.event eventModel
 * @param {Function} [props.onEventClick=({ date, event }) => {}] eventView 영역 클릭시
 * 
 * @see EventModel
 */
const EventView = props => {
  const { date, event, onEventClick } = props;
  const { title } = event.toModel();

  const handleClick = e => {
    e.stopPropagation();
    onEventClick({ date, event });
  }

  const dragStart = _ => {};
  const dragEnd = _ => {};

  return (
    <div 
      className="calendar-event"
      onClick={handleClick}
      draggable="true"
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      title={title}
    >{title}</div>
  );
}

EventView.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  event: PropTypes.instanceOf(EventModel).isRequired,
  onEventClick: PropTypes.func
};

EventView.defaultProps = {
  onEventClick: () => {}
};

export default EventView;
