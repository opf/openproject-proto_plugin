/**
 * Global scripts that will be executed on every page load
 * We recommend to use angular pages / components instead
 */

import { OpenProjectStimulusApplication } from 'core-stimulus/openproject-stimulus-application';

OpenProjectStimulusApplication.preregisterDynamic(
  'plugin-kitten',
  () => import('./stimulus/kitten.controller')
);
