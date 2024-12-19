const modal = {
  element: '',
  openModal(element) {
    element.classList.remove('popup_is-animated');
    element.classList.add('popup_is-opened');

    modal.element = element;

    element.addEventListener('mousedown', modal.overlayCloseModal) 

    const closeButton = element.querySelector('.popup__close');
    closeButton.addEventListener('click', modal.closeModal)

    document.body.addEventListener('keydown', modal.keyCloseModal);
  },
  closeModal() {
    modal.element.classList.remove('popup_is-opened');
    modal.element.classList.add('popup_is-animated');

    const closeButton = modal.element.querySelector('.popup__close');

    modal.element.removeEventListener('mousedown', modal.overlayCloseModal);
    closeButton.removeEventListener('click', modal.closeModal);
    document.body.removeEventListener('keydown', modal.keyCloseModal);    
  },
  keyCloseModal(evt) {
    if(evt.key === "Escape") {
      modal.closeModal();
    }
  },
  overlayCloseModal(evt) {
    if(evt.target.classList.contains('popup')) {
      modal.closeModal();
    }
  },
  getFormElements(form) {
    const arrOfElements = [...form.elements]

    return arrOfElements.reduce((acc, item) => {
      acc[item.name] = item;
      return acc;
    }, {})
  }
}

export { modal as default }







