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
