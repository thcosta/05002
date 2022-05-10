import { fillMain } from './modulo.js';

fillMain()

setInterval(function()
{
  fillMain()
}, 1000);

