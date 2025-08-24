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
    startGame();
}





//TODO: delete

// makeDraggable(document.getElementById('statsDisplay'));


// let currentMenu = trainingMenu

// export function displayMenu(menu) {
//     currentMenu.style.display = "none";
//     menu.style.display = "flex";S
//     currentMenu = menu;
// }


// const body = document.body;



// let cultivationMenuUnlocked = 0;
// function checkMilestones() {
//     if (magicPower > 999) { //should  be higher
//         if (cultivationMenuUnlocked == 0) {
//             cultivationMenuButton.style.display = "grid";
//         }
//         cultivationMenuUnlocked = 1;
//     }
// }





