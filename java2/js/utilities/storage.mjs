const tokenKey = "token";
const userKey = "user";

function saveToken(token) {
    saveToStorage(tokenKey, token);
}

function getToken() {
    const value = localStorage.getItem(tokenKey);
    if (value) {
        return JSON.parse(value);
    } else {
        return null
    }
}

function getUserName() {
    const user = getFromStorage(userKey);
    if (userKey) {
        return user.name
    } else {
        return null;
    }
}
// save user object
function saveUser(user) {
    saveToStorage(userKey, user);
}
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getFromStorage(key) {
    const value = localStorage.getItem(key);
    if (value) {
        return JSON.parse(value);
    } else {
        return []
    }
}

function clearStorage() {
    localStorage.clear();
}

export { getToken, saveToken, saveUser, getUserName, clearStorage }