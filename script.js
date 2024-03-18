const addSubject = document.getElementById("add-subject"),
  subjects = document.getElementById("subjects"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  subjectTag = document.getElementById("subject-tag"),
  descTag = document.getElementById("desc-tag"),
  editForm = document.getElementById("edit-form"),
  subjectForm = document.getElementById("subject-form"),
  displayNote = document.getElementById("display-note"),
  buttonMenu = document.getElementById("button-menu"),
  addSubjectBtn = document.getElementById("add-subject-btn");


let subjectArr = JSON.parse(localStorage.getItem("subjects") || "[]");

addSubject.addEventListener("click", () => {
  popupTitle.innerText = "Add a New Subject";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});


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
showSubjects();



function viewSubject(subjectId) {
  localStorage.setItem("currentSubject", subjectId);
  window.location.href = "index2.html";
}

function editSubject(subjectId)
{

}

function deleteSubject(subjectId)
{
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  subjectArr.splice(subjectArr.indexOf(subjectId), 1);
  let topicsArr = JSON.parse(localStorage.getItem("notes"));
  let newTopicsArr = [];
  topicsArr.forEach((topic)=>{
    if (topic.subject!=subjectId)
    {
      newTopicsArr.push(topic);
    }
  })
  localStorage.setItem("subjects", JSON.stringify(subjectArr));
  localStorage.setItem("notes", JSON.stringify(newTopicsArr));
  closeIcon.click();
  showSubjects();
}

addSubjectBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let subjectName = subjectTag.value.trim();
  if (subjectName != "") {
    console.log(subjectArr);
    if (subjectArr.includes(subjectName)) {
      alert("This subject already exists");
    }
    else {
      subjectArr.push(subjectName);
      localStorage.setItem("subjects", JSON.stringify(subjectArr));
      showSubjects();
      closeIcon.click();
      subjectTag.value = "";
    }

  }
  else {
    alert("Subject name cannot be left blank");
  }

});

