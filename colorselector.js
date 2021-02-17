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
  let hexColor = document.getElementById("colorselect").value;
  console.log(hexColor);
  showSelectedColor(hexColor);
}

function showSelectedColor(hexColor) {
  const rgb = hexToRgb(hexColor);
  const cssString = rgbToCss(rgb);
  const hex = rgbToHex(rgb);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  colorTheBox(hexColor);
  showHex(hex);
  showRgb(cssString);
  showHsl(hsl);
}

function hexToRgb(hexColor) {
  //split hex into tree parts and convert to numbers
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  console.log(`${r} ${g} ${b}`);
  //her retuneres et object
  return { r, g, b };
}

function rgbToCss(rgb) {
  return `rgb( ${rgb.r}, ${rgb.g}, ${rgb.b} )`;
}

function rgbToHex(rgb) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);
  if (r.length < 2) {
    r = "0" + r;
  }
  if (g.length < 2) {
    g = "0" + g;
  }
  if (b.length < 2) {
    b = "0" + b;
  }

  return `#${r}${g}${b}`;
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

  return `${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%`;
}

function colorTheBox(hexColor) {
  document.querySelector("#showcolor").style.backgroundColor = hexColor;
}

function showHex(hexColor) {
  document.getElementById("hexcolor").value = hexColor;
}

function showRgb(cssString) {
  document.getElementById("rgbcolor").value = cssString;
}

function showHsl(hsl) {
  document.getElementById("hslcolor").value = hsl;
}
