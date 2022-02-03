export default class UserInfo {
    constructor(nameSelector, aboutSelector) {
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
    }

    getUserInfo() {
        return {
            name: this._nameSelector.textContent,
            about: this._aboutSelector.textContent
        }
    }

    setUserInfo(newNameValue, newAboutValue) {
        this._nameSelector.textContent = newNameValue;
        this._aboutSelector.textContent = newAboutValue;
    }
}