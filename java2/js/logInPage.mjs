import { USER_LOGIN_URL } from "./API_URL/apiUrl.mjs";
import { validateEmail } from "./utilities/validation.js";
import { saveUser, saveToken } from "./utilities/storage.mjs";

const logInForm = document.querySelector("#login-form");

const email = document.querySelector("#email");
console.log(email);
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
            console.log("isPassword", isPassword);
        } else {
            passwordNotValid.classList.remove("hidden");
        }

        let formIsValid = isEmail && validEmail && isPassword;
        if (formIsValid) {
            console.log("Validation");
            const userData = {
                "email": email.value,
                "password": password.value
            }
            const USER_LOGIN_URL_ENDPOINT = `${USER_LOGIN_URL}`;
            (async function logIn() {
                const response = await login(USER_LOGIN_URL_ENDPOINT, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(userData)
                });
                if (response.ok) {
                    const data = response.json();
                    console.log(data);
                    console.log(data.accessToken);
                    saveToken(data.accessToken);
                    const userToSave = {
                        name: data.name,
                        email: data.email
                    }
                    console.log(userToSave);
                    saveUser(userToSave)
                    location.href = "./index.html"
                } else {
                    const err = await response.json();
                    const message = `oopsi ${err.massage}`;
                    console.log("post failed");
                    throw new Error(message);
                }
            })().catch(err => {
                console.log(`sorry ${err.massage}`)
            });
        } else {
            console.log("validation failed, sucka");
        }
    });


    //TODO make the api call