import { basename } from 'path';

const requireContext = require.context('.', false, /\.json$/);

export const getLocales = () =>
  requireContext
    .keys()
    .reduce((locales, fileName) => {
      const locale = basename(fileName).replace(/\.json$/, '');
      locales[locale] = requireContext(fileName); // eslint-disable-line

      return locales;
    }, {});

export default getLocales();
