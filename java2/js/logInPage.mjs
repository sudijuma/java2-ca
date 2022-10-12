import { USER_LOGIN_URL } from "./API_URL/apiUrl.mjs";
import { validateEmail } from "./utilities/validation.js";
import { saveUser, saveToken } from "./utilities/storage.mjs";

const logInForm = document.querySelector("#login-form");

const email = document.querySelector("#email");
const emailNotValid = document.querySelector("#emailNotValid");
const emailError = document.querySelector("#emailError");


const password = document.querySelector("#password");
const passwordNotValid = document.querySelector("#passwordError");