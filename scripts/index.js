import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const editButton = document.querySelector(".profile__edit-button");
const closeButtonEdit = document.querySelector("#close_edit-profile");
const closeButtonAdd = document.querySelector("#close_add-card");
const closeButtonFullPic = document.querySelector("#close_pic-fullscreen");
const overlayEdit = document.querySelector("#overlay_edit-profile");
const overlayAdd = document.querySelector("#overlay_add-card");
const overlayFullPic = document.querySelector("#overlay_pic-fullscreen");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popup_edit-profile");
const popupAdd = document.querySelector("#popup_add-card");
const popupFullPic = document.querySelector("#popup_pic-fullscreen");
const formEditElement = document.querySelector("#popup__form_edit");
const formAddElement = document.querySelector("#popup__form_add");
const nameInput = document.querySelector("#input_name");
const aboutInput = document.querySelector("#input_about");
const mestoInput = document.querySelector("#input_mesto");
const linkInput = document.querySelector("#input_link");
const nameValue = document.querySelector(".profile__name");
const aboutValue = document.querySelector(".profile__about");
const elementsContainer = document.querySelector(".elements__container");
const templateElement = document.querySelector("#element");
const imageFullScreen = document.querySelector(".popup__image");
const imageCapture = document.querySelector(".popup__capture");
const createButton = document.querySelector("#create-button");
const saveButton = document.querySelector("#save-button");
const popupList = document.querySelectorAll('.popup');

// function getItem(item) {    //добавление новой карточки
//     const newItem = templateElement.content.cloneNode(true);
//     const newName = newItem.querySelector(".element__name");
//     newName.textContent = item.name;
//     const newImage = newItem.querySelector(".element__pic");
//     newImage.src = item.link;
//     newImage.alt = item.name + ".";

//     const beLiked = newItem.querySelector(".element__button");
// 	  beLiked.addEventListener("click", () => beLiked.classList.toggle("element__button_active"));

//     const beDeleted = newItem.querySelector(".element__delete-button");
//     beDeleted.addEventListener("click", deleteCard);

//     const beOpenFullScreen = newItem.querySelector(".element__pic-button");
//     beOpenFullScreen.addEventListener("click", () => {
//         imageFullScreen.src = newImage.src;
//         imageFullScreen.alt = newImage.alt;
//         imageCapture.textContent = newName.textContent;
//         openPopup(popupFullPic);
//     })

//     return newItem;
// }

// function deleteCard(evt) {    //удаление карточки
// 	  const targetElement = evt.target;
// 	  const listItem = targetElement.closest(".element");
// 	  listItem.remove();
// }

// function render() {   //начальный рендер карточек
//     const html = initialCards.map(function(item){
//         return getItem(item);
//     });
//     elementsContainer.append(...html);
// }

function render() {
  const html = initialCards.map((item) => {
    const newItem = new Card(".template", item.name, item.link);
      return newItem.getView();
  });
  elementsContainer.append(...html);
}

render();

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
    const card = getItem({
      name: mestoInput.value,
      link: linkInput.value,
    });
    elementsContainer.prepend(card);
    mestoInput.value = '';
    linkInput.value = '';
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

/*--------ФУНКЦИИ ЗАКРЫТИЯ ПОПАПОВ (СТАРЫЕ)
closeButtonEdit.addEventListener("click", () => closePopup(popupEdit));
closeButtonAdd.addEventListener("click", () => closePopup(popupAdd));
closeButtonFullPic.addEventListener("click", () => closePopup(popupFullPic));
overlayEdit.addEventListener("click", () => closePopup(popupEdit));
overlayAdd.addEventListener("click", () => closePopup(popupAdd));
overlayFullPic.addEventListener("click", () => closePopup(popupFullPic));*/