import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Hello from '../../containers/Hello';

export default () => (
  <Switch>
    <Route exact path="/" component={Hello} />
    <Route path="/about" render={() => <div>about</div>} />
    <Route render={() => <div>not found</div>} />
  </Switch>
);
