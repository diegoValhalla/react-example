import React from 'react';

export default propsToOmit => WrappedComponent => (props) => {
  const filteredProps = Object
    .keys(props)
    .reduce((memo, prop) => {
      if (propsToOmit.includes(prop)) {
        return memo;
      }

      memo[prop] = props[prop]; // eslint-disable-line
      return memo;
    }, {});

  return <WrappedComponent {...filteredProps} />;
};
