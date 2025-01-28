const TOKEN = '380f7e30-cdfc-4c3d-9a2a-a8caae145324';
const gruopId = 'wff-cohort-31'

const config = {
  baseUrl: `https://nomoreparties.co/v1/${gruopId}`,
  headers: {
    authorization: TOKEN,
    'Content-Type': 'application/json'
  }
}

const checkValidResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}


const getInitCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => checkValidResponse(res));
}


const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => checkValidResponse(res));
}


const editUserInfo = (userInfo) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(userInfo)
  })
    .then(res => checkValidResponse(res))
}

const editUserImage = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar: link})
  })
    .then(res => checkValidResponse(res));

}


const getServerData = () => {
  return Promise.all([getUserInfo(), getInitCards()])
}


const addCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData)
  })
    .then(res => checkValidResponse(res));

}


const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => checkValidResponse(res));

}


const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,
    {
      method: 'PUT',
      headers: config.headers
    }
  )
    .then(res => {
      return checkValidResponse(res);
    })
}


const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`,
    {
      method: 'DELETE',
      headers: config.headers
    }
  )
    .then(res => checkValidResponse(res));

}




const apiMethods = {
  getServerData,
  editUserInfo,
  editUserImage,
  addCard,
  deleteCard,
  putLike,
  deleteLike
}

export default apiMethods;