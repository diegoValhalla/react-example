import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import locales from '../locales';

/**
 * Why i18next? Another option would be react-intl, however it takes more steps
 * to configure an environment and add more dependencies to the project.
 *
 * For i18next, 'translation' is the default namespace, which means that all
 * locales must have this key before all translations. That's what it is done
 * on 'resources' property.
 *
 * For example:
 *
 * {
 *   en: {
 *     translations: { 'hi': Hello }
 *   }
 * }
 *
 * The load of locale data must be improved. Only the current user laguage must
 * be loaded and if it changes, then the new data should be reloaded.
 */

const resourceData = Object.keys(locales).reduce((data, locale) => {
  data[locale] = { translation: locales[locale] }; // eslint-disable-line
  return data;
}, {});

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    resources: resourceData,
    fallbackLng: 'en',
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      bindStore: 'added removed',
      nsMode: 'default',
    },
  });

export default i18n;
