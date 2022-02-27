import "./index.css"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import {initialCards, enableValidation, editButton, addButton, formEditElement, formAddElement, nameInput, aboutInput, nameValue, aboutValue, avatar, editAvatarButton, formEditAvatar, likeCounter} from "../utils/constants.js";
import Api from "../components/Api";

//VALIDATION
const formEditValidate = new FormValidator(enableValidation, formEditElement);
const formAddValidate = new FormValidator(enableValidation, formAddElement);
const formEditAvatarValidate = new FormValidator(enableValidation, formEditAvatar);
//!создать валидацию на форме confirm
formEditValidate.enableValidation();
formAddValidate.enableValidation();
formEditAvatarValidate.enableValidation();
//!включить валидацию на форме confirm

//API
const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort36",
    token: "3957dbeb-7d90-4e11-a8e6-c6d5afdd660b"
})

//1 LOAD INFORMATION ABOUT USER
//2 LOAD CARDS

const userInfoForm = new UserInfo({
    nameValue,
    aboutValue,
    avatar
})

const getObjectUserInfo = api.getUserInfo()
    .then((objectUserInfo) => { 
        return objectUserInfo
    })
    .catch((err) => {
        console.log(`Ошибка при получении данных профиля ${err}`)
    })

const getObjectCards = api.getCards()
    .then((objectCards) => {
        return objectCards
    })
    .catch((err) => {
        console.log(`Ошибка при получении карточек ${err}`)
    })

const renderedCards = new Section({
    items: [],
    renderer: (item) => {
        const newCard = createCard(item);
        renderedCards.addItem(newCard);
    }
}, ".elements__container")

Promise.all([getObjectUserInfo, getObjectCards])
    .then(([objectUserInfo, objectCards]) => {
        userInfoForm.setUserInfo(objectUserInfo.name, objectUserInfo.about)
        userInfoForm.setAvatar(objectUserInfo.avatar)
        userInfoForm.setIdUser(objectUserInfo._id)
        renderedCards.renderItems(objectCards.reverse())
    })
    .catch((err) => {
        console.log(`Ошибка при запросе данных ${err}`)
    })


//3 EDIT PROFILE

const popupEditForm = new PopupWithForm("#popup_edit-profile", submitEditForm)

function submitEditForm(newValue) {
    api.editProfile(newValue)
    .then((res) => {
        userInfoForm.setUserInfo(res.name, res.about)
        popupEditForm.closePopup()
    })
    .catch((err) => {
        console.log(`Ошибка при редактировании профиля ${err}`)
    })
}

popupEditForm.setEventListeners();

editButton.addEventListener("click", () => {
  formEditValidate.resetValidation();
  const newUserForm = userInfoForm.getUserInfo();
  nameInput.value = newUserForm.name.trim();
  aboutInput.value = newUserForm.about.trim();
  popupEditForm.openPopup();
});

//4 ADD CARD

const popupFullPicture = new PopupWithImage ("#popup_pic-fullscreen");

popupFullPicture.setEventListeners();

function openCard(card) {
    popupFullPicture.openPopup(card);
}

function createCard(data) {
    const card = new Card("#element", data, userInfoForm.getIdUser(), openCard, deleteCard, likeCard);
    return card.getView();
}

const popupAddCard = new PopupWithForm("#popup_add-card", submitAddCForm);

function submitAddCForm(newValue) {
    api.postCard(newValue)
    .then((res) => {
        renderedCards.addItem(createCard({
            name: res.name,
            link: res.link,
        }))
        popupAddCard.closePopup();
    })
    .catch((err) => {
        console.log(`Ошибка при добавлении карточки ${err}`)
    })
}

popupAddCard.setEventListeners();
  
addButton.addEventListener("click", () => {
    formAddValidate.resetValidation();
    popupAddCard.openPopup();
});

//6,7 DELETE CARD
function deleteCard() {

}

//8 LIKE CARD
function likeCard() {
  
}

//9 EDIT AVATAR

const popupEditAvatar = new PopupWithForm("#popup_edit-avatar", submitAvatarForm)

function submitAvatarForm(newValue) {
    api.editAvatar(newValue)
    .then((res) => {
        userInfoForm.setAvatar(res.avatar)
        popupEditAvatar.closePopup();
    })
    .catch((err) => {
        console.log(`Ошибка при изменении аватара ${err}`)
    })
}

popupEditAvatar.setEventListeners();

editAvatarButton.addEventListener("click", () => {
    formEditAvatarValidate.resetValidation();
    popupEditAvatar.openPopup();
})

// const popupConfirmDeletion = new PopupWithConfirmation ("#popup_confirm-deletion", (idCard) => {
//   api.deleteCard(idCard).then(() => {
//   })
// })
// popupConfirmDeletion.setEventListeners();