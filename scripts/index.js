const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__button-close")
const popup = document.querySelector(".popup");

function open() {
    popup.classList.add("popup_opened");
}

function close() {
    popup.classList.remove("popup_opened");
}

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input-box_value_name");
let aboutInput = document.querySelector(".popup__input-box_value_about");
let nameValue = document.querySelector(".profile__name");
let aboutValue = document.querySelector(".profile__about");

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    aboutValue.textContent = aboutInput.value;
    close()
}

editButton.addEventListener("click", open);
closeButton.addEventListener("click", close);
formElement.addEventListener("submit", formSubmitHandler);