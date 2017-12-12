import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'; // eslint-disable-line
import { apiMiddleware } from 'redux-api-middleware';

import reducers from '../../browser/reducers';

const configureStore = (initialState = {}) => {
  const composeEnhancers = composeWithDevTools({});
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(apiMiddleware)),
  );
};

export default configureStore;
