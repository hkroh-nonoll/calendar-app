import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { Menu, Icon } from 'antd';

import IndexPage from 'pages/Index';
import CalendarPage from 'pages/Calendar';
import NotFoundPage from 'pages/NotFound';

const App = () => {
  const history = useHistory();

  const onMenuClick = e => {
    const { key } = e;
    history.push(key);
  }

  return (
    <>
      <Menu mode="horizontal" onClick={onMenuClick}>
        <Menu.Item key="/">
          <Icon type="home" />
        </Menu.Item>
        <Menu.Item key="/calendar">
          <Icon type="calendar" />calendar
        </Menu.Item>
        <Menu.Item key="/404">404</Menu.Item>
      </Menu>

      {/* 임시 여백 처리 */}
      <div>&nbsp;</div>

      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;