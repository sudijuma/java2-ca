import { USER_LOGIN_URL } from "./API_URL/apiUrl.mjs";
import { validateEmail } from "./utilities/validation.js";
import { saveUser, saveToken } from "./utilities/storage.mjs";

import  createHeader from "./components/header";

createHeader();
const logInForm = document.querySelector("#login-form");

const email = document.querySelector("#email");

const emailNotValid = document.querySelector("#emailNotValid");
const emailError = document.querySelector("#emailError");

const password = document.querySelector("#password");
const passwordNotValid = document.querySelector("#passwordError");


if (logInForm) {
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
    } else if (
      email.value.trim().length &&
      validateEmail(email.value) !== true
    ) {
      emailNotValid.classList.remove("hidden");
    }

    let isPassword = false;
    if (password.value.trim().length >= 8) {
      passwordNotValid.classList.add("hidden");
      isPassword = true;
    } else {
      passwordNotValid.classList.remove("hidden");
    }

    let formIsValid = isEmail && validEmail && isPassword;
    if (formIsValid) {
      const userData = {
        "email": email.value,
        "password": password.value,
      };

      const USER_LOGIN_URL_ENDPOINT = USER_LOGIN_URL;
      (async function logIn() {
        const response = await fetch(USER_LOGIN_URL_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(userData)
        });
        if (response.ok) {
          const data = await response.json();
          saveToken(data.accessToken);
          const userToSave = {
            "name": data.name,
            "email": data.email,
          };
          saveUser(userToSave);
          window.location.href = "./index.html";
        } else {
          const err = await response.json();
          const message = `oopsi ${err.massage}`;
          throw new Error(message);
        }
      })().catch((err) => {
        console.log(`sorry ${err.massage}`);
      });
    } else {
      console.log("validation failed, sucka");
    }
  });
}
