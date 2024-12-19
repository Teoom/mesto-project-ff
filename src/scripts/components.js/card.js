


export function renderCard(cardTemplate, card, methods) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardDeleteBtn = cardItem.querySelector('.card__delete-button');
  const cardLikeBtn = cardItem.querySelector('.card__like-button');



  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => {
    methods.openPopupImage(card.link, card.name)
  })


  cardTitle.textContent = card.name;

  cardDeleteBtn.addEventListener('click', () => {
    methods.deleteCard(cardItem)
  })

  cardLikeBtn.addEventListener('click', () => {
    methods.toggleLiked(cardLikeBtn)
  })


  return cardItem;
}








