import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import imgExample from '../../../assets/landscape.png';

import './style.css';

const Hello = ({
  helloText,
  timeText,
  changeLanguage,
  counter,
  incrementCounter,
}) => (
  <div className="hello">
    {helloText}
    <div className="text">Hello from react</div>
    <img src={imgExample} alt="" className="my-img" />
    <button onClick={() => changeLanguage('en')}>en</button>
    <button onClick={() => changeLanguage('pt-BR')}>pt</button>
    <button onClick={() => incrementCounter()}>test {counter}</button>
    <Button>test</Button>
    <div>
      {timeText}
    </div>
  </div>
);
Hello.propTypes = {
  changeLanguage: PropTypes.func.isRequired,
  helloText: PropTypes.string.isRequired,
  timeText: PropTypes.string.isRequired,
  counter: PropTypes.number.isRequired,
  incrementCounter: PropTypes.func.isRequired,
};

export default Hello;
