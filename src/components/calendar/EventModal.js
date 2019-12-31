import React, { useState } from 'react';
import moment from 'moment';
import { Modal, Form, Input, DatePicker } from 'antd';

import ExtsDate from '../../lib/extensions/ExtsDate';

const EventModal = props => {
  const { form, visible, onConfirmClick, onCancelClick, onSubmit, title, startAt, endAt, format } = props;

  const [eventTitle, setEventTitle] = useState(title);
  const [eventStartAt, setEventStatAt] = useState(moment(startAt));
  const [eventEndAt, setEventEndAt] = useState(moment(endAt));

  const getEventData = () => {
    // @see https://codepen.io/anon/pen/WLOrmq
    // form.resetFields();
    // console.log('form.resetFields', form.resetFields);
    return { form, title: eventTitle, startAt: eventStartAt.toDate(), endAt: eventEndAt.toDate() };
  };

  const handleConfirmClick = _ => onConfirmClick(getEventData());
  const handleCancelClick = _ => onCancelClick(getEventData());
  const handleSubmit = _ => onSubmit(getEventData());

  return (
    <Modal
      title="일정 관리"
      visible={visible}
      onOk={handleConfirmClick}
      onCancel={handleCancelClick}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Item label="제목">
          <Input
            placeholder="일정 제목"
            defaultValue={eventTitle}
            onChange={e => setEventTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="시작">
          <DatePicker 
            showTime
            defaultValue={moment(startAt)}
            format={format}
            onChange={value => setEventStatAt(value)}
          />
        </Form.Item>
        <Form.Item label="종료">
          <DatePicker 
            showTime
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
  onConfirmClick: () => {},
  onCancelClick: () => {},
  onSubmit: () => {}
};

export default Form.create()(EventModal);
