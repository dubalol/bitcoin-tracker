window.addEventListener('DOMContentLoaded', (e) => {
  e.preventDefault();
  const body = document.querySelector('body');

  const newDiv = document.createElement('div');
  newDiv.innerHTML = 'Hi from bundled index.js';
  body.appendChild(newDiv);

  const newButton = document.createElement('button');
  newButton.innerHTML = 'Click me';
  body.appendChild(newButton);

  const priceList = document.createElement('ul');
  body.appendChild(priceList);


  newButton.addEventListener('click', async (e) => {
    e.preventDefault();

    // const price = await fetch('http://localhost:8080/api/test');
    // console.log(price);
    fetch('/api/test')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data.forEach((el) => {
          const newPricePoint = document.createElement('li');
          const textNode = document.createTextNode(`${el.datetime}: ${el.price}`);
          newPricePoint.appendChild(textNode);
          document.querySelector('ul').prepend(newPricePoint);
        });
      })
      .catch((err) => console.log(err));
  });

  const poweredBy = document.createElement('h5');
  poweredBy.innerHTML = 'Powered by Coinbase';
  body.appendChild(poweredBy);
});
