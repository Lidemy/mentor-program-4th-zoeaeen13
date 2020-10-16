/* eslint-disable no-alert,  import/order, import/no-unresolved, import/prefer-default-export, prefer-destructuring, max-len */

import { getDataAPI, addDataAPI } from './api';
import { appendDiscussionToDOM, appendStyle } from './utills';
import { cssTemplate, getFormTemplate } from './template';
import $ from 'jquery';

export function init(options) {
  let siteKey = '';
  let apiURL = '';
  let beforeID = 0;
  let formClassName = '';
  let btnMoreNmae = '';
  let discussionsDOM = null;
  let inputDOM = null;
  let textareaDOM = null;

  siteKey = options.siteKey;
  apiURL = options.apiURL;
  formClassName = `.form_${siteKey}`;
  $('body').append(getFormTemplate(siteKey));
  discussionsDOM = $(`.discussions_${siteKey}`);
  btnMoreNmae = `.btn_more_${siteKey}`;
  inputDOM = $(`${formClassName} input[name=nickname]`);
  textareaDOM = $(`${formClassName} textarea[name=content]`);

  // add style
  appendStyle(cssTemplate);

  // get data
  getDataAPI(apiURL, siteKey, beforeID, (resp) => {
    const discussions = resp.discussions;
    for (let i = 0; i < discussions.length; i += 1) {
      appendDiscussionToDOM(discussionsDOM, discussions[i]);
    }

    if (discussions.length === 0) {
      $(btnMoreNmae).hide();
    } else {
      beforeID = discussions[discussions.length - 1].id;
    }
  });

  // post data
  $(formClassName).submit((e) => {
    e.preventDefault();
    const newDiscussion = {
      nickname: inputDOM.val(),
      content: textareaDOM.val(),
    };
    addDataAPI(apiURL, siteKey, newDiscussion, (resp) => {
      if (!resp.ok) {
        alert(resp.messgae);
        return;
      }

      inputDOM.val('');
      textareaDOM.val('');
      appendDiscussionToDOM(discussionsDOM, newDiscussion, true);
    });
  });


  // get more data
  $(btnMoreNmae).click(() => {
    getDataAPI(apiURL, siteKey, beforeID, (resp) => {
      const discussions = resp.discussions;
      for (let i = 0; i < discussions.length; i += 1) {
        appendDiscussionToDOM(discussionsDOM, discussions[i]);
      }

      if (discussions.length === 0) {
        $(btnMoreNmae).hide();
      } else {
        beforeID = discussions[discussions.length - 1].id;
      }
    });
  });
}
