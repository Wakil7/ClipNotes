const addSubject = document.getElementById("add-subject"),
  subjects = document.getElementById("subjects"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  subjectTag = document.getElementById("subject-tag"),
  editForm = document.getElementById("edit-form"),
  subjectForm = document.getElementById("subject-form"),
  displayNote = document.getElementById("display-note"),
  buttonMenu = document.getElementById("button-menu"),
  addSubjectBtn = document.getElementById("add-subject-btn"),
  confirmPopup = document.getElementById("confirm-popup"),
  overlay = document.getElementById("overlay"),
  yesBtn = document.getElementById("yesBtn"),
  noBtn = document.getElementById("noBtn"),
  loadingPopup = document.getElementById("loading-popup");

let confirmText = document.getElementById("confirm-text");
let isUpdateSubject = false;
let subjectCode = null;
let confirmId = null;
overlay.style.display = "none";
confirmPopup.style.display = "none";

addSubject.addEventListener("click", () => {
  popupTitle.innerText = "Add a New Subject";
  subjectTag.value = "";
  addSubjectBtn.innerText = "Add Subject";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
  isUpdateSubject = false;
  subjectCode = null;
  subjectTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});


yesBtn.addEventListener("click", () => {
  if (confirmId=="removeSubject")
  {
    loadingText.innerText = "Deleting Subject. Please Wait";
    removeSubject(subjectCode, function () {
      showSubjects();
    });
    subjectCode = null;
    overlay.style.display = "none";
    confirmPopup.style.display = "none";
    document.body.style.overflow = "auto";
    closeIcon.click();
  }
  else if (confirmId=="logout")
  {
    localStorage.removeItem("ClipNotesUserName")
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("currentSubject");
    window.location.href = "index.html";
  }
  confirmId = null;
})

noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
})

function viewSubject(subCode) {
  localStorage.setItem("currentSubject", subCode);
  window.location.href = "topics.html";
}

function editSubject(subCode, subName) {
  isUpdateSubject = true;
  addSubject.click();
  subjectTag.value = subName;
  isUpdateSubject = true;
  popupTitle.innerText = "Update Subject Name";
  addSubjectBtn.innerText = "Update";
  subjectCode = subCode;
}

function deleteSubject(subCode) {
  overlay.style.display = "block";
  confirmPopup.style.display = "block";
  document.body.style.overflow = "hidden";
  confirmId = "removeSubject";
  subjectCode = subCode;
}

addSubjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let subjectName = subjectTag.value.trim();
  if (subjectName == "") {
    errorNotification("Subject name cannot be left blank");
  }
  else {
    if (isUpdateSubject) {
      loadingText.innerText = "Updating Subject. Please Wait";
      updateSubject(subjectName, subjectCode);
      isUpdateSubject = false;
      subjectCode = null;
    }
    else {
      loadingText.innerText = "Adding Subject. Please Wait";
      setSubject(subjectName);
    }
    showSubjects();
    closeIcon.click();
    subjectTag.value = "";
  }
});


function showSubjects() {
  loadingPopup.style.display = "block";
  fetchSubjects(function (sub) {
    loadingPopup.style.display = "none";
    document.querySelectorAll(".note").forEach((li) => li.remove());
    if (sub == null) {
    }
    else {
      for (subCode in sub) {
        let liTag = `<li class="note">
        <div class="details" onclick="viewSubject('${subCode}')">
            <p id="subject-text">${sub[subCode].SubjectName}</p>
            <img src="Icons/folder.png" class="subject-image">
        </div>
        <div class="button-container">
            <button id="edit-button" onclick="editSubject('${subCode}','${sub[subCode].SubjectName}')">
            <i  class="uil uil-pen"></i>Edit
            </button>
            <button id="delete-button" onclick="deleteSubject('${subCode}')">
                <i  class="uil uil-trash"></i>Delete
            </button>
        </div>
    </li> `;
        addSubject.insertAdjacentHTML("afterend", liTag);
      }
    }
  })
}


const logoutBtn = document.getElementById("logout-button");
logoutBtn.addEventListener("click", ()=>{
  confirmText.innerText = "Are you sure you want to logout?"
  confirmId = "logout";
    overlay.style.display = "block";
  confirmPopup.style.display = "block";
  document.body.style.overflow = "hidden";
  
});



showSubjects();
