import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timeInput = document.getElementById('datetime-picker');
const startButton = document.querySelector('button');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0];
    if (selectedTime > new Date()) {
      userSelectedDate = selectedTime.getTime();
      startButton.disabled = false;
    } else {
      iziToast.error({
        title: 'Invalid date',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      userSelectedDate = null;
    }
  },
};

flatpickr(timeInput, options);

startButton.addEventListener('click', () => {
  if (!userSelectedDate) {
    iziToast.warning({
      title: 'No date',
      message: 'Please select a date',
      position: 'topRight',
    });
    return;
  }

  startButton.disabled = true;
  timeInput.disabled = true;

  timerId = setInterval(() => {
    const delta = userSelectedDate - Date.now();

    if (delta <= 0) {
      clearInterval(timerId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      iziToast.success({
        title: 'Done',
        message: 'Countdown finished',
        position: 'topRight',
      });
      return;
    }

    const time = convertMs(delta);
    updateTimerDisplay(time);
  }, 1000);
});

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysEl.textContent = formatTime(days);
  hoursEl.textContent = formatTime(hours);
  minutesEl.textContent = formatTime(minutes);
  secondsEl.textContent = formatTime(seconds);
}

function formatTime(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
