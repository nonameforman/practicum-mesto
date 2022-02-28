import "./index.css"

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js"
import {enableValidation, editButton, addButton, formEditElement, formAddElement, nameInput, aboutInput, nameValue, aboutValue, avatar, editAvatarButton, formEditAvatar, editSubmitButton, addSubmitButton, editAvatarSubmitButton, deleteSubmitButton} from "../utils/constants.js";
import Api from "../components/Api";

//VALIDATION
const formEditValidate = new FormValidator(enableValidation, formEditElement);
const formAddValidate = new FormValidator(enableValidation, formAddElement);
const formEditAvatarValidate = new FormValidator(enableValidation, formEditAvatar);

formEditValidate.enableValidation();
formAddValidate.enableValidation();
formEditAvatarValidate.enableValidation();

//API
const api = new Api({
    address: "https://mesto.nomoreparties.co/v1/cohort36",
    token: "3957dbeb-7d90-4e11-a8e6-c6d5afdd660b"
})

//LOAD INFORMATION ABOUT USER AND CARDS

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

const renderedCards = new Section({
    renderer: (item) => {
        const newCard = createCard(item);
        renderedCards.addItem(newCard);
    }
}, ".elements__container")

//EDIT PROFILE

const popupEditForm = new PopupWithForm("#popup_edit-profile", submitEditForm)

function submitEditForm(newValue) {
    editSubmitButton.textContent = "Сохранение..."
    api.editProfile(newValue)
    .then((res) => {
        userInfoForm.setUserInfo(res.name, res.about)
        popupEditForm.closePopup()
    })
    .catch((err) => {
        console.log(`Ошибка при редактировании профиля ${err}`)
    })
    .finally(() => {
        editSubmitButton.textContent = "Сохранить"
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

//ADD CARD

const popupFullPicture = new PopupWithImage ("#popup_pic-fullscreen");

popupFullPicture.setEventListeners();

function openCard(card) {
    popupFullPicture.openPopup(card);
}

function createCard(data) {
    const card = new Card("#element", data, userInfoForm.getIdUser(), openCard, deleteCard, likeCard);
    return card.getView();
}

const popupAddCard = new PopupWithForm("#popup_add-card", submitAddForm);

function submitAddForm(newValue) {
    addSubmitButton.textContent = "Создание..."
    api.postCard(newValue)
    .then((res) => {
        renderedCards.addItem(createCard(res))
        popupAddCard.closePopup();
    })
    .catch((err) => {
        console.log(`Ошибка при добавлении карточки ${err}`)
    })
    .finally(() => {
        addSubmitButton.textContent = "Создать"
    })
}

popupAddCard.setEventListeners();
  
addButton.addEventListener("click", () => {
    formAddValidate.resetValidation();
    popupAddCard.openPopup();
});

//DELETE CARD

const popupConfirmDeletion = new PopupWithConfirmation ("#popup_confirm-deletion", submitRemoveForm);

popupConfirmDeletion.setEventListeners();

function deleteCard(card) {
  popupConfirmDeletion.openPopup(card);
}

function submitRemoveForm(card) {
    deleteSubmitButton.textContent = "Удаление..."
    api.removeCard(card.getIdCard())
    .then(() => {
        card.delete();
        popupConfirmDeletion.closePopup();
    })
    .catch((err) => {
        console.log(`Ошибка при удалении карточки ${err}`)
    })
    .finally(() => {
        deleteSubmitButton.textContent = "Да"
    })
}

//LIKE CARD

function likeCard(card) {
    if(!card.getIsLiked()) {
        api.putLikeCard(card.getIdCard())
        .then((res) => {
            card.like(res)
        })
        .catch((err) => {
            console.log(`Ошибка при лайке карточки ${err}`)
        })
    } else {
        api.deleteLikeCard(card.getIdCard())
        .then((res) => {
            card.like(res)
        })
        .catch((err) => {
          console.log(`Ошибка при снятии лайка с карточки ${err}`)
        })
    }
}

//EDIT AVATAR

const popupEditAvatar = new PopupWithForm("#popup_edit-avatar", submitAvatarForm)

function submitAvatarForm(newValue) {
    editAvatarSubmitButton.textContent = "Сохранение..."
    api.editAvatar(newValue)
    .then((res) => {
        userInfoForm.setAvatar(res.avatar)
        popupEditAvatar.closePopup();
    })
    .catch((err) => {
        console.log(`Ошибка при изменении аватара ${err}`)
    })
    .finally(() => {
        editAvatarSubmitButton.textContent = "Сохранить"
    })
}

popupEditAvatar.setEventListeners();

editAvatarButton.addEventListener("click", () => {
    formEditAvatarValidate.resetValidation();
    popupEditAvatar.openPopup();
})