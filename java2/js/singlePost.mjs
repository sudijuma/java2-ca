import { getToken } from './utilities/storage.mjs';
import { GET_POST_BY_ID_URL, DELETE_USER_POST_BY_ID } from './API_URL/apiUrl.mjs';

const paramString = window.location.search;
const searchParams = new URLSearchParams(paramString);
const postId = searchParams.get('post_id');
const accessToken = getToken();
const postContainer = document.querySelector(".postContainer");
const postNotification = document.querySelector(".post__notification");

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
      <a href="" class="inline-flex">
      <button class="delete-post-btn inline-flex items-center" data-id="${id}" type="button">Delete or Edit this post</button>
      </a>
    </div>
      <div class="post__notification"></div>
      </div>
        `

}

getPostId().then(() => {
  handleDeleteBtnsEvents();
});


deleteButtons.addEventListener('click',function(){
  
  
} )
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
        getPostId().then(() => {
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