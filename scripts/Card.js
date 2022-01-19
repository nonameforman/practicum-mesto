class Card {
    constructor(selector, name, link) {
        this._selector = selector;
        this._name = name;
        this._link = link;
        // this._alt = alt;
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
        //
        return this._element;
    }

    // _setEventListeners() {}
}

export default Card;