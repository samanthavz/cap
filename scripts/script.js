//websockets

const ws = new WebSocket("ws://localhost:8000");

ws.addEventListener("open", () => {
    console.log("We are connected!");

    ws.send("Hey, how's it going?");
})

ws.addEventListener("message", ({data}) => {
    console.log(data);
})

//form button check

var knop = document.getElementById("startbutton");
var formdiv = document.getElementById("formdiv");
var maindiv = document.getElementById("maindiv");

knop.addEventListener("click", function() {
   
    var text = document.getElementById("text").value;

    if (text === "") {
        console.log("empty field");
    } else {
        console.log("notempty");
        formdiv.style.display = "none"
        maindiv.style.display = "block"
        name = text;
    }
});


// button click function

let p = document.getElementById("p");
let button = document.getElementById("button");
let check = 1;
var clicked = false;

var name

button.addEventListener("click", function() {
    if (clicked) {
        return
    };
    clicked = true;
    p.innerHTML = `<strong style='color:red'>` + name + `</strong> clicked the button`;
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



// //background image png/jpg check

// var fs = require('fs');
// var files = fs.readdirSync('../images/background*');

// var body = document.getElementById("body");

// body.style.backgroundImage = files[0];


// background-image: url("../images/background.jpg");