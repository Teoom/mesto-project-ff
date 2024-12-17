import '../pages/index.css'
import '../images/avatar.jpg'
import '../images/logo.svg'
import { initialCards } from './cards' 

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
initCards()

const addCardBtn = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector('.popup_type_new-card');

addCardBtn.addEventListener("click", () => {
  popupDisplay(popupNewCard)
})


const popupNewCardBtn = getPopupElement(popupNewCard, ".popup__close")
popupNewCardBtn.addEventListener("click", () => {
  popupDisplay(popupNewCard);
})

const popupNewCardForm = getPopupElement(popupNewCard, ".popup__form")
popupNewCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  cardList.append(renderCard({ name: evt.target[0].value, link: evt.target[1].value }))

  evt.target[0].value = "";
  evt.target[1].value = "";

  popupDisplay(popupNewCard);

})


// Ренденр карточки
function renderCard(card) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardItem.querySelector(".card__image")
  const cardDeleteBtn = cardItem.querySelector(".card__delete-button")
  const cardTitle = cardItem.querySelector(".card__title")

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardTitle.textContent = card.name;

  cardDeleteBtn.addEventListener("click", () => {
    deleteCard(cardDeleteBtn.closest(".places__item"))
  })

  return cardItem;
}

// Удалене карточки
function deleteCard(card) {
  card.remove()
}

// Иницилизация карточек
function initCards() {
  initialCards.forEach(card => {
    cardList.append(renderCard(card));
  })
}

// Получаем элемент определённого попапа
function getPopupElement(parentPopup, className) {
  return parentPopup.querySelector(`${className}`)
}

// Закрытие/открытие попапа
function popupDisplay(popup) {
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}
