import { getToken } from "./utilities/storage.mjs";
import { EDIT_POST_URL, GET_POST_BY_ID_URL } from "./API_URL/apiUrl.mjs";
console.log(EDIT_POST_URL);
const accessToken = getToken();

const editForm = document.querySelector("#edit-post-form");
const postTitle = document.querySelector("#postTitle");
const postTitleError = document.querySelector("#postTitleError");
const postText = document.querySelector("#postText");
const postTextError = document.querySelector("#postTextError");

console.log(editForm)
console.log(postTitle)
console.log(postTitleError)
console.log(postText)
console.log(postTextError)

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const postId = searchParam.get("post_id");

async function getPostById() {
    const response = await fetch(`${GET_POST_BY_ID_URL}/${postId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })
    if (response.status === 200) {
        const data = await response.json();
        const { title, body, created, updated, id } = data;
        console.log(created);
        console.log(updated);
        console.log(id);
        postTitle.value = title;
        postText.value = body;
    } else {
        const err = await response.json();
        throw err.message;
    }
}
getPostById().catch(err => {
    console.log(err);
});

editForm.addEventListener("submit", function (event) {
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
        postTextError.classList.add("hidden");
        hasPostText = true;
    }

    let editFormValid = hasPostTitle && hasPostText;

    if (editFormValid) {
        console.log("validation succeeded");
        console.log(postText.value);
        console.log(postText.value);
        const postData = {
            "title": postTitle.value,
            "body": postText.value
        };
        console.log("postData", postData);
        const accessToken = getToken();
        console.log("accessToken: ", accessToken);
        console.log("EDIT_POST_URL", EDIT_POST_URL);

        (async function createPost() {
            const response = await fetch(`${EDIT_POST_URL}/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(postData)
            })
            console.log("post edit response", response);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                console.log("edit succeeded");
                location.href = `/single-post.html?post_id=${postId}`;
            } else {
                const err = await response.json();
                const message = `${err} "editing failed ma dude"`;
                throw new Error(message)
            }
            editForm.reset();
        })().catch(err => {
            console.log(err)
        });
    } else {
        console.log("Validation failed");
    }
})