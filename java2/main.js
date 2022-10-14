import './scss/style.scss';
import createHeader from "./js/components/header";
createHeader();
const logOutBtn = document.querySelector("#logout-btn");

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        console.log("I am clicked");
        clearStorage();
        window.location.replace("/landingpage.html");
    })
}
//TODO ändra strukturen!!