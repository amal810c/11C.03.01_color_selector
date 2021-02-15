"use strict";

window.addEventListener("DOMContentLoaded", initPage);

function initPage() {
  console.log("der er hul igennem");
  document
    .querySelector("#colorselect")
    .addEventListener("input", readSelectedColor);
  readSelectedColor();
}

function readSelectedColor() {
  console.log("This is your selected color");
  let selectedColor = document.getElementById("colorselect").value;
  console.log(selectedColor);
  showSelectedColor(selectedColor);
}

function showSelectedColor(event) {
  document.querySelector("#showcolor").style.backgroundColor = event;
  showHex(event);
}

function showHex(selectedColor) {
  document.getElementById("hexcolor").value = selectedColor.toString();
  hexToRgb(selectedColor);
}

function hexToRgb(string) {
  //split hex into tree parts and convert to numbers
  const r = parseInt(string.substring(1, 3), 16);
  const g = parseInt(string.substring(3, 5), 16);
  const b = parseInt(string.substring(5, 7), 16);
  console.log(`${r} ${g} ${b}`);
  showRgb(r, g, b);
}

function showRgb(r, g, b) {
  document.getElementById("rgbcolor").value = `${r} ${g} ${b}`;
  rgbToHsl(r, g, b);
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  showHsl(h, s, l);
}

function showHsl(h, s, l) {
  document.getElementById("hslcolor").value = `${h.toFixed(0)} ${s.toFixed(
    0
  )}% ${l.toFixed(0)}%`;
}
