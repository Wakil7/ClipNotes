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
  noBtn = document.getElementById("noBtn");

let isUpdateSubject = false;
let subjectCode = null;
overlay.style.display = "none";
confirmPopup.style.display = "none";
//let subjectArr = JSON.parse(localStorage.getItem("subjects") || "[]");
//let subjectArr = 

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

/*
function showSubjects() {
  if (!subjectArr) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  subjectsForShow = subjectArr;
  subjectsForShow.reverse();
  subjectsForShow.forEach((sub) => {
    let liTag = `<li class="note">
                        <div class="details">
                            <p>${sub}</p>
                            <span  onclick="viewSubject('${sub}')">[Subject Image]</span>
                        </div>
                        <button class="" onclick="editSubject('${sub}')"><i class="uil uil-pen"></i>Edit</button>
                         <button class="" onclick="deleteSubject('${sub}')"><i class="uil uil-trash"></i>Delete</button>

                    </li > `;
    addSubject.insertAdjacentHTML("afterend", liTag);
  });
}
*/
//showSubjects();


yesBtn.addEventListener("click", () => {
  removeSubject(subjectCode, function () {
    showSubjects();
  });
  subjectCode = null;
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
  closeIcon.click();
})

noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
})
function viewSubject(subCode) {
  sessionStorage.setItem("currentSubject", subCode);
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
  //let confirmDel = confirm("Are you sure you want to delete this note?");
  overlay.style.display = "block";
  confirmPopup.style.display = "block";
  document.body.style.overflow = "hidden";
  subjectCode = subCode;
}

addSubjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let subjectName = subjectTag.value.trim();
  if (subjectName == "") {
    alert("Subject name cannot be left blank");
  }
  else {
    if (isUpdateSubject) {
      updateSubject(subjectName, subjectCode);
      isUpdateSubject = false;
      subjectCode = null;
    }
    else {
      setSubject(subjectName);
    }
    showSubjects();
    closeIcon.click();
    subjectTag.value = "";
  }
});


function showSubjects() {
  fetchSubjects(function (subjects) {
    document.querySelectorAll(".note").forEach((li) => li.remove());
    if (subjects == null) {
      console.log("No Subjects Added. Create a new Subject Folder");
    }
    else {
      for (subCode in subjects) {
        let liTag = `<li class="note">
        <div class="details" onclick="viewSubject('${subCode}')">
            <p id="subject-text">${subjects[subCode].SubjectName}</p>
            <img src="Icons/folder.png" class="subject-image">
        </div>
        <div class="button-container">
            <button id="edit-button" onclick="editSubject('${subCode}','${subjects[subCode].SubjectName}')">
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

showSubjects();