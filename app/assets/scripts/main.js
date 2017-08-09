'use strict';
import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

require('../styles/main.scss');
require.context('../graphics/', true, /\.(png|jpg|jpeg|gif|svg|ico)$/);
require.context('../fonts/', true, /\.(eot|svg|ttf|woff|woff2)$/);

import Header from './components/header';
import Home from './views/home';
import UhOh from './views/uhoh';

render((
  <div>
    <Header />
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route component={UhOh} />
      </Switch>
    </HashRouter>
  </div>
), document.body.appendChild(document.createElement('main')));
