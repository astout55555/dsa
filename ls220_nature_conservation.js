"use strict";

function populationCountdown(count) {
  console.log(count);
  if (count === 0) return;
  populationCountdown(count - 1);
}

populationCountdown(34);
