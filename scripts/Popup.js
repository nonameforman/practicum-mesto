export default class Popup {
    constructor(popupElement) {
        this._popupElement = popupElement;
    }

    openPopup() {
        this._popupElement.classList.add("popup_opened");
        document.addEventListener("keydown", this._handleEscClose);
        this.setEventListeners();
    }

    closePopup() {
        this._popupElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", this._handleEscClose);
    }

    _handleEscClose() {
        if (evt.key === "Escape") {
            this.closePopup();
          }
    }

    setEventListeners() {
        this._popupElement.addEventListener("click", (evt) => {
            if (evt.target.classList.contains('popup__overlay')) {
                this.closePopup()
            }
            if (evt.target.classList.contains('popup__button-close')) {
                this.closePopup()
            }
        })
    }
}