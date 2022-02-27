export default class Api {
    constructor({address, token}) {
        this._address = address;
        this._token = token;
    }

    _handleResponse = (res) => {
        if (res.ok) {
            return res.json()
        }
        return Promise.reject(`Error ${res.status}`)
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => this._handleResponse(res))
    }

    getUserInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: {
                authorization: this._token
            }
        })
        .then((res) => this._handleResponse(res))
    }

    editProfile(newValue) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newValue.name,
              about: newValue.about
            })
        })
        .then((res) => this._handleResponse(res))
    }

    editAvatar(newValue) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              avatar: newValue.link
            })
        })
        .then((res) => this._handleResponse(res))
    }

    postCard(newValue) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newValue.name,
              link: newValue.link
            })
        })
        .then((res) => this._handleResponse(res))
    }

    likeCard(idCard) {
        return fetch(`${this._address}/cards/${idCard}/likes`, {
            method: 'PUT',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
        })
        .then((res) => this._handleResponse(res))
    }

    unlikeCard(idCard) {
        return fetch(`${this._address}/cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
        })
        .then((res) => this._handleResponse(res))
    }

    deleteCard(idCard) {
        return fetch(`${this._address}/cards/${idCard}`, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            }
        })
        .then((res) => this._handleResponse(res))
    }
}