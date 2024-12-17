import '../pages/index.css'
import '../images/avatar.jpg'
import '../images/logo.svg'
import { initCards, renderCard } from './components.js/card' 

const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

initCards(cardList, cardTemplate)

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

  cardList.append(renderCard(cardTemplate,{ name: evt.target[0].value, link: evt.target[1].value }))

  evt.target[0].value = "";
  evt.target[1].value = "";

  popupDisplay(popupNewCard);

})


// Ренденр карточки


// Удалене карточки

// Иницилизация карточек


// Получаем элемент определённого попапа
function getPopupElement(parentPopup, className) {
  return parentPopup.querySelector(`${className}`)
}

// Закрытие/открытие попапа
function popupDisplay(popup) {
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}
