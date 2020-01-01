import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment';
import { Modal, Button, Form, Input, DatePicker } from 'antd';

import ExtsDate from '../../lib/extensions/ExtsDate';

const EventModal = props => {
  const { form, visible, onConfirmClick, onCancelClick, onDeleteClick, onSubmit, eventEdit, title, startAt, endAt, showTime, format } = props;

  const titleRef = useRef(null);
  const [eventTitle, setEventTitle] = useState(title);
  const [eventStartAt, setEventStatAt] = useState(moment(startAt));
  const [eventEndAt, setEventEndAt] = useState(moment(endAt));

  const getEventData = () => {
    // @see https://codepen.io/anon/pen/WLOrmq
    // form.resetFields();
    // console.log('form.resetFields', form.resetFields);
    return { form, title: eventTitle, startAt: eventStartAt.toDate(), endAt: eventEndAt.toDate() };
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

EventModal.defaultProps = {
  visible: false,
  title: '',
  startAt: new Date(),
  endAt: ExtsDate.addHour({ date: new Date(), value: 1 }),
  format: 'YYYY-MM-DD HH:mm',
  showTime: {
    format: 'HH'
  },
  onConfirmClick: () => {},
  onCancelClick: () => {},
  onSubmit: () => {}
};

// export default Form.create()(EventModal);
export default EventModal;
