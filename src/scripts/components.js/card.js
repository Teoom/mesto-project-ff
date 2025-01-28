export function renderCard(cardTemplate, card, methods, userId) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikeBtn = cardItem.querySelector('.card__like-button');
  const cardDeleteBtn = cardItem.querySelector('.card__delete-button');
  const cardLikeCount = cardItem.querySelector('.card__like-count');

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardImage.addEventListener('click', () => {
    methods.openPopupImage(card.link, card.name)
  })


  cardTitle.textContent = card.name;

  if (card.owner._id === userId || !userId) {
    cardDeleteBtn.addEventListener('click', () => {
      methods.deleteCard(card._id)
        .then(() => {
          cardItem.remove();
        })
        .catch(err => {
          console.log(err);
        })

    })

  } else {
    cardDeleteBtn.style.display = "none";
  }



  if (card.likes.length) {
    card.likes.forEach(like => {
      if (like._id === userId) {
        cardLikeBtn.classList.add('card__like-button_is-active')
      }
    })
  }


  cardLikeBtn.addEventListener('click', () => {
    if (cardLikeBtn.classList.contains('card__like-button_is-active')) {
      cardLikeBtn.classList.remove('card__like-button_is-active');
      methods.deleteLike(card._id)
        .then(card => {
          cardLikeCount.textContent = card.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      cardLikeBtn.classList.add('card__like-button_is-active');
      methods.putLike(card._id)
        .then(card => {
          cardLikeCount.textContent = card.likes.length;
        })
        .catch(err => {
          console.log(err);
        })
    }
  })

  cardLikeCount.textContent = card.likes.length;


  return cardItem;
}








