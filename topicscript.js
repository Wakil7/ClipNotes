const addTopic = document.getElementById("add-topic"),
  topics = document.getElementById("topics"),
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
const deleteBtn = document.getElementById("delete-button");
const editorTools = document.getElementById("editor-tools");
const viewMenu = document.getElementById("view-menu");
const loadingPopup = document.getElementById("loading-popup");


const closePopupBtn = document.getElementById('close-popup');
const popup = document.getElementById('popup-box');


closePopupBtn.addEventListener('click', () => {
  if (isUpdate || isAddTopic) {
    overlay.style.display = "block";
    confirmPopup.style.display = "block";
    document.body.style.overflow = "hidden";
    confirmText.innerText = "Your changes are not saved.\n Do you want to close?"
    confirmId = "closeEditor";
  }
  else {
    popup.style.display = 'none';
    isUpdate = false;
    globalTopicCode = null;
    isAddTopic = false;
  }
});


let currentSubject = localStorage.getItem("currentSubject");

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
let globalTopicCode = null;
let confirmId = null;
let isAddTopic = false;
overlay.style.display = "none";
confirmPopup.style.display = "none";

addTopic.addEventListener("click", () => {
  popup.style.display = 'block';
  editorTools.style.display = "block";
  viewMenu.style.display = "none";
  content.innerText = "";
  topicName.value = "";
  content.setAttribute('contenteditable', true);
  isAddTopic = true;
});

noBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
})

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" || e.target != elem) {
      elem.parentElement.classList.remove("show");
    }
  });
}


function deleteTopic(topicId) {
  overlay.style.display = "block";
  confirmPopup.style.display = "block";
  document.body.style.overflow = "hidden";
  confirmText.innerText = "Are you sure you want to delete this topic?"
  confirmId = "removeTopic";
  globalTopicCode = topicId;

}

yesBtn.addEventListener("click", () => {
  if (confirmId == "removeTopic") {
    loadingText.innerText = "Deleting Topic. Please Wait";
    removeTopic(globalTopicCode, function () {
      showTopics();
    });
    globalTopicCode = null;
  }
  else if (confirmId == "logout") {
    localStorage.removeItem("ClipNotesUserName")
    localStorage.removeItem("currentUserName");
    localStorage.removeItem("currentSubject");
    window.location.href = "index.html";
  }
  else if (confirmId == "closeEditor") {
    popup.style.display = 'none';
    isUpdate = false;
    globalTopicCode = null;
    isAddTopic = false;
  }
  overlay.style.display = "none";
  confirmPopup.style.display = "none";
  document.body.style.overflow = "auto";
  popup.style.display = "none"
  confirmId=null;
})


function editTopic(topicId) {
  loadingText.innerText = "Loading...";
  loadingPopup.style.display = "block";
  let editTopicName;
  fetchTopics(function (topics) {
    for (topicCode in topics) {
      if (topicCode == topicId) {
        content.innerHTML = topics[topicCode].content;
        editTopicName = topics[topicCode].title;
        break;
      }
    }
    loadingPopup.style.display = "none";
    popup.style.display = 'block';
    isUpdate = true;
  globalTopicCode = topicId;
  topicName.value = editTopicName;
  content.setAttribute('contenteditable', true);
  editorTools.style.display = "block";
  viewMenu.style.display = "none";
  });
}

function viewTopic(topicId, viewTopicName) {
  loadingText.innerText = "Loading...";
  loadingPopup.style.display = "block";
  fetchTopics(function (topics) {
    for (topicCode in topics) {
      if (topicCode == topicId) {
        content.innerHTML = topics[topicCode].content;
        break;
      }
    }
    loadingPopup.style.display = "none";
    popup.style.display = 'block';
    editorTools.style.display = "block";
    viewMenu.style.display = "none";
    topicName.value = viewTopicName;
    editorTools.style.display = "none";
    viewMenu.style.display = "block";
    content.setAttribute('contenteditable', false);
    viewMenu.innerHTML = `<label id="view-topic-name">${viewTopicName}</label>`;
  });


}

saveBtn.addEventListener("click", () => {
  let saveTopicName = topicName.value.trim();
  let saveContent = content.innerHTML;
  if (saveTopicName == "") {
    errorNotification("Please add a Topic Name");
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
      isAddTopic = false;
    if (isUpdate) {
      loadingText.innerText = "Updating Topic. Please Wait";
      updateTopic(saveTopicName, saveContent, date, globalTopicCode);
      isUpdate = false;
      globalTopicCode = null;
    }
    else {
      loadingText.innerText = "Adding Topic. Please Wait";
      setTopic(saveTopicName, saveContent, date);
      topicName.value = "";
      content.innerText = "";
    }
    showTopics();
    popup.style.display = 'none';
  }

});


function showTopics() {
  loadingPopup.style.display = "block";
  fetchTopics(function (topics) {
    loadingPopup.style.display = "none";
    document.querySelectorAll(".note").forEach((li) => li.remove());
    if (topics == null) {
    }
    else {
      for (topicCode in topics) {
        let liTag = `<li class="note"  >
                        <div class="details" onclick="viewTopic('${topicCode}','${topics[topicCode].title}')">
                            <p id="topic-text">${topics[topicCode].title}</p>
                            <img src="Icons/sticky-note.png" class="topic-img">
                        </div>
                        <div class="bottom-content">
                            <span>${topics[topicCode].date}</span>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu">
                                    <li onclick="editTopic('${topicCode}')"><i class="uil uil-pen"></i>Edit</li>
                                    <li onclick="deleteTopic('${topicCode}')"><i class="uil uil-trash"></i>Delete</li>
                                </ul>

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


const logoutBtn = document.getElementById("logout-button");
logoutBtn.addEventListener("click", () => {
  overlay.style.display = "block";
  confirmPopup.style.display = "block";
  document.body.style.overflow = "hidden";
  confirmText.innerText = "Are you sure you want to logout?"
  confirmId = "logout";
});


