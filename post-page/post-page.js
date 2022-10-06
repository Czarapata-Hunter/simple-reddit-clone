// Imports
import '../auth/auth.js';
import { getPost } from '../fetch-utils.js';

// DOM Elements
// const errorDisplay = document.getElementById('error-display');
const postName = document.getElementById('post-name');
const postImage = document.getElementById('post-image');
const postDescription = document.getElementById('post-description');
const postCategory = document.getElementById('post-category');
// State
let error = null;
let post = null;

// Events
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    if (!id) {
        location.replace('/');
        return;
    }

    const response = await getPost(id);
    error = response.error;
    post = response.data;

    if (error) {
        location.replace('/');
    } else {
        displayPost();
    }
});
//Display Functions
// displayError when Comments

function displayPost() {
    postName.textContent = post.name;
    postDescription.textContent = post.description;
    postCategory.textContent = post.category;
    postImage.src = post.image_url;
    postImage.alt = `${post.name} image`;
}
