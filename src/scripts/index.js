import '../pages/index.css'
import { renderCard } from './components.js/card'
import modal from './components.js/modal'
import validation from './components.js/validation'
import apiMethods from './components.js/api'



const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

const cardMethods = {
  putLike: apiMethods.putLike,
  deleteLike: apiMethods.deleteLike,
  deleteCard: apiMethods.deleteCard,
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



const { openModal, closeModal, getFormElements } = modal;
const { enableValidation, clearValidation } = validation;



const addCardBtn = document.querySelector('.profile__add-button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardForm = popupNewCard.querySelector('.popup__form')
const newCardFormButton = popupNewCardForm.querySelector('.popup__button');

addCardBtn.addEventListener('click', () => {
  popupNewCardForm.reset();
  clearValidation(popupNewCardForm);
  newCardFormButton.textContent = "Сохранить"
  openModal(popupNewCard);
})

popupNewCardForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const formElements = getFormElements(popupNewCardForm);
  const newCard = {
    name: formElements['place-name'].value,
    link: formElements.link.value
  }

  apiMethods.addCard(newCard)
    .then(card => {
      cardList.prepend(renderCard(cardTemplate, card, cardMethods))
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      newCardFormButton.textContent = "Сохраняем...";
      closeModal();
    })


})



const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupEdit.querySelector('.popup__form');
const editFormButton = popupEditForm.querySelector('.popup__button');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

profileEditBtn.addEventListener('click', () => {
  const { name, description } = getFormElements(popupEditForm);
  name.value = profileTitle.textContent;
  description.value = profileDescription.textContent;

  clearValidation(popupEditForm);
  editFormButton.textContent = "Сохранить";
  openModal(popupEdit);
})


popupEditForm.addEventListener('submit', evt => {
  evt.preventDefault();
  const { name, description } = getFormElements(popupEditForm);

  apiMethods.editUserInfo({ name: name.value, about: description.value })
    .then(userInfo => {
      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      editFormButton.textContent = "Сохранение...";
      closeModal();
    })



})


const profileImage = document.querySelector('.profile__image');
const popupProfileImage = document.querySelector('.popup_type_profile-image');
const profileImageForm = popupProfileImage.querySelector('.popup__form');
const imageFormButton = profileImageForm.querySelector('.popup__button');

profileImage.addEventListener('click', () => {
  profileImageForm.reset();
  clearValidation(profileImageForm);
  imageFormButton.textContent = "Сохранить";
  openModal(popupProfileImage);
})

profileImageForm.addEventListener('submit', evt => {
  evt.preventDefault();

  const { image } = getFormElements(profileImageForm);

  apiMethods.editUserImage(image.value)
    .then(userInfo => {
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      imageFormButton.textContent = "Сохранение...";
      closeModal();
    })
  
})

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});



apiMethods.getServerData()
  .then(data => {
    const [user, cards] = data;
    profileImage.style.backgroundImage = `url(${user.avatar})`;
    profileTitle.textContent = user.name;
    profileDescription.textContent = user.about;


    cards.forEach(card => {
      cardList.append(renderCard(cardTemplate, card, cardMethods, user._id));
    })
  })