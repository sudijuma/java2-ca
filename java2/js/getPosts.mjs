import moment from "moment";

import { GET_POSTS_URL } from "./API_URL/apiUrl.mjs";
import { getToken } from "./utilities/storage.mjs";

const contentContainer = document.querySelector(".content_container--post");

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        console.log("I am clicked");
        clearStorage();
        window.location.replace("/login.html");
    })
}