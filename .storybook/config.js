import { configure, addDecorator } from '@storybook/react';

const requireContext = require.context('../src/browser/components', true, /\.stories\.jsx$/);

function loadStories() {
  requireContext
    .keys()
    .map(storyPath => requireContext(storyPath));
}

configure(loadStories, module);
