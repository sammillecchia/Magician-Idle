//handles menus FUCK

const menuList = ["training", "cultivation", "stats", "exploration"];

export const menus = {
    currentMenu: document.getElementById('trainingMenu'),

    allMenus: {
        training: document.getElementById('trainingMenu'),
        stats: document.getElementById('statsMenu'),
        exploration :document.getElementById('explorationMenu'),
        cultivation: document.getElementById('cultivationMenu'),
    },

    currentCultivationSubMenu: null,

    cultivationSubMenus: {
        awakening: null,
        element1: {
            cultivation: null,
            empowerment: null
        },
        element2: null,
        element3: null,
        element4: null,
        element5: null,
    }


}

//to display the cultivation page for the second element
//menus.currentCultivationSubMenu = menus.cultivationSubMenus.element2.cultivation;