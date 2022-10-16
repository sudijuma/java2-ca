import { getToken } from "./utilities/storage.mjs";
import { CREATE_POST_URL } from "./API_URL/apiUrl.mjs";

const createForm = document.querySelector("#create-form");

const postTitle = document.querySelector("#postTitle");
const postText = document.querySelector("#postText");

const postTitleError = document.querySelector("#postTitleError");
const postError = document.querySelector("#postTextError");

console.log(createForm);
console.log(postTitle);
console.log(postText);
console.log(postError);

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
    console.log(postTitle.value);
    console.log(postText.value);
    const postData = {
      "title": postTitle.value,
      "body": postText.value,
    };
    console.log("post data", postData);

    const accessToken = getToken();
    console.log("accessToken", accessToken);
    console.log("apiUrl", CREATE_POST_URL);
    
    (async function createPost() {
      const response = await fetch(CREATE_POST_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },  
        body: JSON.stringify(postData),
      });
      console.log("post", response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        console.log("post success");
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
