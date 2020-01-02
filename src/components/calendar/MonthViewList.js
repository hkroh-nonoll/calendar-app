import PropTypes from 'prop-types';
import React from 'react';
import { Row, Col, Card } from 'antd';
import moment from 'moment';

import { DAY_MILLISECONDS } from 'lib/constants/date';
import EventModel from 'lib/models/Calendar/EventModel';

import EventView from 'components/calendar/EventView';

/**
 * Month type 에 보여지는 주단위, 일자영역 View 처리
 * 
 * @alias components/calendar/MonthViewList
 * @module components/calendar/MonthViewList
 * 
 * @requires components/calendar/EventView
 * 
 * @param {Object} props
 * @param {Boolean} props.useStartDay
 * @param {Date} props.startDate month 의 시작일 Date 객체
 * @param {Date} props.endDate month 의 마지막일 Date 객체
 * @param {Array.<Date>} props.week 해당 주의 Date 객체 리스트
 * @param {Array.<EventModel>} props.events view 에 노출할 events
 * @param {Function} [props.viewDateClick=(date) => {}] date 영역 클릭시
 * @param {Function} [props.viewEventClick=({ date, event }) => {}] eventView 영역 클릭시
 * 
 * @see EventModel
 */
const MonthViewList = props => {
  const {
    useStartDay,
    startDate,
    endDate,
    week,
    events,
    viewDateClick,
    viewEventClick,
  } = props;

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
  useStartDay: PropTypes.bool.isRequired,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  week: PropTypes.arrayOf(Date).isRequired,
  events: PropTypes.arrayOf(PropTypes.instanceOf(EventModel)).isRequired,
  viewDateClick: PropTypes.func,
  viewEventClick: PropTypes.func,
};

MonthViewList.defaultProps = {
  viewDateClick: () => {},
  viewEventClick: () => {}
};

export default MonthViewList;
