const addTopic = document.getElementById("add-topic"),
  topics = document.getElementById("topics"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  titleTag = document.getElementById("title-tag"),
  descTag = document.getElementById("desc-tag"),
  editForm = document.getElementById("edit-form"),
  displayNote = document.getElementById("display-note"),
  buttonMenu = document.getElementById("button-menu"),
  addTopicBtn = document.getElementById("add-topic-btn"),
  backBtn = document.getElementById("back-btn");

let currentSubject = sessionStorage.getItem("currentSubject");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let isUpdate = false,
  updateId;

addTopic.addEventListener("click", () => {
  popupTitle.innerText = "Add a New Topic";
  addTopicBtn.innerText = "Add Topic";
  editForm.style.display = "block";
  displayNote.style.display = "none";
  buttonMenu.style.display = "none";
  popupBox.classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
  if (window.innerWidth > 660) titleTag.focus();
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = descTag.value = "";
  popupBox.classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
});
/*
function showNotes() {
  if (!notes) return;
  document.querySelectorAll(".note").forEach((li) => li.remove());
  notesForShow = notes;
  notesForShow.reverse();
  notesForShow.forEach((note, id) => {
    let filterDesc = note.description.replaceAll("\n", "<br/>");
    let showDesc;
    if (filterDesc.length > 50) {
      showDesc = filterDesc.substring(0, 50) + "...";
    } else {
      showDesc = filterDesc;
    }
    if (note.subject == currentSubject) {
      let liTag = `<li class="note"  >
                        <div class="details" onclick="viewNote(${id}, '${note.title}', '${filterDesc}')">
                            <p>${note.title}</p>
                            <span>${showDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>${note.date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="updateNote(${id}, '${note.title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${id})"><i class="uil uil-trash"></i>Delete</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
      addTopic.insertAdjacentHTML("afterend", liTag);
    }
  });
}
*/
//showNotes();

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
/*
function deleteNote(noteId) {
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if (!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  closeIcon.click();
  showNotes();
}
*/

function deleteTopic(topicName)
{
  let confirmDel = confirm("Are you sure you want to delete this topic?");
  if (!confirmDel) return;
  removeTopic(topicName, function(){
    showTopics();
  });
  closeIcon.click();
}

/*
function updateNote(noteId, title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  updateId = noteId;
  isUpdate = true;
  addTopic.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update a Note";
  addTopicBtn.innerText = "Update Note";
}
*/

function viewTopic(title, filterDesc) {
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  //updateId = noteId;
  //isUpdate = true;
  addTopic.click();
  editForm.style.display = "none";
  displayNote.style.overflowY = "auto";
  displayNote.style.overflowX = "hidden";
  displayNote.style.width = "300px";
  displayNote.style.height = "200px";
  displayNote.style.display = "block";
  displayNote.style.margin = "0 0 20px 0";
  displayNote.style.fontSize = "18px";
  displayNote.style.lineHeight = "1.6";
  displayNote.style.padding = "0 ";
  // displayNote.style.maxWidth = "800px";
  displayNote.style.marginLeft = "auto";
  displayNote.style.marginRight = "auto";
  buttonMenu.style.display = "block";
  //   console.log(noteId);
  buttonMenu.innerHTML = `<button class="btpop" onclick="updateNote(${title}, '${title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</button>
  <button class="btpop" onclick="deleteTopic('${title}')"><i class="uil uil-trash"></i>Delete</button>`;
  displayNote.innerHTML = filterDesc;
  descTag.value = description;
  popupTitle.innerText = title;
  addTopicBtn.innerText = "Close";
}


addTopicBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();
  if (title == "" || description == "") {
    alert("Title and Description cannot be left blank");
  }
  else {
    fetchTopics(function (topics) {
      for (topicName in topics) {
        if (topicName == title) {
          alert("This topic name already exists");
          return;
        }
      }
      let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear(),
        date = `${month} ${day}, ${year}`;
      setTopic(title, description, date);
      showTopics();
      closeIcon.click();
    });

  }
});

function showTopics() {
  fetchTopics(function (topics) {
    document.querySelectorAll(".note").forEach((li) => li.remove());
    if (topics == null) {
      console.log("You haven't added any topics yet");
    }
    else {
      for (topicName in topics) {
        let filterDesc = topics[topicName].description.replaceAll("\n", "<br/>");
        let showDesc;
        if (filterDesc.length > 50) {
          showDesc = filterDesc.substring(0, 50) + "...";
        } else {
          showDesc = filterDesc;
        }
        let liTag = `<li class="note"  >
                        <div class="details" onclick="viewTopic('${topicName}', '${filterDesc}')">
                            <p>${topicName}</p>
                            <span>${showDesc}</span>
                        </div>
                        <div class="bottom-content">
                            <span>Added on ${topics[topicName].date}</span>
                            
                        </div>
                    </li>`;
        addTopic.insertAdjacentHTML("afterend", liTag);
      }
    }
  });
}

showTopics();