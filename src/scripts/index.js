import '../pages/index.css'
import { initialCards } from './components.js/cards'
import { renderCard } from './components.js/card'
import modal from './components.js/modal'

const { openModal, closeModal, getFormElements } = modal;


const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const cardMethods = {
  deleteCard(card) {
    card.remove()
  },
  toggleLiked(card) {
    card.classList.toggle('card__like-button_is-active');
  },
  openPopupImage(link, name) {
    const popupImage = document.querySelector('.popup_type_image ');

    const image = popupImage.querySelector('.popup__image');
    const caption = popupImage.querySelector('.popup__caption');

    image.src = link;
    image.alt = name;
    caption.textContent = name;

    openModal(popupImage);

  }
}

initOfCard('append');

const addCardBtn = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = popupNewCard.querySelector('.popup__form')
addCardBtn.addEventListener('click', evt => {
  popupNewCardForm.reset();

  openModal(popupNewCard);
})

popupNewCardForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const formElements = getFormElements(popupNewCardForm);

  cardList.prepend(renderCard(
    cardTemplate,
    { name: formElements['place-name'].value, link: formElements.link.value },
    cardMethods))

  closeModal();
})

const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
profileEditBtn.addEventListener('click', evt => {
  const { name, description } = getFormElements(popupEditForm);

  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;

  openModal(popupEdit);
})


popupEditForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const { name, description } = getFormElements(popupEditForm);

  profileTitle.textContent = name.value;
  profileDescription.textContent = description.value;

  closeModal();
})


function initOfCard(method) {
  initialCards.forEach(card => {
    cardList[method](renderCard(cardTemplate, card, cardMethods));
  })
}


