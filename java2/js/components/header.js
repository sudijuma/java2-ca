

import { getUserName } from "../utilities/storage.mjs";

function createHeader() {
    const { pathname } = document.location;
    const navBar = document.querySelector("#top-nav");
    if (navBar) {
        const userName = getUserName();
        let dynamicLinks = `
        <div>Logo Here</div>
        <input id="menu-toggle" type="checkbox" />
        <label class="menu-button-container" for="menu-toggle">
          <div class="menu-button"></div>
        </label>
        <ul class="menu">
        <li><a href="./signup.html" class="${pathname === "/signup.html" ? "text-menu" : ""}">SignUp</a></li>
        <li><a href="./login.html" class="${pathname === "/login.html" ? "text-menu" : ""}">Log In</a></li>
        </ul>
        `;
        if (userName) {
            dynamicLinks = `
    <div>Logo Here</div>
    <input id="menu-toggle" type="checkbox" />
    <label class="menu-button-container" for="menu-toggle">
        <div class="menu-button"></div>
    </label>
        <ul class="menu">
            <li>
                <a href="/index.html" class="${pathname === "/index.html" ? "text_menu_logged_in" : ""}">Home</a>
            </li>
            <li>
                <a href="/posts.html" class="${pathname === "/posts.html" ? "text_menu_logged_in" : ""}">Posts</a>
            </li>
            <li>
                <a href="/createpost.html" class="${pathname === "/createpost.html" ? "text_menu_logged_in" : ""}">Create Post</a>
            </li>
            <li><button id="logout-btn">Log out</button></li>
       </ul> `
        }
        navBar.innerHTML = `
        <ul class="menu">
        ${dynamicLinks}
        </ul>
        `
    }
}

export default createHeader;