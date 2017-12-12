import React from 'react';
import path from 'path';
import { storiesOf } from '@storybook/react'; // eslint-disable-line

import Button from '.';

const STORY_NAME = path.basename(__dirname);

storiesOf(STORY_NAME, module)
  .add('default', () => (
    <Button>opa</Button>
  ));
