/* import { USER_LOGIN_URL } from "./API_URL/apiUrl.mjs";*/
import { validateEmail } from "./utilities/validation.js";
/* import { saveUser, saveToken } from "./utilities/storage.mjs"; */

const logInForm = document.querySelector("#login-form");

const email = document.querySelector("#email");
const emailNotValid = document.querySelector("#emailNotValid");
const emailError = document.querySelector("#emailError");


const password = document.querySelector("#password");
const passwordNotValid = document.querySelector("#passwordError");
/* const errorMassage = document.querySelector("error-massage"); */

if (logInForm)
    logInForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let isEmail = false;
        if (email.value.trim().length > 0) {
            emailError.classList.add("hidden");
            isEmail = true;
        } else {
            emailError.classList.remove("hidden");
        }

        let validEmail = false;
        if (email.value.trim().length && validateEmail(email.value) === true) {
            emailError.classList.add("hidden");
            validEmail = true;
        } else if (email.value.trim().length && validateEmail(email.value) !== true) {
            emailNotValid.classList.remove("hidden");
        }

        let isPassword = false;
        if (password.value.trim().length >= 8) {
            passwordNotValid.classList.add("hidden");
            isPassword = true;
        } else {
            passwordNotValid.remove("hidden");
        }

        let formIsValid = isEmail && validEmail && isPassword;
        if (formIsValid) {
            console.log("Hey, good job buste")
        } else {
            console.log("validtaion failed")
        }
    })