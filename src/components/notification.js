import { notification } from 'antd';

/**
 * notification
 * @alias components/notification
 * @module components/notification
 */

/**
 * notification - success
 * @see https://ant.design/components/notification/#API
 * @param {Object} data
 * @param {String} [data.message='']
 * @param {String} [data.description='']
 */
export const openNotificationSuccess = ({ message = '', description = '' }) => notification['success']({ message, description });

/**
 * notification - warning
 * @see https://ant.design/components/notification/#API
 * @param {Object} data
 * @param {String} [data.message='']
 * @param {String} [data.description='']
 */
export const openNotificationWarning = ({ message = '', description = '' }) => notification['warning']({ message, description });
