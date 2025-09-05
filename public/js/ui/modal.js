//Modal = dialog/pop-up that is displayed above the current page
//Using this for offline progress and possibly game updates


export function createModal(offlineMP) {
    //create modal divs
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');

    modal.appendChild(modalContent);
    //apply styling
    modal.classList.add('modal');
    modalContent.classList.add('modal-content');

    //add text to modalContent
    modalContent.textContent = `+MP: ${offlineMP}`;

    //append to body
    document.body.appendChild(modal);
    modal.style.display = "block";

    //event listener to close modal if you click outside the modalContent
    modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
}