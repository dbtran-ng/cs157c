// main.js
const update = document.querySelector('#update-button');

update.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'd',
      country: 'Canada',
    }),
  });
});

const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Anaa Airport',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      window.location.reload();
    });
});
