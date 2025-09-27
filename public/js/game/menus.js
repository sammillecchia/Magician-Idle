//handles menus FUCK

const menuList = ["training", "cultivation", "stats", "exploration"];

export const menus = {
    currentMenu: document.getElementById('trainingMenu'),

    allMenus: {
        training: document.getElementById('trainingMenu'),
        stats: document.getElementById('statsMenu'),
        exploration: document.getElementById('explorationMenu'),
        cultivation: document.getElementById('cultivationMenu'),
    },

    currentCultivationSubMenu: document.getElementById('awakeningDisplay'),

    cultivationSubMenus: {
        awakening: {
            value: () => {return document.getElementById('awakeningDisplay')}
        },
        test: {
            value: () => {return document.getElementById('testDisplay')},
            gather: () => {return document.getElementById('gatherMenu1')},
            formation: () => {return document.getElementById('formationMenu1')}

        }
        // element1: () => {return document.getElementById('element1Display')},
        // element2: () => {return document.getElementById('element2Display')},
        // element3: () => {return document.getElementById('element3Display')},
        // element4: () => {return document.getElementById('element4Display')},
        // element5: () => {return document.getElementById('element5Display')}
    }


}

//to display the cultivation page for the second element
//menus.currentCultivationSubMenu = menus.cultivationSubMenus.element2.cultivation;