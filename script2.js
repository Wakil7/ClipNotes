const addTopic = document.getElementById("add-topic"),
  topics = document.getElementById("topics"),
  //popupBox = document.querySelector(".popup-box"),
  //popupTitle = document.getElementById("title-text"),
  //closeIcon = document.getElementById("close-icon"),
  titleTag = document.getElementById("title-tag"),
  descTag = document.getElementById("desc-tag"),
  editForm = document.getElementById("edit-form"),
  displayNote = document.getElementById("display-note"),
  buttonMenu = document.getElementById("button-menu"),
  addTopicBtn = document.getElementById("add-topic-btn"),
  backBtn = document.getElementById("back-btn"),
  confirmPopup = document.getElementById("confirm-popup"),
  confirmText = document.getElementById("confirm-text"),
  overlay = document.getElementById("overlay"),
  yesBtn = document.getElementById("yesBtn"),
  noBtn = document.getElementById("noBtn");

const content = document.getElementById("content");
const saveBtn = document.getElementById("save-btn");
const topicName = document.getElementById("topic-name");
const viewTopicLabel = document.getElementById("view-topic-name");
const editBtn = document.getElementById("edit-button");
const deleteBtn = document.getElementById("delete-button");
const editorTools = document.getElementById("editor-tools");
const viewMenu = document.getElementById("view-menu");


const closePopupBtn = document.getElementById('close-popup');
const popup = document.getElementById('popup-box');


closePopupBtn.addEventListener('click', () => {
  popup.style.display = 'none';
  isUpdate = false;
  topicCode = null;
});


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

let isUpdate = false;
let topicCode = null;
overlay.style.display = "none";
confirmPopup.style.display = "none";

addTopic.addEventListener("click", () => {
  // popupTitle.innerText = "Add a New Topic";
  // addTopicBtn.innerText = "Add Topic";
  // editForm.style.display = "block";
  // displayNote.style.display = "none";
  // buttonMenu.style.display = "none";
  // popupBox.classList.add("show");
  popup.style.display = 'block';
  editorTools.style.display = "block";
  viewMenu.style.display = "none";
  content.innerText = "";
  topicName.value = "";
  content.setAttribute('contenteditable', true);
  // document.querySelector("body").style.overflow = "hidden";
  // if (window.innerWidth > 660) titleTag.focus();
});

noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
})

// closeIcon.addEventListener("click", () => {
//   isUpdate = false;
//   topicCode = null;
//   titleTag.value = descTag.value = "";
//   popupBox.classList.remove("show");
//   document.querySelector("body").style.overflow = "auto";
// });
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
/*
function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}
*/
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

function deleteTopic(topicId) {
  //let confirmDel = confirm("Are you sure you want to delete this topic?");
  overlay.style.display = "block";
  confirmPopup.style.display = "block";
  document.body.style.overflow = "hidden";
  confirmText.text = "Are you sure you want to delete this topic?"
  topicCode = topicId;

}

yesBtn.addEventListener("click", () => {
  removeTopic(topicCode, function () {
    showTopics();
  });
  topicCode = null;
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
  popup.style.display = "none"
})

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

function editTopic(topicId) {
  // let description = filterDesc.replaceAll("<br/>", "\r\n");
  // isUpdate = true;
  // addTopic.click();
  // titleTag.value = title;
  // descTag.value = description;
  // popupTitle.innerText = "Update Topic";
  // addTopicBtn.innerText = "Update";
  isUpdate = true;
  topicCode = topicId;
  content.setAttribute('contenteditable', true);
  isUpdate = true;
  editorTools.style.display = "block";
  viewMenu.style.display = "none";
}

function viewTopic(topicId, viewTopicName) {
  //let description = filterDesc.replaceAll("<br/>", "\r\n");
  //updateId = noteId;
  //isUpdate = true;
  //editForm.style.display = "none";
  // displayNote.style.overflowY = "auto";
  // displayNote.style.overflowX = "hidden";
  // displayNote.style.width = "300px";
  // displayNote.style.height = "200px";
  // displayNote.style.display = "block";
  // displayNote.style.margin = "0 0 20px 0";
  // displayNote.style.fontSize = "18px";
  // displayNote.style.lineHeight = "1.6";
  // displayNote.style.padding = "0 ";
  // displayNote.style.wordWrap = 'break-word';
  // displayNote.style.overflowWrap = 'break-word';
  // displayNote.style.maxWidth = "800px";
  // displayNote.style.marginLeft = "auto";
  // displayNote.style.marginRight = "auto";
  // buttonMenu.style.display = "block";
  //   console.log(noteId);
  // buttonMenu.innerHTML = `<button class="btpop" onclick="editTopic('${topicId}', '${title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</button>
  // <button class="btpop" onclick="deleteTopic('${topicId}')"><i class="uil uil-trash"></i>Delete</button>`;
  // displayNote.innerHTML = filterDesc;
  // descTag.value = description;
  // popupTitle.innerText = title;
  // addTopicBtn.innerText = "Close";
  fetchTopics(function (topics) {
    for (topicCode in topics) {
      if (topicCode == topicId) {
        content.innerHTML = topics[topicCode].content;
        break;
      }
    }
    popup.style.display = 'block';
    editorTools.style.display = "block";
    viewMenu.style.display = "none";
    topicName.value = viewTopicName;
    editorTools.style.display = "none";
    viewMenu.style.display = "block";
    content.setAttribute('contenteditable', false);
    viewMenu.innerHTML = `<label id="view-topic-name">${viewTopicName}</label>
  <button id="edit-button" onclick="editTopic('${topicId}')">Edit</button>
  <button id="delete-button" onclick="deleteTopic('${topicId}')">Delete</button>`;
  });


}

