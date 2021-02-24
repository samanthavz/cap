// button click function

let p = document.getElementById("p");
let button = document.getElementById("button");
let check = 1;
var clicked = false;


button.addEventListener("click", function() {
    if (clicked) {
        return
    };
    clicked = true;
    p.innerHTML = "<strong style='color:red'> Sam </strong> clicked the button";
    console.log("check");
    setTimeout(function() {
        countdown();
        clicked = false;
    }, 5000);    
});

function countdown() {
    console.log("check2");
    p.innerHTML = "Press the button if you know the answer";
};

//background image png/jpg check

var fs = require('fs');
var files = fs.readdirSync('../images/background*');

var body = document.getElementById("body");

body.style.backgroundImage = files[0];


// background-image: url("../images/background.jpg");