const windows = document.querySelector('html');
windows.addEventListener('click', (e) => {
  if (e.target.classList.value.includes('faq')) {
    const answer = e.target.closest('.faq-item').querySelector('.faq-answer');
    answer.classList.toggle('hide-answer');
  }
});
