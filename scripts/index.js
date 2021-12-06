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
const closeButton = document.querySelector(".popup__button-close");
const addButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector("#popup_edit-profile");
const popupAdd = document.querySelector("#popup_add-card");
const formEditElement = document.querySelector("#popup__form_edit");
const formAddElement = document.querySelector("#popup__form_add");
const nameInput = document.querySelector(".popup__input-box_value_name");
const aboutInput = document.querySelector(".popup__input-box_value_about");
const mestoInput = document.querySelector(".popup__input-box_value_mesto");
const linkInput = document.querySelector(".popup__input-box_value_link");
const nameValue = document.querySelector(".profile__name");
const aboutValue = document.querySelector(".profile__about");
const elementsContainer = document.querySelector(".elements__container");
const templateElement = document.querySelector("#element");

function getItem(item) {    //добавление новой карточки
    const newItem = templateElement.content.cloneNode(true);
    const newName = newItem.querySelector(".element__name");
    newName.textContent = item.name;
    const newImage = newItem.querySelector(".element__pic");
    newImage.src = item.link;
    newImage.alt = item.name + ".";

    const beLiked = newItem.querySelector(".element__button");
	  beLiked.addEventListener("click", () => beLiked.classList.toggle("element__button_active"));

    const beDeleted = newItem.querySelector(".element__delete-button");
    beDeleted.addEventListener("click", deleteCard);

    return newItem;
}

function deleteCard(evt) {    //удаление карточки
	const targetElement = evt.target;
	const listItem = targetElement.closest(".element");
	listItem.remove();
}

function render() {   //начальный рендер карточек
    const html = initialCards.map(function(item){
        return getItem(item);
    });
    elementsContainer.append(...html);
}

render();

function openPopupEdit() {    //открытие попапа редактирования
    popupEdit.classList.add("popup_opened");
    nameInput.value = nameValue.textContent.trim();
    aboutInput.value = aboutValue.textContent.trim();
}

function openPopupAdd() {   //открытие попапа добавления новой карточки
    popupAdd.classList.add("popup_opened");
}

// нужно найти все попапы const popups = query('...');
// затем итеративно проходишь по попапам и внутри каждого ищешь closeButton
// затем на эту кнопку добавляешь событие клика, которое вызывает closePopup(сюда кинуть сам попап) 
// const popups = document.querySelectorAll(".popup");
// const closeBtn = popups.querySelectorAll(".popup__button-close");
// closeBtn.addEventListener("click", () => popups.classList.remove("popup_opened"));

// function closePopup(evt) {
//   const targetEl = evt.target;
//   const popupEl = targetEl.closest(".popup");
//   popupEl.classList.remove("popup_opened");
// }

function closePopup() {   //закрытие попапа
    const popup = document.querySelectorAll(".popup");
    const beClosed = popup.querySelector(".element__delete-button");
    beClosed.addEventListener("click", () => popup.classList.remove("popup_opened"));
}

function formSubmitHandler (evt) {    //отправка формы редактирования
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    aboutValue.textContent = aboutInput.value;
    closePopup()
}

function formAddCard (evt) {    //отправка формы добавления
    evt.preventDefault();
    const card = getItem({
      name: mestoInput.value,
      link: linkInput.value,
    });
    elementsContainer.prepend(card);
    mestoInput.value = '';
    linkInput.value = '';
    closePopup();

}

editButton.addEventListener("click", openPopupEdit);
closeButton.addEventListener("click", closePopup);
formEditElement.addEventListener("submit", formSubmitHandler);
addButton.addEventListener("click", openPopupAdd);
formAddElement.addEventListener("submit", formAddCard);