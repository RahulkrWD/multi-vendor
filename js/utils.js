export function showMessage(color, message) {
  let msg = document.getElementById("message");
  if (msg) {
    msg.style.color = color;
    msg.innerText = message;
  }
}

// export function showLoadingBar() {
// const loadingBar = document.getElementById("loading-bar");
// if (loadingBar) {
//   loadingBar.style.width = "0%";
//   loadingBar.style.display = "block";

//   setTimeout(() => {
//     loadingBar.style.width = "100%";
//   }, 0);
// }
// }

// export function hideLoadingBar() {
//   const loadingBar = document.getElementById("loading-bar");
//   if (loadingBar) {
//     setTimeout(() => {
//       loadingBar.style.width = "0%";
//       loadingBar.style.display = "none";
//     }, 1000);
//   }
// }
// export function showLoadingBar() {
//   document.getElementById("loading-circle").style.display = "block";
// }

// export function hideLoadingBar() {
//   document.getElementById("loading-circle").style.display = "none";
// }

// Show the loading spinner
export function showLoadingBar() {
  document.getElementById("loadingOverlay").style.display = "flex";
}

// Hide the loading spinner
export function hideLoadingBar() {
  document.getElementById("loadingOverlay").style.display = "none";
}
