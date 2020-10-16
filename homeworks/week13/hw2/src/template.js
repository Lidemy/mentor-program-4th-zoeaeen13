/* eslint-disable no-alert */

export const cssTemplate = 'body {padding: 10vw;} h1 { margin-top: 25px; font-size: 35px; font-weight: bold; color: #333333;} form { margin-top: 1rem; border-radius: 4px; padding: 1rem 3rem; background: #f2f4f6;} .card { box-sizing: border-box border:2px solid #eeeeee; transition: ease-in .2s;} .card:hover { box-sizing: border-box; border-color: gold;} .section_add_more { padding: 30px; text-align: center;}';

export function getFormTemplate(siteKey) {
  return `<div>
  <h1>留言板</h1>
  <form class="form_${siteKey}">
    <div class="form-group mt-3">
      <label for="nickname">暱稱</label>
      <input type="text" class="form-control" name="nickname" id="nickname" aria-describedby="nicknameHelp" required>
      <small id="nicknameHelp" class="form-text text-muted">Choose a name that you’ll easily recognize</small>
    </div>
    <div class="form-group">
      <label for="content">留言內容</label>
      <textarea name="content" class="form-control" rows="4"required></textarea>
    </div>
    <button type="submit" class="btn btn-primary">送出</button>
  </form>
  <div class="discussions_${siteKey} row row-cols-1 row-cols-md-2 mt-5"></div>
  <div class="section_add_more">
    <button type="button" class="btn_more_${siteKey} btn btn-primary">載入更多</button>
  </div>
</div>`;
}
