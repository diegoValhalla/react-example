import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider, I18n } from 'react-i18next';
import i18n from '../../../config/i18n';

const I18nProvider = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <I18n>
      {() => ( // workaround to properly load i18n data before rendering react
        children
      )}
    </I18n>
  </I18nextProvider>
);
I18nProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default I18nProvider;
