"use strict";

var request = false;
var data;

// request
function getRequestObject() {
    try {
       request = new XMLHttpRequest();
    }
    catch (requestError) {
       return false;
    }
    return request;
}

// result
function getResults() {
    if (!request) {
       request = getRequestObject();
    }
    request.abort();
    request.open("get","http://facultyweb.centennialcollege.ca/pgignac/comp125/chapter11/movie.php", true);
    request.send();
    request.onreadystatechange = displaySuggestions;
}

// display
function displaySuggestions() {
   if(request.readyState === 4 && request.status === 200) {
      data = JSON.parse(request.responseText);
      var p="";
      
      for(var i = 0; i<= 5; i++){
      var num = i+1;

      // number
      var tableCell = document.getElementById("01-" + num);
      p = tableCell.getElementsByTagName("p");
      p[0].innerHTML=i+1;

      // title
      var tableCell = document.getElementById("02-" + num);
      p = tableCell.getElementsByTagName("p");
      p[0].innerHTML = data.movies[i]['title'];

      // year
      var tableCell = document.getElementById("03-" + num);
      p = tableCell.getElementsByTagName("p");
      p[0].innerHTML = data.movies[i]['year'];

      //// for make sure
      // console.log(data.movies[i]['title']);
      // console.log(data.movies[i]['year']);

      }
   }
}

// call functions
if(window.addEventListener){
    window.addEventListener("load",getResults , false);
 }else if(window.attachEvent){
    window.attachEvent("onload", getResults);
 }
 