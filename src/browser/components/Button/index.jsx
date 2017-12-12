import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Button = ({ children }) => (
  <button className="my-button">{children}</button>
);
Button.propTypes = {
  children: PropTypes.node,
};
Button.defaultProps = {
  children: null,
};

export default Button;
