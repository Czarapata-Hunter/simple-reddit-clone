// Imports
import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';

// DOM Elements
const postForm = document.getElementById('post-form');
const addButton = postForm.querySelector('button');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

// State
let error = null;
// Events
imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '/assets/joker.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    if (imageFile.size > 20000000) {
        alert('File is too large. Please Select File < 20mbs');
        return;
    }

    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `images/${randomFolder}/${imageFile.name}`;

    const url = await uploadImage('images', imagePath, imageFile);

    const post = {
        name: formData.get('name'),
        description: formData.get('description'),
        category: formData.get('category'),
        image_url: url,
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
