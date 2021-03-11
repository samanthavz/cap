//websockets

const ws = new WebSocket("wss://sam.tverhoef.com");

//check if characters are allowed in form

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


// checks ws data, deals with the data

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
        var feedback = document.getElementById("feedback");
        feedback.innerHTML = "username already exists";
        feedback.style.color = "red";
        
        console.log("register failed -> already exists")
    }
    else if (object.event === "actual clicker")
    {
        var audio = new Audio("./audio/buzzersound.mp3");
        audio.volume = 0.05;
        audio.play();
        

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

//check if connected + logging it

ws.addEventListener("open", () => {
    console.log("We are connected!");
})

ws.addEventListener("message", ({data}) => {
    jsonObject = JSON.parse(data)
    handleIncoming(jsonObject)
})

//form button check with start button

var knop = document.getElementById("startbutton");

function startbutton() {
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
};

knop.addEventListener("click", function() {
   startbutton()
});


//no refresh function
var form = document.getElementById("form");

form.addEventListener("submit", norefresh);

function norefresh(event){
    startbutton()
    event.preventDefault();
};

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
