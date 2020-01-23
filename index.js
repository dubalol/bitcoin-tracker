// // This file should interact with auth router
// // Auth router will send back client HTML page if successful, error if not
// // client HTML should reference bundle

// // Should this file be its own bundle?

// /*
// To Do:
// -Basic auth, no salt?
// -Create user record upon registration
// -Initialize portfolio
// -Enable buy/sell transactions
// -Github auth
// -Websocket
// */

// window.addEventListener('DOMContentLoaded', (e) => {
//   e.preventDefault();

//   const login = document.getElementById('login');
//   login.addEventListener('click', (ev) => {
//     ev.preventDefault();
//     console.log('hello from login button');
//     fetch('/auth')
//       .then((file) => file.text())
//       .then((html) => {
//         const parser = new DOMParser(); // converts html string into DOM element
//         const newPage = parser.parseFromString(html, 'text/html');
//         console.log(html);
//       })
//       .catch((err) => console.log(err));
//   });
// });
