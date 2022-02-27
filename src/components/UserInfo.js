export default class UserInfo {
    constructor({nameValue, aboutValue, avatar}) {
        this._nameValue = nameValue;
        this._aboutValue = aboutValue;
        this._avatar = avatar;
    }

    getUserInfo() {
        return {
            name: this._nameValue.textContent,
            about: this._aboutValue.textContent,
            avatar: this._avatar.src
        }
    }

    getIdUser() {
        return this._idUser
    }

    setIdUser(idUser) {
        this._idUser = idUser
    }

    setUserInfo(newNameValue, newAboutValue) {
        this._nameValue.textContent = newNameValue;
        this._aboutValue.textContent = newAboutValue;
    }

    setAvatar(newAvatar) {
        this._avatar.src = newAvatar;
    }
}