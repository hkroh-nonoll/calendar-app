import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import CalendarPage from 'pages/Calendar';
import NotFoundPage from 'pages/NotFound';

const App = () => {
  const history = useHistory();

  const onMenuClick = e => {
    const { key } = e;

    if (key === '/jsdoc') {
      console.log('process.env.REACT_APP_JS_DOC_URL', process.env.REACT_APP_JS_DOC_URL);
      window.open(process.env.REACT_APP_JS_DOC_URL);
      return;
    }

    history.push(key);
  }

  return (
    <>
      <Menu mode="horizontal" selectedKeys={'/'} onClick={onMenuClick}>
        <Menu.Item key="/">
          <Icon type="calendar" />calendar
        </Menu.Item>
        <Menu.Item key="/jsdoc">
          <Icon type="book" />JS Doc
        </Menu.Item>
      </Menu>

      <Switch>
        <Route exact path="/" component={CalendarPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;