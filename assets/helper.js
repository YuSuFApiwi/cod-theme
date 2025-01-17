/* --------------------------- */
/* ----- countdown timer ----- */
/* --------------------------- */

/**
 * addZero function, adds a zero in front of a number if it's less than 10
 * @param {number} x - number to be checked
 * @returns {string} - number with a zero in front if it's less than 10
 */
const addZero = (x) => {
  if (x < 10 && x >= 0) {
    return `0${x}`;
  }

  return x;
}

/**
 * $ function, a shorthand for document.querySelector
 * countdown function, takes a target element and sets the countdown timer
 * @param {*} target 
 */
const $ = elem => document.querySelector(elem);

/**
 * countdown function, takes a target element and sets the countdown timer
 * @param {*} target 
 */
const countdown = (target) => {
  const tarDate = $(target).getAttribute('data-date').split('-');

  const day = parseInt(tarDate[0]);
  const month = parseInt(tarDate[1]);
  const year = parseInt(tarDate[2]);

  let targetedTime = $(target).getAttribute('data-time');
  let targetedHour, targetedMin;

  if (targetedTime != null) {
    targetedTime = targetedTime.split(':');
    targetedHour = parseInt(targetedTime[0]);
    targetedMin = parseInt(targetedTime[1]);
  }

  // Set the date we're counting down to
  const countDownDate = new Date(year, month-1, day, targetedHour, targetedMin, 0, 0).getTime();

  const updateTime = () => {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);


    $(`${target} .day .num`).innerHTML = addZero(days);
    $(`${target} .hour .num`).innerHTML = addZero(hours);
    $(`${target} .min .num`).innerHTML = addZero(minutes);
    $(`${target} .sec .num`).innerHTML = addZero(seconds);

    if (distance < 0) {
      clearInterval(updateTime);
      return $(".countdown").style.display = "none";
    }
  }

  updateTime();
  setInterval(updateTime, 1000);
}
