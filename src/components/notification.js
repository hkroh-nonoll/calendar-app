import { notification } from 'antd';

export const openNotificationSuccess = ({ message = '', description = '' }) => notification['success']({ message, description });
export const openNotificationWarning = ({ message = '', description = '' }) => notification['warning']({ message, description });
