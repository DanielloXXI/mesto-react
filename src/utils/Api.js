class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
            headers: this._headers
        })
            .then(handleResponse)

    }

    getInfoAboutUser() {
        return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
            headers: this._headers
        })
            .then(handleResponse)
    }

    setInfoAboutUser(name, about) {
        return fetch('https://nomoreparties.co/v1/cohort-60/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(handleResponse)
    }

    addUserCard(name, link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-60/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(handleResponse)
    }

    setAvatar(link) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-60/users/me/avatar ', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(handleResponse)
    }

    deleteCard(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(handleResponse)
    }

    setLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(handleResponse)
    }

    deleteLike(id) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-60/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(handleResponse)
    }
}

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(new Error("Произошла ошибка"));
}

const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
    headers: {
        authorization: '48b58e5a-be8c-4485-9062-09b4931dcf92',
        'Content-Type': 'application/json'
    }
}

const api = new Api(config);

export default api;