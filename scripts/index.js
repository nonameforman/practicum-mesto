import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js"
import {initialCards, enableValidation, editButton, addButton, formEditElement, formAddElement, nameInput, aboutInput, nameValue, aboutValue, elementsContainer} from "./constants.js";

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
  items: initialCards,
  renderer: (item) => {
    const newCard = createCard(item);
    renderedCards.addItem(newCard);
  }
}, ".elements__container")

renderedCards.renderItems();

const popupFullPicture = new PopupWithImage ("#popup_pic-fullscreen");
popupFullPicture.setEventListeners();

const userInfoForm = new UserInfo(nameValue, aboutValue);

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
  elementsContainer.prepend(createCard(inputCard));
  formAddElement.reset();
  popupAddCard.closePopup();
});
popupAddCard.setEventListeners();

editButton.addEventListener("click", () => {
      const newUserForm = userInfoForm.getUserInfo();
      nameInput.value = newUserForm.name.trim();
      aboutInput.value = newUserForm.about.trim();
      popupEditForm.openPopup();
});

addButton.addEventListener("click", () => {
  popupAddCard.openPopup();
});