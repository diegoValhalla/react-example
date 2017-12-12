import { basename } from 'path';
import { combineReducers } from 'redux';

const requireContext = require.context('.', true, /^(?!.*index\.js$).*\.js$/);

export const getCombinedReducers = () => {
  const reducers = requireContext
    .keys()
    .reduce((obj, fileName) => {
      // storeState = { reducerFileName: reducerState }
      const name = basename(fileName, '.js');
      obj[name] = requireContext(fileName).default; // eslint-disable-line no-param-reassign
      return obj;
    }, {});

  return combineReducers(reducers);
};

export default getCombinedReducers();
