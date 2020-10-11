/* eslint-disable no-alert, no-undef, object-shorthand, prefer-destructuring */

const siteKey = 'zoeaeen13';
const discussionUrl = 'discussions.php';
const discussionsDOM = $('.discussions');
let beforeID;

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function appendDiscussionToDOM(container, discussion, isPrepend) {
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

function getDiscussions(before) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: discussionUrl,
    data: {
      site_key: siteKey,
      before: before,
    },
  }).done((resp) => {
    if (!resp.ok) {
      alert(resp.messgae);
      return;
    }

    const discussions = resp.discussions;
    for (let i = 0; i < discussions.length; i += 1) {
      appendDiscussionToDOM(discussionsDOM, discussions[i]);
    }

    if (discussions.length === 0) {
      $('.btn_more').hide();
    } else {
      beforeID = discussions[discussions.length - 1].id;
    }
  });
}

$(document).ready(() => {
  // initialize
  getDiscussions(beforeID);

  // post data
  $('.form_discussions').submit((e) => {
    e.preventDefault();

    const newDiscussion = {
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };

    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: discussionUrl,
      data: {
        site_key: siteKey,
        nickname: newDiscussion.nickname,
        content: newDiscussion.content,
      },
    }).done((resp) => {
      if (!resp.ok) {
        alert(resp.messgae);
        return;
      }

      $('input[name=nickname]').val('');
      $('textarea[name=content]').val('');
      appendDiscussionToDOM(discussionsDOM, newDiscussion, true);
    });
  });


  // get more data
  $('.btn_more').click(() => {
    getDiscussions(beforeID);
  });
});
