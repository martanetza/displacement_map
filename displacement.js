"use strict";

let img;
let imgData;
let imgMap;
let imgData_Map;
let output;
let imgData_output;
let pixelIndex;
const imageCanvas = document.getElementById("imageCanvas");
let ctx = imageCanvas.getContext("2d");

document.addEventListener("DOMContentLoaded", drawImg);
function drawImg() {
  imgMap = new Image();
  imgMap.src = "balon_map.jpg";
  img = new Image();
  img.src = "balon.jpg";
  output = new Image();

  img.onload = function() {
    ctx.drawImage(img, 0, 0);
    document
      .getElementById("imageCanvas")
      .addEventListener("mousemove", MouseMove);
    getImgData();
    console.log(imgData);
    createImgData_output();
  };
  imgMap.onload = function() {
    ctx.drawImage(imgMap, 0, 0);

    getImgData_Map();
    console.log(imgData_Map);
  };
}

function getImgData() {
  imgData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
}
function getImgData_Map() {
  imgData_Map = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
}
function createImgData_output() {
  imgData_output = ctx.createImageData(imageCanvas.width, imageCanvas.height);
  console.log(imgData_output);
}

const imageW = ctx.canvas.width;
let greyvalue;

let offsetX;
let offsetY;

function placeOutput(x, displacementX, y, displacementY) {
  console.log(greyvalue);

  let originalPixelIndex;

  for (let y = 0; y < ctx.canvas.height; y++) {
    for (let x = 0; x < ctx.canvas.width; x++) {
      pixelIndex = (y * imageW + x) * 4;
      greyvalue = imgData_Map.data[pixelIndex] / 255;
      pixelIndex = (y * imageW + x) * 4;
      offsetX = Math.round(x + displacementX * greyvalue);
      offsetY = Math.round(y + displacementY * greyvalue);
      originalPixelIndex = (offsetY * imageW + offsetX) * 4;
      // console.log(imageIndex);

      imgData_output.data[pixelIndex] = imgData.data[originalPixelIndex];
      imgData_output.data[pixelIndex + 1] =
        imgData.data[originalPixelIndex + 1];
      imgData_output.data[pixelIndex + 2] =
        imgData.data[originalPixelIndex + 2];
      imgData_output.data[pixelIndex + 3] =
        imgData.data[originalPixelIndex + 3];
    }
  }

  console.log(y, offsetY, displacementY);
  console.log(x, offsetX, displacementY);
  ctx.putImageData(imgData_output, 0, 0);
  console.log(pixelIndex, originalPixelIndex);
}

function MouseMove(event) {
  // ctx.clearRect(0, 0, 500, 600);
  const x = event.offsetX;
  const y = event.offsetY;
  //   console.log(x, y);

  // console.log(x, displacementX);

  // copyOrgImgToOutput();
  CountDisplacement(x, y);

  // console.log(originalPixelIndex);
}

const MAX_MOVEMENT = 10;

function CountDisplacement(x, y) {
  let displacementX;
  let displacementY;

  const ratioX = (x / imageCanvas.width) * 2 - 1;
  const ratioY = (y / imageCanvas.height) * 2 - 1;
  displacementX = MAX_MOVEMENT * ratioX;
  displacementY = MAX_MOVEMENT * ratioY;
  console.log(displacementY);

  placeOutput(x, displacementX, y, displacementY);
}
