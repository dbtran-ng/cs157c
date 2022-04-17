app.use(express.static('public'));
// main.js
const update = document.querySelector('#update-button');

update.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'ZZZ',
      country: 'Canada',
    }),
  });
});
