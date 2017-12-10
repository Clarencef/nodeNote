'use strict';
navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var constraints = {
  audio: false,
  video: {
    width: 500,
    height:410
  }
};
 
var video = document.querySelector("video");
console.log(video);

function successCallback (stream) {
  window.stream = stream;
  if (window.URL) {
    video.src= window.URL.createObjectURL(stream);
  } else {
    video.src= stream;
  }
}

function errorCallback (error) {
  console.log('navigator.getUserMedia error: ', error);
}

navigator.getUserMedia(constraints, successCallback, errorCallback);