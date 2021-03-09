//websockets

const ws = new WebSocket("wss://sam.tverhoef.com");

function isValidName(name)
{
    const regex = /^[a-zA-Z0-9 ]+$/um
    let match

    if ((match = regex.exec(name)) !== null) {
        // The result can be accessed through the `m`-variable.
        return true
    }

    return false
}

function handleIncoming(object)
{
    if (object.event === "registered")
    {        
        var formdiv = document.getElementById("formdiv");
        var maindiv = document.getElementById("maindiv");

        formdiv.style.display = "none"
        maindiv.style.display = "block"
        console.log("register OK")
    }
    else if (object.event === "already exists")
    {
        // maak zichtbaar dat username al bestaat
        console.log("register failed -> already exists")
    }
    else if (object.event === "actual clicker")
    {
        p.innerHTML = `<strong style='color:red'>` + object.name + `</strong> clicked the button`;
        clicked = true
        setTimeout(function() {
            countdown();
            clicked = false;
        }, 10000); 
    }
    else if (object.event === "keep alive")
    {
        // drop packet, just to keep connection open
        console.log("keep alive received")
    }
    else if (object.event === "invalid name")
    {
        console.log("invalid name")
    }
    else
    {
        console.log("Error: unknown server response: " + JSON.stringify(object))
    }
}

ws.addEventListener("open", () => {
    console.log("We are connected!");
})

ws.addEventListener("message", ({data}) => {
    jsonObject = JSON.parse(data)
    handleIncoming(jsonObject)
})

//form button check

var knop = document.getElementById("startbutton");

knop.addEventListener("click", function() {
   
    var text = document.getElementById("text").value;

    if (text === "") {
        console.log("empty field");
    } else {
        console.log("notempty");

        if (!isValidName(text))
        {
            console.log("invalid name entered")
            return;
        }

        username = text;
        
        ws.send(
            JSON.stringify({name: username, event: "connect"})
        )
    }
});


// button click function

let p = document.getElementById("p");
let button = document.getElementById("button");
let check = 1;
var clicked = false;

var username

button.addEventListener("click", function() {
    if (clicked) {
        return
    };
    clicked = true;

    ws.send(
        JSON.stringify({name: username, event: "clicked"})
    )   
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