import {makeProject} from '@motion-canvas/core';

import start from './scenes/start?scene';
import quicksort from './scenes/quicksort?scene';
import bubble_sort from './scenes/bubble_sort?scene';

import audio from './audio/bread.mp3';

import './global.css';

export default makeProject({
  scenes: [
    start,
    bubble_sort,
    quicksort
  ],
  audio
});
