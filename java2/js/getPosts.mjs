import moment from "moment";
import { GET_POSTS_URL } from "./API_URL/apiUrl.mjs";

import { getToken } from "./utilities/storage.mjs";
import { clearStorage } from "./utilities/storage.mjs";

const contentContainer = document.querySelector(".postContainer");
const postNotification = document.querySelector(".post__notification");

const accessToken = getToken();

console.log("accessToken: ", accessToken);
if (!accessToken) {
    location.href = "/login.html"
}

const logOutBtn = document.querySelector("#logout-btn")
if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        console.log("I am clicked");
        clearStorage();
        window.location.replace("/login.html");
    })
}

(async function getPosts() {
    const response = await fetch(GET_POSTS_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    console.log("get all post repsonse:", response)
    if (response.ok) {
        const posts = await response.json();
        console.log(posts);
        console.log("post getting be gotten");
        let now = moment(new Date());
        if (!posts.length) {
            postNotification.innerHTML = "Time to create some posts";
        } else {
            const listOfPosts = posts.map((post) => {
                console.log("posts:", posts)
                const postBody = post.body;
                const postTitle = post.title;
                const postDate = post.created;
                const postId = post.id;
                // const postOwner = post.owner
                const createdSince = now.diff(postDate, 'days');
                return (`
                <div class="postContainer--contentContainer">
                <a href="/single-post.html?post_id=${postId}" class="block">
                <div class="postContainer--insert">
                  <div class="postContainer--flex">
                    <div class="flex--1">
                      <p class="postContainer--title">${postTitle}</p>
                      <p class="postContainer--author">By .:Sudi Mwakimako:.</p>
                    </div>
                  </div>
                  <div class="postContainer--body">
                    <p class="postContainer--text">
                    ${postBody}
                    </p>
                  </div>
                </div>
              </a>
              <time datetime="2021-02-23T15:35" class="time"
                >${createdSince} d ago</time
              >
              <div class="post__notification"></div>
              </div>
                `)
            }).join('');
            contentContainer.insertAdjacentHTML('beforeend', listOfPosts);
        }
    } else {
        const err = await response.json();
        const message = `Sorry, there seems to be a problem${err}`;
        throw new Error(message);
    }
})().catch(err => {
    console.log("No posts *sad face*");
    console.log(err);
    postNotification.innerHTML = err;
});
