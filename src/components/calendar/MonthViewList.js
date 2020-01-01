import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Card } from 'antd';
import moment from 'moment';

import { DAY_MILLISECONDS } from 'lib/constants/date';
import EventView from 'components/calendar/EventView';

const MonthViewList = props => {
  const { useStartDay, startDate, endDate, week, viewDateClick, viewEventClick, events } = props;

  const startDay = startDate.getDay();
  const endDateTime = endDate.getTime();

  const handleClick = date => viewDateClick(date);
  const handleEventClick = (event, text) => viewEventClick(event, text);

  const getEvents = (date, eventListner) => {
    const hasEvents = events.filter(event => {
      const dateTime = date.getTime();
      const { startAt, endAt } = event.toModel();
      return +new Date(startAt) >= dateTime && +new Date(endAt) <= (dateTime + DAY_MILLISECONDS);
    });

    return (
      <>
        {hasEvents.map(event => {
          const { uuid } = event.toModel();
          return (
            <EventView 
              key={uuid}
              date={date}
              event={event}
              onEventClick={eventListner}
            />
          );
        })}
      </>
    );
  }

  return (
    <Row className="calendar-date" type="flex" justify="start" align="top">
      {week.map((day, index) => {
        const value = day.getDate();
        const prevDate = (useStartDay && index < startDay);
        const isDimmed = day.getTime() > endDateTime || prevDate;
        const listener = _ => handleClick(day);
        const eventListner = (event, text) => handleEventClick(event, text);
        const event = getEvents(day, eventListner);

        // FIXME: 임시 처리
        const isToday = moment(new Date()).format('YYYY-MM-DD') === moment(day).format('YYYY-MM-DD');
        const dateClassName = (() => {
          let className = '';
          className += isDimmed ? 'is-dimmed' : '';
          className += isToday ? 'is-today' : '';
          return className;
        })();

        return (
          <Col 
            key={`view-${day}`}
            span={3}
            className={dateClassName}
            onClick={listener}
          >
            <Card className="calendar-date__event" title={value} bordered={false}>{ event }</Card>
          </Col>
        );
      })}
    </Row>
  );
}

MonthViewList.propTypes = {
  viewDateClick: PropTypes.func,
  viewEventClick: PropTypes.func,
};

MonthViewList.defaultProps = {
  viewDateClick: () => {},
  viewEventClick: () => {}
}

export default MonthViewList;
