import PropTypes from 'prop-types';
import React from 'react';

import EventModel from 'lib/models/Calendar/EventModel';

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
