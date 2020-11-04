/* eslint-disable no-alert, import/no-unresolved */

import $ from 'jquery';

export function getDataAPI(apiURL, siteKey, beforeID, cb) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: apiURL,
    data: {
      site_key: siteKey,
      before: beforeID,
    },
  }).done((resp) => {
    if (!resp.ok) {
      alert(resp.messgae);
      return;
    }

    cb(resp);
  });
}

export function addDataAPI(apiURL, siteKey, newDiscussion, cb) {
  $.ajax({
    type: 'POST',
    dataType: 'json',
    url: apiURL,
    data: {
      site_key: siteKey,
      nickname: newDiscussion.nickname,
      content: newDiscussion.content,
    },
  }).done((resp) => {
    cb(resp);
  });
}
