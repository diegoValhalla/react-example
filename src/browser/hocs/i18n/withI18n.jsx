/**
 * There is a bug in react-hot-loader that it is not recognizing this hoc as
 * a valid component. Please, check for more reference: https://github.com/gaearon/react-hot-loader/blob/master/docs/Troubleshooting.md#react-hot-loader-this-component-is-not-accepted-by-hot-loader
 */

import React from 'react';
import { translate as translateI18n } from 'react-i18next';
import compose from '../../helpers/compose';

const hocI18n = keysToTranslate => WrappedComponent => (props) => {
  const { t: translate, i18n } = props; // eslint-disable-line

  const filteredProps = Object.assign({}, props);
  delete filteredProps.t;
  delete filteredProps.i18n;

  if (typeof keysToTranslate === 'object') {
    Object
      .keys(keysToTranslate)
      .map((key) => {
        const paramsFunc = keysToTranslate[key];
        const translateParams = (typeof paramsFunc === 'function') ?
          paramsFunc.call(null, filteredProps) : [''];

        filteredProps[key] = translate(...translateParams);

        return null;
      });
  }

  return <WrappedComponent {...filteredProps} />;
};

const hocChangeLanguage = WrappedComponent => (props) => {
  const { i18n } = props; // eslint-disable-line
  const filteredProps = Object.assign({}, props, {
    changeLanguage: i18n.changeLanguage.bind(i18n),
  });

  delete filteredProps.t;
  delete filteredProps.i18n;

  return <WrappedComponent {...filteredProps} />;
};

export const withI18n = keysToTranslate => compose(
  translateI18n(),
  hocI18n(keysToTranslate),
);

export const withChangeLanguage = () => compose(
  translateI18n(),
  hocChangeLanguage,
);
