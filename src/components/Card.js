class Card {
    constructor(selector, data, idUser, openCard, deleteCard, likeCard) {
        this._selector = selector;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._idCard = data._id;
        this._idOwner = data.owner._id;
        this._idUser = idUser;
        this._openCard = openCard;
        this._deleteCard = deleteCard;
        this._likeCard = likeCard;
        this._isLiked = data.likes.some(item => item._id === this._idUser);
    }
    
    _getItem() {
        return document
        .querySelector(this._selector)
        .content
        .querySelector(".element")
        .cloneNode(true);
    }

    like (data) {
        this._likeCounter.textContent = data.likes.length;
        this._isLiked = !this._isLiked;
        if (this._isLiked) { 
            this._likeButton.classList.add("element__button_active");
        } else {
            this._likeButton.classList.remove('element__button_active');
        }
    }

    getIsLiked() {
        return this._isLiked;
    }

    delete() {
        this._element.remove();
        this._element = null;
    }

    getView() {
        this._element = this._getItem();
        this._likeButton = this._element.querySelector(".element__button");
        this._likeCounter = this._element.querySelector(".element__like-counter");
        this._deleteButton = this._element.querySelector(".element__delete-button");
        this._element.querySelector(".element__name").textContent = this._name;
        this._likeCounter.textContent = this._likes.length;
        this._elementPic = this._element.querySelector(".element__pic");
        this._elementPic.alt = this._name + ".";
        this._elementPic.src = this._link;
        if (this._idOwner !== this._idUser) {
            this._deleteButton.classList.add("element__delete-button_disabled")
        }
        if (this._isLiked) {
            this._likeButton.classList.add("element__button_active")
        }
        this._setEventListeners();
        return this._element;
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", this._likeCard);
        this._deleteButton.addEventListener("click", this._deleteCard);
        this._elementPic.addEventListener("click", () => {
            this._openCard({name: this._name, link: this._link});
        });
    }
}
export default Card;