import "./index.css"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import {initialCards, enableValidation, editButton, addButton, formEditElement, formAddElement, nameInput, aboutInput, nameValue, aboutValue} from "../utils/constants.js";

const formEditValidate = new FormValidator(enableValidation, formEditElement);
const formAddValidate = new FormValidator(enableValidation, formAddElement);
formEditValidate.enableValidation();
formAddValidate.enableValidation();

function createCard({name, link}) {   //создание карточки
  const openCard = () => {
    popupFullPicture.openPopup(name, link);
  }
  const card = new Card("#element", name, link, openCard);
  return card.getView();
}

const renderedCards = new Section({   //начальный рендер карточек
  items: initialCards.reverse(),
  renderer: (item) => {
    const newCard = createCard(item);
    renderedCards.addItem(newCard);
  }
}, ".elements__container")

renderedCards.renderItems();

const popupFullPicture = new PopupWithImage ("#popup_pic-fullscreen");
popupFullPicture.setEventListeners();

const userInfoForm = new UserInfo({nameValue, aboutValue});

const popupEditForm = new PopupWithForm("#popup_edit-profile", (newValue) => {
    const newNameValue = newValue.name;
    const newAboutValue = newValue.about;
    userInfoForm.setUserInfo(newNameValue, newAboutValue)
    popupEditForm.closePopup();
});
popupEditForm.setEventListeners();

const popupAddCard = new PopupWithForm("#popup_add-card", (newValue) => {
  const inputCard = {
    name: newValue.name,
    link: newValue.link
  }
  renderedCards.addItem(createCard(inputCard));
  popupAddCard.closePopup();
});
popupAddCard.setEventListeners();

editButton.addEventListener("click", () => {
      formEditValidate.resetValidation();
      const newUserForm = userInfoForm.getUserInfo();
      nameInput.value = newUserForm.name.trim();
      aboutInput.value = newUserForm.about.trim();
      popupEditForm.openPopup();
});

addButton.addEventListener("click", () => {
  formAddValidate.resetValidation();
  popupAddCard.openPopup();
});