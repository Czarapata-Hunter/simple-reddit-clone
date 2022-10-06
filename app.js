/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderPost } from './render-utils.js';
import { getPosts } from './fetch-utils.js';

/* Get DOM Elements */
const errorDisplay = document.getElementById('error-display');
const postList = document.getElementById('post-list');
const searchForm = document.getElementById('search-form');

/* State */
let error = null;
let posts = [];

/* Events */
window.addEventListener('load', async () => {
    const response = await getPosts();
    error = response.error;
    posts = response.data;

    if (error) {
        displayError();
    } else {
        displayPosts();
    }
});

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(searchForm);
    const name = formData.get('name');

    const response = await getPosts(name);
    error = response.error;

    if (error) {
        displayError();
    } else {
        posts = response.data;
        displayPosts();
    }
});

/* Display Functions */
function displayError() {
    errorDisplay.textContent = error.message;
}

function displayPosts() {
    postList.innerHTML = '';
    for (const post of posts) {
        const postEl = renderPost(post);
        postList.append(postEl);
    }
}
