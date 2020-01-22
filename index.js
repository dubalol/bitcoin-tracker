// This file should interact with auth router
// Auth router will send back client HTML page if successful, error if not
// client HTML should reference bundle

// Should this file be its own bundle?

window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();

  const login = document.getElementById('login');
  login.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('/client/index.html');
  });
});
