import { openPopup } from "./index.js";

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

    _openCard = () => {
        const popupFullPic = document.querySelector("#popup_pic-fullscreen");
        popupFullPic.querySelector(".popup__image").src = this._link;
        popupFullPic.querySelector(".popup__image").alt = this._name + ".";
        popupFullPic.querySelector(".popup__capture").textContent = this._name;
        openPopup(popupFullPic);
    }

    getView() {
        this._element = this._getItem();
        this._element.querySelector(".element__name").textContent = this._name;
        this._element.querySelector(".element__pic").alt = this._name + ".";
        this._element.querySelector(".element__pic").src = this._link;
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector(".element__button").addEventListener("click", this._likeCard);
        this._element.querySelector(".element__delete-button").addEventListener("click", this._deleteCard);
        this._element.querySelector(".element__pic").addEventListener("click", this._openCard);
    }
}
export default Card;