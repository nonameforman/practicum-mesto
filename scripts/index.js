const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__button-close")
const popup = document.querySelector(".popup");

let formElement = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input-box_value_name");
let aboutInput = document.querySelector(".popup__input-box_value_about");
const saveButton = document.querySelector(".popup__button-save");
let nameValue = document.querySelector(".profile__name");
let aboutValue = document.querySelector(".profile__about");


console.log(nameInput.value);
console.log(nameValue.textContent);


function open() {
    popup.classList.add("popup_opened");
}

function close() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameInput.value = 
}

formSubmitHandler (evt);

editButton.addEventListener("click", open);
closeButton.addEventListener("click", close);