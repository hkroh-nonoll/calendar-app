import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { Modal, Button, Form, Input, DatePicker } from 'antd';

import ExtsDate from 'lib/extensions/ExtsDate';
  
/**
 * EventModal<br>일정 추가/수정/삭제 화면<br>
 * showTime 옵션 설정으로 불가피한 moment 디펜던시 발생
 * @alias components/calendar/EventModal
 * @module components/calendar/EventModal
 * 
 * @param {Object} props
 * @param {Boolean} [props.visible=false] model visible 여부
 * @param {String} [props.title=''] viewType Week 일 경우, 타이틀
 * @param {Date | String} [props.startAt=new Date()] 시작일
 * @param {Date | String} [props.endAt=ExtsDate.addHour({ date: new Date(), value: 1 })] 종료일
 * @param {Object | null} [props.showTime={format: 'HH'}] timepicker 옵션
 * @param {Function} [props.onConfirmClick=({ title, startAt, endAt }) => {}] 확인 버튼 클릭시
 * @param {Function} [props.onCancelClick=({ title, startAt, endAt }) => {}] 취소 버튼 클릭시
 * @param {Function} [props.onDeleteClick=({ title, startAt, endAt }) => {}] 삭제 버튼 클릭시
 * @param {Function} [props.onSubmit=({ title, startAt, endAt }) => {}] submit 시
 * 
 * @see https://ant.design/components/time-picker/#API
 * @see CALENDAR/VIEW_TYPE
 */
const EventModal = props => {
  const {
    visible,
    title,
    startAt,
    endAt,
    showTime,
    format,
    onConfirmClick,
    onCancelClick,
    onDeleteClick,
    onSubmit,
    eventEdit
  } = props;

  const titleRef = useRef(null);
  const [eventTitle, setEventTitle] = useState(title);
  const [eventStartAt, setEventStatAt] = useState(moment(startAt));
  const [eventEndAt, setEventEndAt] = useState(moment(endAt));

  const getEventData = () => {
    return { title: eventTitle, startAt: eventStartAt.toDate(), endAt: eventEndAt.toDate() };
  };

  const handleDeleteClick = _ => onDeleteClick(getEventData());
  const handleCancelClick = _ => onCancelClick(getEventData());
  const handleConfirmClick = _ => onConfirmClick(getEventData());
  const handleSubmit = _ => onSubmit(getEventData());

  useEffect(() => {
    if (titleRef) {
      // TODO: Ant Design 에서 구성되어 있어서, 시점상의 문제가 생겨 setTimeout 으로 처리 더 적절할 방법 고려
      setTimeout(() => {
        titleRef.current.input.focus();
      });
    }
  }, [titleRef]);

  return (
    <Modal
      title="일정 관리"
      visible={visible}
      onOk={handleConfirmClick}
      onCancel={handleCancelClick}
      footer={[
        eventEdit ? <Button key="delete" type="danger" onClick={handleDeleteClick}>Delete</Button> : null,
        <Button key="cancel" onClick={handleCancelClick}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleConfirmClick}>OK</Button>
      ]}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Item label="제목">
          <Input
            ref={titleRef}
            placeholder="일정 제목"
            defaultValue={title}
            onChange={e => setEventTitle(e.target.value)}
            onPressEnter={handleConfirmClick}
          />
        </Form.Item>
        <Form.Item label="시작">
          <DatePicker 
            showTime={showTime}
            defaultValue={moment(startAt)}
            format={format}
            onChange={value => setEventStatAt(value)}
          />
        </Form.Item>
        <Form.Item label="종료">
          <DatePicker 
            showTime={showTime}
            defaultValue={moment(endAt)}
            format={format}
            onChange={value => setEventEndAt(value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

EventModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  startAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  endAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]).isRequired,
  showTime: PropTypes.instanceOf(Object),
  format: PropTypes.string,
  onConfirmClick: PropTypes.func,
  onCancelClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onSubmit: PropTypes.func,
  eventEdit: PropTypes.any
}

EventModal.defaultProps = {
  visible: false,
  title: '',
  startAt: new Date(),
  endAt: ExtsDate.addHour({ date: new Date(), value: 1 }),
  showTime: {
    format: 'HH'
  },
  format: 'YYYY-MM-DD HH:mm',
  onConfirmClick: () => {},
  onCancelClick: () => {},
  onDeleteClick: () => {},
  onSubmit: () => {}
};

export default EventModal;
