import { handleActions } from 'redux-actions';
import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
} from '../../config/store/constants';

const initialState = {
  value: 0,
};

export default handleActions({
  [COUNTER_INCREMENT]: state => ({
    value: state.value + 1,
  }),
  [COUNTER_DECREMENT]: state => ({
    value: state.value - 1,
  }),
}, initialState);
