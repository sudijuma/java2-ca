import { getToken } from "./utilities/storage.mjs";
import { CREATE_POST_URL } from "./API_URL/apiUrl.mjs";
import createHeader from "./components/header";
createHeader();

const createForm = document.querySelector("#create-form");

const postTitle = document.querySelector("#postTitle");
const postText = document.querySelector("#postText");

const postTitleError = document.querySelector("#postTitleError");
const postError = document.querySelector("#postTextError");

createForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let hasPostTitle = false;
  if (postTitle.value.trim().length > 3) {
    postTitleError.classList.add("hidden");
    hasPostTitle = true;
  } else {
    postTitleError.classList.remove("hidden");
  }

  let hasPostText = false;
  if (postText.value.trim().length > 5) {
    postError.classList.add("hidden");
    hasPostText = true;
  } else {
    postError.classList.remove("hidden");
  }
  let formIsValid = hasPostTitle && hasPostText;
  if (formIsValid) {
    const postData = {
      "title": postTitle.value,
      "body": postText.value,
    };

    const accessToken = getToken();    
    (async function createPost() {
      const response = await fetch(CREATE_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },  
        body: JSON.stringify(postData),
      });
      if (response.ok) {
        const data = await response.json();
        location.href = "./index.html";
      } else {
        const error = await response.json();
        const message = "Your post attempt failed";
        throw new Error(message);
      }
      createForm.reset();
    })().catch((error) => {
      console.log(error);
    });
  } else {
    console.log("validation failed *Sad face*");
  }
});
