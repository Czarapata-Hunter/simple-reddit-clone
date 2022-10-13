// Imports
import { getPost, createComment, getUser } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';

// DOM Elements
// const errorDisplay = document.getElementById('error-display');
const postName = document.getElementById('post-name');
const postImage = document.getElementById('post-image');
const postDescription = document.getElementById('post-description');
const postCategory = document.getElementById('post-category');
const addCommentForm = document.getElementById('add-comment-form');
const commentList = document.getElementById('comment-list');
const errorDisplay = document.getElementById('error-display');
// State
let error = null;
let post = null;

const user = getUser();

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
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCommentForm);
    const insertComment = {
        text: formData.get('text'),
        post_id: post.id,
    };

    const response = await createComment(insertComment);
    error = response.error;
    if (error) {
        displayError();
    } else {
        const comment = response.data;
        post.comments.unshift(comment);
        displayComments();
        addCommentForm.reset();
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

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayComments() {
    commentList.innerHTML = '';
    for (const comment of post.comments) {
        const commentEl = renderComment(comment, user.id);
        commentList.append(commentEl);
    }
}
