import moment from "moment";
import { GET_POSTS_URL, DELETE_USER_POST_BY_ID } from "./API_URL/apiUrl.mjs";

import { getToken } from "./utilities/storage.mjs";
import { clearStorage } from "./utilities/storage.mjs";

const contentContainer = document.querySelector(".postContainer");
const postNotification = document.querySelector(".post__notification");

let now = moment(new Date());
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

async function getPosts() {
  const response = await fetch(GET_POSTS_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  if (response.ok) {
    const jsonResponse = await response.json();
    console.log("HA! Got EM")
    contentContainer.innerHTML = "";
    const posts = jsonResponse;
    if (!posts.length) {
      postNotification.innerHTML = "Sorry luv, no posts for you";
    } else {
      const numberOfPosts = posts.length;
      for (let i = 0; i < numberOfPosts; i++) {
        const { created } = posts[i];
        console.log(posts[i])
        const secondsSinceCreated = now.diff(created, "seconds");
        contentContainer.innerHTML += `
          <div class="postContainer--contentContainer">
          <a href="/single-post.html?post_id=${posts[i].id}" class="block">
          <div class="postContainer--insert">
            <div class="postContainer--flex">
              <div class="flex--1">
                <p class="postContainer--title">${posts[i].title}</p>
                <p class="postContainer--author">By .:Sudi Mwakimako:.</p>
              </div>
            </div>
            <div class="postContainer--body">
              <p class="postContainer--text">
              ${posts[i].body}
              </p>
            </div>
          </div>
        </a>
        <div class="time">${posts[i].created}</div>
        <div class="flex--1">
        <button class="delete-post-btn inline-flex items-center" data-id="${posts[i].id}" type="button">Delete</button>
        <a href="/.edit-post.html?post_id=${posts[i].id}" class="inline-flex">Edit</a>
      </div>
        <div class="post__notification"></div>
        </div>
          `
      }
    }
  } else {
    postNotification.innerHTML = await response.json();
    console.log("fail");
  }
}

getPosts().then(() => {
  handleDeleteBtnsEvents();
})


function handleDeleteBtnsEvents() {
  const deleteButtons = document.getElementsByClassName('delete-post-btn');
  const totalNumberOfDeleteBtns = deleteButtons.length
  for (let i = 0; i < totalNumberOfDeleteBtns; i++) {
    deleteButtons[i].addEventListener('click', function () {
      const postId = this.dataset.id;
      handleDeletePostById(postId);
    });
  }
}

function handleDeletePostById(id) {
  console.log(id)
  console.log("delete post btn clicked")
  const deleteUser = async () => {
    try {
      let response = await fetch(`${DELETE_USER_POST_BY_ID}/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if (response.status === 200) {
        console.log("post erased");
        getPosts().then(() => {
          handleDeleteBtnsEvents();
        });
      } else {
        const err = await response.json();
        const message = `Sorry, some error ${err}`;
        throw new Error(message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  deleteUser().then(r => {
  });
}