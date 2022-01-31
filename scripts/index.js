import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import { initialCards } from "./constants.js";

const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popup_edit-profile");
const popupAdd = document.querySelector("#popup_add-card");
const formEditElement = document.querySelector("#popup__form_edit");
const formAddElement = document.querySelector("#popup__form_add");
const nameInput = document.querySelector("#input_name");
const aboutInput = document.querySelector("#input_about");
const mestoInput = document.querySelector("#input_mesto");
const linkInput = document.querySelector("#input_link");
const nameValue = document.querySelector(".profile__name");
const aboutValue = document.querySelector(".profile__about");
const elementsContainer = document.querySelector(".elements__container");
const createButton = document.querySelector("#create-button");
const saveButton = document.querySelector("#save-button");
const popupList = document.querySelectorAll('.popup');
const popupFullPic = document.querySelector("#popup_pic-fullscreen");

// const cardList = new Section({
//     items: initialCards,
//     renderer: 
// })

const formEditValidate = new FormValidator(enableValidation, formEditElement);
const formAddValidate = new FormValidator(enableValidation, formAddElement);
formEditValidate.enableValidation();
formAddValidate.enableValidation();

// function createCard(item) {   //создание карточки
//     const card = new Card("#element", item.name, item.link, openCard);
//     return card.getView();
// }

function createCard({name, link}) {   //создание карточки
  const openCard = () => {
    popupFullPicture.openPopup(name, link);
  }
  const card = new Card("#element", name, link, openCard);
  return card.getView();
}

const renderedCards = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item);
    renderedCards.addItem(newCard);
  }
}, ".element")

renderedCards.renderItems();

const popupFullPicture = new PopupWithImage ("#popup_pic-fullscreen");

// initialCards.map((item) => {  //начальный рендер карточек
//     elementsContainer.append(createCard(item));
// })

// function openCard(name, link) {   //открытие полноразмерного изображения
//     popupFullPic.querySelector(".popup__image").src = link;
//     popupFullPic.querySelector(".popup__image").alt = name + ".";
//     popupFullPic.querySelector(".popup__capture").textContent = name;
//     openPopup(popupFullPic);
// }

function openPopup(popupElement) {    //открытие попапа
    popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popupElement) {   //закрытие попапа
    popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {   //закрытие открытого попапа через esc
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      closePopup(openedPopup);
    }
}

function submitFormEdit (evt) {    //отправка формы редактирования
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    aboutValue.textContent = aboutInput.value;
    saveButton.classList.add("popup__button_disabled");
    saveButton.disabled = true;
    closePopup(popupEdit);
}

function submitFormAdd (evt) {    //отправка формы добавления
    evt.preventDefault();
    const inputCard = {
      name: mestoInput.value,
      link: linkInput.value
    }
    elementsContainer.prepend(createCard(inputCard));
    formAddElement.reset();
    createButton.classList.add("popup__button_disabled");
    createButton.disabled = true;
    closePopup(popupAdd);
}

const addListenersOnCloseElements = () => {    //добавляет слушатели на кнопки (оверлеи) закрытия попапов
    popupList.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__overlay')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closePopup(popup)
        }
      })
    })
}

addListenersOnCloseElements();

editButton.addEventListener("click", () => {
    nameInput.value = nameValue.textContent.trim();
    aboutInput.value = aboutValue.textContent.trim();
    openPopup(popupEdit);
});
addButton.addEventListener("click", () => openPopup(popupAdd));
formEditElement.addEventListener("submit", submitFormEdit);
formAddElement.addEventListener("submit", submitFormAdd);