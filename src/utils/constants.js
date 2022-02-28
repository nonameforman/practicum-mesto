const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const formEditElement = document.querySelector("#popup__form_edit");
const formAddElement = document.querySelector("#popup__form_add");
const nameInput = document.querySelector("#input_name");
const aboutInput = document.querySelector("#input_about");
const nameValue = document.querySelector(".profile__name");
const aboutValue = document.querySelector(".profile__about");
const avatar = document.querySelector(".profile__avatar");
const editAvatarButton = document.querySelector(".profile__edit-image");
const formEditAvatar = document.querySelector("#popup_edit-avatar");
const editSubmitButton = document.querySelector("#save-button");
const addSubmitButton = document.querySelector("#create-button");
const editAvatarSubmitButton = document.querySelector("#save-avatar-button");
const deleteSubmitButton = document.querySelector("#delete-button");


export {enableValidation, editButton, addButton, formEditElement, formAddElement, nameInput, aboutInput, nameValue, aboutValue, avatar, editAvatarButton, formEditAvatar, editSubmitButton, addSubmitButton, editAvatarSubmitButton, deleteSubmitButton};