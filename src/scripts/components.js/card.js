const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];


export function renderCard(cardTemplate, card) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);

  const cardImage = cardItem.querySelector(".card__image")
  const cardDeleteBtn = cardItem.querySelector(".card__delete-button")
  const cardTitle = cardItem.querySelector(".card__title")

  cardImage.src = card.link;
  cardImage.alt = card.name;

  cardTitle.textContent = card.name;

  cardDeleteBtn.addEventListener("click", () => {
    deleteCard(cardItem)
  })

  return cardItem;
}

export function initCards(parentElement, cardTemplate) {
  initialCards.forEach(card => {
    parentElement.append(renderCard(cardTemplate, card));
  })
}

function deleteCard(card) {
  card.remove()
}




