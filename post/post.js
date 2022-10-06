// Imports
import { createPost } from '../fetch-utils.js';

// DOM Elements
const postForm = document.getElementById('post-form');
const addButton = postForm.querySelector('button');
const errorDisplay = document.getElementById('error-display');

// State
let error = null;
// Events
postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(postForm);

    const post = {
        name: formData.get('name'),
        description: formData.get('description'),
        category: formData.get('category'),
    };

    const response = await createPost(post);
    error = response.error;
    addButton.disabled = false;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});
// Display Functions
function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
