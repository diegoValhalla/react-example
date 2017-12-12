import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore from '../config/store';
import App from './containers/App';
import { I18nProvider } from './hocs/i18n';

import '../stylesheet/style.css';

const store = configureStore();

const renderApp = Component => (
  // disable AppContainer warnings since hot loader didn't recognize them as
  // acceptable to load (e.g. hocs/i18n/withI18n). However, they work as
  // expected.
  render(
    <AppContainer warnings={false}>
      <BrowserRouter>
        <Provider store={store}>
          <I18nProvider>
            <Component />
          </I18nProvider>
        </Provider>
      </BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  )
);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const updatedApp = require('./containers/App').default; // eslint-disable-line
    renderApp(updatedApp);
  });

  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers').default; // eslint-disable-line
    store.replaceReducer(reducers);
  });
}

renderApp(App);
