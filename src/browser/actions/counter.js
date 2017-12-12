import {
  COUNTER_INCREMENT,
  COUNTER_DECREMENT,
} from '../../config/store/constants';

export const increment = () => ({
  type: COUNTER_INCREMENT,
});

export const decrement = () => ({
  type: COUNTER_DECREMENT,
});
