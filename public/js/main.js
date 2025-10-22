//Main file
//Unused imports. delete soon or else.
// import updateProgressBar from './utils/progressbar.js';
// import { setupAwakening } from "./skills/cultivation.js"
// import { setupTraining, updateText } from "./skills/training.js"
// import {getMagicPower} from './player/playerData.js';
// import { makeDraggable } from './utils/draggable.js';
// import { training } from './modules/training.js';


// import { loadGame } from './game/saveload.js';
import { startGame } from './game/game.js';

document.addEventListener('DOMContentLoaded', function() {
    setup();
})

//On load
function setup() {
    console.log('loading');
    startGame();
}













