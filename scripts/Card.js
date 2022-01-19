class Card {
    constructor(selector, name, link) {
        this._selector = selector;
        this._name = name;
        this._link = link;
    }

    _getItem() {
        return document
        .querySelector(this._selector)
        .content
        .querySelector(".element")
        .cloneNode(true);
    }

    _likeCard = () => {
        this._element.querySelector(".element__button").classList.toggle("element__button_active");
    }

    _deleteCard = () => {
        this._element.remove();
    }

    getView() {
        this._element = this._getItem();
        this._element.querySelector(".element__name").textContent = this._name;
        this._element.querySelector(".element__pic").src = this._link;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".element__button").addEventListener("click", _likeCard);
        this._element.querySelector(".element__delete-button").addEventListener("click", _deleteCard);
        //
    }
}

export default Card;