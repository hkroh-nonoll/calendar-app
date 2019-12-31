import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

import IndexPage from 'pages/Index';
import CalendarPage from 'pages/Calendar';
import NotFoundPage from 'pages/NotFound';

const App = () => {
  return (
    <>
      {/* 임시 페이지 이동 테스트 */}
      <div>
        <Link to="/">
          <button>index</button>
        </Link>
        <Link to="/calendar">
          <button>calendar</button>
        </Link>
        <Link to="/404">
          <button>404</button>
        </Link>
      </div>

      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default App;