const hackedText = document.getElementById("hackedText");
const message = "YOUR DEVICE IS HACKED";
let index = 0;

function typeMessage() {
    if (index < message.length) {
        hackedText.innerHTML += message.charAt(index);
        index++;
        setTimeout(typeMessage, 100);
    }
}

typeMessage();
