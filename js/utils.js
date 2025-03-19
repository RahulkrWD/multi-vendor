// Display message
export function showMessage(color, message) {
  let msg = document.getElementById("message");
  if (msg) {
    msg.style.color = color;
    msg.innerText = message;
  }
}
