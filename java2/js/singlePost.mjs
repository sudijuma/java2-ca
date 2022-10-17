import { getToken } from './utilities/storage.mjs';
import { GET_POST_BY_ID_URL, DELETE_USER_POST_BY_ID } from './API_URL/apiUrl.mjs';

const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const postId = searchParams.get('post_id');
const accessToken = getToken();
const postContainer = document.querySelector(".postContainer");
const postNotification = document.querySelector(".post__notification");
const deleteButtons = document.getElementsByClassName('edit-post-btn');

async function getPostId() {
  const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  })
  const data = await response.json();
  const { title, body, created, updated, id } = data;

  postContainer.innerHTML = `
        <div class="postContainer--contentContainer">
        <a href="/single-post.html?post_id=${id}" class="block">
        <div class="postContainer--insert">
          <div class="postContainer--flex">
            <div class="flex--1">
              <p class="postContainer--title">${title}</p>
              <p class="postContainer--author">By .:Sudi Mwakimako:.</p>
            </div>
          </div>
          <div class="postContainer--body">
            <p class="postContainer--text">
            ${body}
            </p>
          </div>
        </div>
      </a>
      <div class="time">${created}</div>
      <div class="flex--1">
      <a href="/edit.html?post_id=${id}" class="inline-flex">
      <button class="edit-post-btn inline-flex items-center" data-id="${id}" type="button">Edit this post</button>
      </a>
    </div>
      <div class="post__notification"></div>
      </div>
        `

}
getPostId();