
const cardList = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;
initCards()


const addCardBtn = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector('.popup_type_new-card');

addCardBtn.addEventListener("click", () => {
  popupDisplay(popupNewCard)
})

const popupClose = getPopupElement(popupNewCard, ".popup__close")
popupClose.addEventListener("click", () => {
  popupDisplay(popupNewCard);
})

const popupForm = getPopupElement(popupNewCard, ".popup__form")
popupForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  cardList.append(renderCard({ name: evt.target[0].value, link: evt.target[1].value }))

  evt.target[0].value = "";
  evt.target[1].value = "";

  popupDisplay(popupNewCard);

})


// Ренденр карточки
function renderCard(card) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  // заместо const cardImage = cardItem.children[0]; const cardDeleteBtn = cardItem.children[1]... 
  const [cardImage, cardDeleteBtn, cardDescription] = cardItem.children;

  cardImage.src = card.link;
  cardDescription.textContent = card.name;

  cardDeleteBtn.addEventListener("click", () => {
    deleteCard(cardDeleteBtn)
  })

  return cardItem;
}

// Удалене карточки
function deleteCard(card) {
  card.parentElement.remove()
}

// Иницилизация карточек
function initCards() {
  initialCards.forEach(card => {
    cardList.append(renderCard(card));
  })
}

// Получаем элемент определённого
function getPopupElement(parentPopup, className) {
  return parentPopup.querySelector(`${className}`)
}

// Закрытие/открытие попапа
function popupDisplay(popup) {
  popup.style.display = popup.style.display === "flex" ? "none" : "flex";
}