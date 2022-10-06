export function renderPost(post) {
    const li = document.createElement('li');

    const a = document.createElement('a');
    a.href = `/post-page/?id=${post.id}`;

    const h2 = document.createElement('h2');
    h2.textContent = post.name;

    const img = document.createElement('img');
    img.src = post.image_url;

    const span = document.createElement('span');
    span.textContent = getCategoryEmoji(post.category);
    h2.append(span);

    const p = document.createElement('p');
    p.textContent = post.description;

    a.append(img, h2, p);
    li.append(a);

    return li;
}

function getCategoryEmoji(category) {
    if (category === 'funny') return '😂';
    if (category === 'shocking') return '🫢';
    if (category === 'gaming') return '🎮';
    if (category === 'movies') return '🎥';
    return '⁉️';
}

export function renderComment(comment, userId) {
    const li = document.createElement('li');
    if (comment.user_id === userId) {
        li.classList.add('self');
    }
    li.textContent = comment.text;
    return li;
}
