let p = document.getElementById("p");
let button = document.getElementById("button");
let check = 1;



button.addEventListener("click", function() {
    p.innerHTML = "<strong> Sam </strong> clicked the button";
    console.log("check");
    setTimeout(function() {
        countdown();
    }, 5000);    
});

function countdown() {
    console.log("check2");
    p.innerHTML = "Press the button if you know the answer";
};