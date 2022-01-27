class Card {
    constructor(selector, name, link, openCard) {
        this._selector = selector;
        this._name = name;
        this._link = link;
        this._openCard = openCard;
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
        this._element = null;
    }

    getView() {
        this._element = this._getItem();
        this._element.querySelector(".element__name").textContent = this._name;
        const elementPic = this._element.querySelector(".element__pic");
        elementPic.alt = this._name + ".";
        elementPic.src = this._link;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".element__button").addEventListener("click", this._likeCard);
        this._element.querySelector(".element__delete-button").addEventListener("click", this._deleteCard);
        this._element.querySelector(".element__pic").addEventListener("click", () => {
            this._openCard(this._name, this._link);
        });
    }
}
export default Card;