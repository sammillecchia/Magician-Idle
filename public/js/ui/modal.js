//Modal = dialog/pop-up that is displayed above the current page
//Using this for offline progress and possibly game updates



export function createModal(offlineMP) {
  // Remove any existing modals from the DOM
  const removeModals = document.querySelectorAll('.modal');

  removeModals.forEach(element => {
    element.remove();
  });

  //create the new modal elements
  const modal = document.createElement('div');
  const modalContent = document.createElement('div');

  //set up the modal and its content
  modal.appendChild(modalContent);
  modal.classList.add('modal');
  modalContent.classList.add('modal-content');
  modalContent.textContent = `+MP: ${Math.floor(offlineMP)}`;

  // Append the modal to the body and make it visible
  document.body.appendChild(modal);
  modal.style.display = "block";

  //function that will close the modal when clicking outside content
  function closeModal(event) {
    if (event.target === modal) {
      modal.remove();
      modal.removeEventListener('click', closeModal);
    }
  }

  // Add the event listener to the modal
  modal.addEventListener('click', closeModal);
}