saveBtn.addEventListener("click", () => {
  let saveTopicName = topicName.value.trim();
  let saveContent = content.innerHTML;
  if (saveTopicName == "") {
    errorNotification("Please add a topic Name");
  }

  else if (content.innerText.trim() == "") {
    errorNotification("No content added");
  }
  else {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear(),
      date = `${month} ${day}, ${year}`;
    if (isUpdate) {
      updateTopic(saveTopicName, saveContent, date, topicCode);
      isUpdate = false;
      topicCode = null;
    }
    else {
      setTopic(saveTopicName, saveContent, date);
      topicName.value = "";
      content.innerText = "";
    }
    showTopics();
    popup.style.display = 'none';
  }

});

/*
addTopicBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value.trim(),
    description = descTag.value.trim();
  if (title == "" || description == "") {
    errorNotification("Title and Description cannot be left blank");
  }
  else {
    let currentDate = new Date(),
      month = months[currentDate.getMonth()],
      day = currentDate.getDate(),
      year = currentDate.getFullYear(),
      date = `${month} ${day}, ${year}`;
    if (isUpdate)
    {
      updateTopic(title, description, date, topicCode);
      isUpdate = false;
      topicCode = null;
    }
    else
    {
      setTopic(title, description, date);
    }
    showTopics();
    closeIcon.click();
  }
});
*/


function showTopics() {
  fetchTopics(function (topics) {
    document.querySelectorAll(".note").forEach((li) => li.remove());
    //console.log(topics)
    if (topics == null) {
      console.log("You haven't added any topics yet");
    }
    else {
      for (topicCode in topics) {
        //let filterDesc = topics[topicCode].content.replaceAll("\n", "<br/>");
        //let filterContent = escapeHtml(topics[topicCode].content);
        let topicContent = topics[topicCode].content;
        let liTag = `<li class="note"  >
                        <div class="details" onclick="viewTopic('${topicCode}','${topics[topicCode].title}')">
                            <p>${topics[topicCode].title}</p>
                            <img src="Icons/sticky-note.png" class="topic-img">
                        </div>
                        <div class="bottom-content">
                            <span>${topics[topicCode].date}</span>
                            
                        </div>
                    </li>`;
        addTopic.insertAdjacentHTML("afterend", liTag);
      }
    }
  });
}

showTopics();





function formatDoc(cmd, value = null) {
  if (value) {
    document.execCommand(cmd, false, value);
  } else {
    document.execCommand(cmd);
  }
}

function addLink() {
  const url = prompt('Insert url');
  formatDoc('createLink', url);
}






content.addEventListener('mouseenter', function () {
  const a = content.querySelectorAll('a');
  a.forEach(item => {
    item.addEventListener('mouseenter', function () {
      content.setAttribute('contenteditable', false);
      item.target = '_blank';
    })
    item.addEventListener('mouseleave', function () {
      content.setAttribute('contenteditable', true);
    })
  })
})


const showCode = document.getElementById('show-code');
let active = false;

// showCode.addEventListener('click', function () {
// 	showCode.dataset.active = !active;
// 	active = !active
// 	if(active) {
// 		content.textContent = content.innerHTML;
// 		content.setAttribute('contenteditable', false);
// 	} else {
// 		content.innerHTML = content.textContent;
// 		content.setAttribute('contenteditable', true);
// 	}
// })



//const filename = document.getElementById('filename');

// function fileHandle(value) {
// 	if(value === 'new') {
// 		content.innerHTML = '';
// 		filename.value = 'untitled';
// 	} else if(value === 'txt') {
// 		const blob = new Blob([content.innerText])
// 		const url = URL.createObjectURL(blob)
// 		const link = document.createElement('a');
// 		link.href = url;
// 		link.download = `${filename.value}.txt`;
// 		link.click();
// 	} else if(value === 'pdf') {
// 		html2pdf(content).save(filename.value);
// 	}
// }
