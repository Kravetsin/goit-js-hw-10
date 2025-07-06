import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const state = form.elements['state'].value;
  const delay = form.elements['delay'].value;

  const isSuccess = state;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isSuccess === 'fulfilled') {
        resolve(
          iziToast.success({
            message: `Fulfilled promise in ${delay}ms`,
            position: 'topRight',
          })
        );
      } else {
        reject(
          iziToast.error({
            message: `Rejected promise in ${delay}ms`,
            position: 'topRight',
          })
        );
      }
    }, delay);
  });

  console.log(promise);

});
