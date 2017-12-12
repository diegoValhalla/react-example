import { connect } from 'react-redux';

import { increment } from '../../actions/counter';
import compose from '../../helpers/compose';
import { withI18n, withChangeLanguage } from '../../hocs/i18n';
import Hello from '../../components/Hello';

export default compose(
  withI18n({
    helloText: () => ['hi'],
    timeText: () => ['time', { time: Date() }],
  }),
  withChangeLanguage(),
  connect(
    ({ counter }) => ({
      counter: counter.value,
      propToRemove: 123,
    }),
    dispatch => ({
      incrementCounter: () => dispatch(increment()),
    }),
  ),
)(Hello);
