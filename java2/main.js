import './scss/style.scss';
import createHeader from "./js/components/header";
import { clearStorage } from "./js/utilities/storage.mjs";
import { getToken } from "./js/utilities/storage.mjs";


createHeader();
const logOutBtn = document.querySelector("#logout-btn");
const accessToken = getToken();
console.log("accessToken: ", accessToken);
/* if (!accessToken) {
    location.href = "/login.html"
} */

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        console.log("I am clicked");
        clearStorage();
        window.location.replace("/landingpage.html");
    })
}
//TODO ändra strukturen!!