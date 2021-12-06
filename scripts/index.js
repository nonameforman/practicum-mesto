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
];                                                                          //стандартные 6 карточек

const editButton = document.querySelector(".profile__edit-button");         //кнопка "Редактировать профиль"
const closeButton = document.querySelector(".popup__button-close");         //кнопка "Закрыть"
const addButton = document.querySelector(".profile__add-button");           //кнопка "Добавить карточку"
const popupEdit = document.querySelector("#popup_edit-profile");            //попап "Редактировать профиль" (через id)
const popupAdd = document.querySelector("#popup_add-card");                 //попап "Добавить карточку" (через id)
const formEditElement = document.querySelector("#popup__form_edit");        //форма "Редактировать профиль" (через id)
const formAddElement = document.querySelector("#popup__form_add");          //форма "Добавить карточку" (через id)
const nameInput = document.querySelector(".popup__input-box_value_name");   //инпут "Имя" из попапа "Редактировать профиль"
const aboutInput = document.querySelector(".popup__input-box_value_about"); //инпут "Обо мне" из попапа "Редактировать профиль"
const mestoInput = document.querySelector(".popup__input-box_value_mesto"); //инпут "Mesto" из попапа "добавить карточку"
const linkInput = document.querySelector(".popup__input-box_value_link");   //инпут "Link" из попапа "добавить карточку"
const nameValue = document.querySelector(".profile__name");                 //h2 "Имя"
const aboutValue = document.querySelector(".profile__about");               //h2 "Обо мне"
const elementsContainer = document.querySelector(".elements__container");   //контейнер с карточками
const templateElement = document.querySelector("#element");                 //template-карточка

function getItem(item) {
    const newItem = templateElement.content.cloneNode(true);                //копируем содержимое template-элемента
    const newName = newItem.querySelector(".element__name");                //ищем заголовок с именем
    newName.textContent = item.name;                                        //добавляем содержание из массива
    const newImage = newItem.querySelector(".element__pic");                //ищем картинку
    newImage.src = item.link;                                               //добавляем картинку
    newImage.alt = item.name + ".";
    return newItem;
}

function render() {
    const html = initialCards.map(function(item){
        return getItem(item);
    });
    elementsContainer.append(...html);
}

render();

function openPopupEdit() {
    popupEdit.classList.add("popup_opened");
    nameInput.value = nameValue.textContent.trim();
    aboutInput.value = aboutValue.textContent.trim();
}

function openPopupAdd() {
    popupAdd.classList.add("popup_opened");
}

function closePopup() {
    if (popupEdit.classList.contains("popup_opened")) {
      popupEdit.classList.remove("popup_opened");
    } else if (popupAdd.classList.contains("popup_opened")) {
      popupAdd.classList.remove("popup_opened");
    }
}


function formSubmitHandler (evt) {
    evt.preventDefault();
    nameValue.textContent = nameInput.value;
    aboutValue.textContent = aboutInput.value;
    closePopup()
}

function formAddCard (evt) {
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