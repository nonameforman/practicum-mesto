export default class UserInfo {
    constructor({nameValue, aboutValue}) {
        this._nameValue = nameValue;
        this._aboutValue = aboutValue;
    }

    getUserInfo() {
        return {
            name: this._nameValue.textContent,
            about: this._aboutValue.textContent
        }
    }

    setUserInfo(newNameValue, newAboutValue) {
        this._nameValue.textContent = newNameValue;
        this._aboutValue.textContent = newAboutValue;
    }
}