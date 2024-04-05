const addTopic = document.getElementById("add-topic"),
  topics = document.getElementById("topics"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = document.getElementById("title-text"),
  closeIcon = document.getElementById("close-icon"),
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


const closePopupBtn = document.getElementById('close-popup');
const popup = document.getElementById('popup-box');


closePopupBtn.addEventListener('click', () => {
  popup.style.display = 'none';
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
  // document.querySelector("body").style.overflow = "hidden";
  // if (window.innerWidth > 660) titleTag.focus();
});

noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
})

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  topicCode = null;
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

yesBtn.addEventListener("click", ()=>{
  removeTopic(topicCode, function () {
    showTopics();
  });
  topicCode = null;
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
  closeIcon.click();
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

function editTopic(topicId, title, filterDesc)
{
  let description = filterDesc.replaceAll("<br/>", "\r\n");
  isUpdate = true;
  addTopic.click();
  titleTag.value = title;
  descTag.value = description;
  popupTitle.innerText = "Update Topic";
  addTopicBtn.innerText = "Update";
  topicCode = topicId;
}

function viewTopic(topicId, title, filterDesc) {
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
  displayNote.style.wordWrap = 'break-word';
  displayNote.style.overflowWrap = 'break-word';
  // displayNote.style.maxWidth = "800px";
  displayNote.style.marginLeft = "auto";
  displayNote.style.marginRight = "auto";
  buttonMenu.style.display = "block";
  //   console.log(noteId);
  buttonMenu.innerHTML = `<button class="btpop" onclick="editTopic('${topicId}', '${title}', '${filterDesc}')"><i class="uil uil-pen"></i>Edit</button>
  <button class="btpop" onclick="deleteTopic('${topicId}')"><i class="uil uil-trash"></i>Delete</button>`;
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

function showTopics() {
  fetchTopics(function (topics) {
    document.querySelectorAll(".note").forEach((li) => li.remove());
    //console.log(topics)
    if (topics == null) {
      console.log("You haven't added any topics yet");
    }
    else {
      for (topicCode in topics) {
        let filterDesc = topics[topicCode].description.replaceAll("\n", "<br/>");
        let showDesc;
        if (filterDesc.length > 50) {
          showDesc = filterDesc.substring(0, 50) + "...";
        } else {
          showDesc = filterDesc;
        }
        let liTag = `<li class="note"  >
                        <div class="details" onclick="viewTopic('${topicCode}','${topics[topicCode].title}', '${filterDesc}')">
                            <p>${topics[topicCode].title}</p>
                                <p>${showDesc}</p>
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





function formatDoc(cmd, value=null) {
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}
}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);
}




const content = document.getElementById('content');

content.addEventListener('mouseenter', function () {
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
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



const filename = document.getElementById('filename');

function fileHandle(value) {
	if(value === 'new') {
		content.innerHTML = '';
		filename.value = 'untitled';
	} else if(value === 'txt') {
		const blob = new Blob([content.innerText])
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a');
		link.href = url;
		link.download = `${filename.value}.txt`;
		link.click();
	} else if(value === 'pdf') {
		html2pdf(content).save(filename.value);
	}
}
