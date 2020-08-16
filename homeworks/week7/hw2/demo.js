const windows = document.querySelector('html');
windows.addEventListener('click', (e) => {
  if (e.target.classList.value.includes('faq')) {
    const answer = e.target.closest('.faqItem').querySelector('.faqAnswer');
    answer.classList.toggle('hideAnswer');
  }
});
