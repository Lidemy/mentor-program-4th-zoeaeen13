/* eslint-disable no-alert */

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function appendDiscussionToDOM(container, discussion, isPrepend) {
  const cardHTML = `
    <div class="col mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(discussion.nickname)}</h5>
          <p class="card-text">${escapeHtml(discussion.content)}</p>
        </div>
      </div>
    </div>`;
  if (isPrepend) {
    container.prepend(cardHTML);
  } else {
    container.append(cardHTML);
  }
}

export function appendStyle(cssTemplate) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(cssTemplate));
  document.getElementsByTagName('head')[0].appendChild(styleElement);
}
