// document
//   .querySelector("#success")
//   .addEventListener("click", handleSuccesBtnClick);
// document.querySelector("#error").addEventListener("click", handleErrorBtnClick);
// document
//   .querySelector("#invalid")
//   .addEventListener("click", handleInvalidBtnClick);
const toastContainerElm = document.querySelector(".toast-container");

function successNotification(message) {
  const toastElm = document.createElement("div");
  toastElm.classList.add("toast", "success-toast");
  toastElm.innerHTML = `
    <div class="wrappertoast">
        <div class="tile"> 
        <div class="toasticon">
                <span class="material-icons">
                    check
                </span>
            </div> 
            <p>${message}</p>
        </div>
    </div>`;
  toastContainerElm.append(toastElm);
  setTimeout(() => {
    toastContainerElm.removeChild(toastElm);
  }, 3500);
}

function errorNotification(message) {
  const toastElm = document.createElement("div");
  toastElm.classList.add("toast", "error-toast");
  toastElm.innerHTML = `
    <div class="wrappertoast">
        <div class="tile">
            <div class="toasticon">
                <span class="material-icons">
                    clear
                </span>
            </div>
            <p>${message}</p>
        </div>
    </div>`;
  toastContainerElm.append(toastElm);
  setTimeout(() => {
    toastContainerElm.removeChild(toastElm);
  }, 3500);
}
/*
function handleInvalidBtnClick() {
  const toastElm = document.createElement("div");
  toastElm.classList.add("toast", "invalid-toast");
  toastElm.innerHTML = `
    <div class="wrapper">
        <div class="tile">
            <div class="icon">
                <span class="material-icons">
                    priority_high
                </span>
            </div>
            <p>Invalid input, check again</p>
        </div>
        <div class="progress-bar"></div>
    </div>`;
  toastContainerElm.append(toastElm);
  setInterval(() => {
    toastContainerElm.removeChild(toastElm);
  }, 3500);
}
*/
// successNotification("Success")
// errorNotification("Error")
// handleErrorBtnClick()