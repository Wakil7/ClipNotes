const firebaseConfig = {
  apiKey: "AIzaSyCUSE0nNakeW5VzEeHGgYSAhuCnPyep5ME",
  authDomain: "clip-notes-project.firebaseapp.com",
  databaseURL: "https://clip-notes-project-default-rtdb.firebaseio.com",
  projectId: "clip-notes-project",
  storageBucket: "clip-notes-project.appspot.com",
  messagingSenderId: "1093280901008",
  appId: "1:1093280901008:web:cbfc757ff7796ad8edf515"
};
firebase.initializeApp(firebaseConfig);

let notesDB = firebase.database();


function setSubject(subName) {
  //let newSubRef = notesDB.child(userName).child(subName);
  let currentUserName = sessionStorage.getItem("currentUserName");
  let subjectCode = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects").push().key;
  let newSubRef = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/" + subjectCode);
  newSubRef.set({ "SubjectName": subName }).then(() => {
    console.log("Subject set successfully!");
  })
    .catch((error) => {
      console.error("Error setting subject:", error);
    });
}

function updateSubject(subName, subCode)
{
  let currentUserName = sessionStorage.getItem("currentUserName");
  let subRef = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/" + subCode);
  subRef.update({ "SubjectName": subName }).then(() => {
    console.log("Subject Updated successfully!");
  })
    .catch((error) => {
      console.error("Error updating subject:", error);
    });
}
//updateSubject("Computer", "-NtqYVvxB_PhQA3hmPdR")

//setSubject("Maths2");

function setTopic(topicName, description, date) {
  let currentUserName = sessionStorage.getItem("currentUserName");
  let currentSubject = sessionStorage.getItem("currentSubject");
  let topicCode = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/"+currentSubject + "/Topics").push().key;
  let topicRef = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/"+currentSubject + "/Topics/" + topicCode);
  let topicData = {
    title: topicName,
    description: description,
    date: "Added on " + date
  }
  topicRef.set(topicData).then(() => {
    console.log("Topic set successfully!");
  })
    .catch((error) => {
      console.error("Error setting topic:", error);
    });
}

//setTopic("T2", "D1", "Any");
function updateTopic(topicName, description, date, topicCode)
{
  let currentUserName = sessionStorage.getItem("currentUserName");
  let currentSubject = sessionStorage.getItem("currentSubject");
  let topicRef = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/"+currentSubject + "/Topics/" + topicCode);
  let topicData = {
    title: topicName,
    description: description,
    date: "Updated on " + date
  }
  topicRef.update(topicData).then(() => {
    console.log("Topic updated successfully!");
  })
    .catch((error) => {
      console.error("Error updating topic:", error);
    });
}

//updateTopic("T4", "D5", "Today", "-Ntq_n01_hA3XmdQ-Tm6")

function userSignUp(username, email, password) {
  getUserData(function (data) {
    for (uname in data) {
      if (uname == username) {
        alert("This Username already exists. Try with a different username");
        return;
      }
      if (data[uname].email == email) {
        alert("This Email is already registered");
        return;
      }
    }
    let encryptedPassword = encryptPassword(password);
    let userData = {
      password: encryptedPassword,
      email: email
    }

    notesDB.ref("ClipNotes").child(username).set(userData).then(() => {
      sessionStorage.setItem("currentUserName", username);
      window.location.href = "index.html";
    })
      .catch((error) => {
        console.log("An error has occurred", error);
      });
  })

}

function userSignIn(username, password) {
  getUserData(function (data) {
    for (uname in data) {
      if (uname == username) {
        userFound = true;
        let passwordFromUser = encryptPassword(password);
        let passwordFromDb = data[username].password;
        if (passwordFromUser == passwordFromDb) {
          sessionStorage.setItem("currentUserName", username);
          window.location.href = "index.html"
          return;
        }
        else {
          alert("Invalid Username or Password");
        }
      }
    }
    alert("This username does not exist");
    //console.log(userFound);
  })
}


// Function to encrypt the password
function encryptPassword(password) {
  let encryptedPassword = "";
  for (let i = 0; i < password.length; i++) {
    let ascii = password.charCodeAt(i);
    if (i % 2 == 0) {
      ascii++;
    }
    else {
      ascii--;
    }
    encryptedPassword += String.fromCharCode(ascii);
  }
  return encryptedPassword;
}

//Function to decrypt the password
/*
function decryptPassword(password) {
  let decryptedPassword = "";
  for (let i = 0; i < password.length; i++) {
    let ascii = password.charCodeAt(i);
    if (i % 2 == 0) {
      ascii--;
    }
    else {
      ascii++;
    }
    decryptedPassword += String.fromCharCode(ascii);
  }
  return decryptedPassword;
}
*/

function getUserData(callback) {
  let dataFetched = false;
  var timeout = setTimeout(function () {
    if (!dataFetched) {
      console.log("Data fetching took too long. Running another code.");

    }
  }, 10000);

  notesDB.ref("ClipNotes").once('value', function (data) {
    dataFetched = true;
    clearTimeout(timeout);
    let userDataObject = data.val();
    callback(userDataObject);
  });
}

function fetchSubjects(callback) {
  let subjectFetched = false;
  let timeout = setTimeout(function () {
    if (!subjectFetched) {
      console.log("Fetching Subjects is taking too long. Please check your internet connection and try again");

    }
  }, 10000);
  let currentUserName = sessionStorage.getItem("currentUserName");
  let userSubjectData = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects");

  userSubjectData.once('value')
    .then(function (data) {
      subjectFetched = true;
      clearTimeout(timeout);
      var subjectsObject = data.val();
      callback(subjectsObject);
    })
    .catch(function (error) {
      console.error("Error getting data:", error);
    });
}

function fetchTopics(callback)
{
  let topicFetched = false;
  let timeout = setTimeout(function () {
    if (!topicFetched) {
      console.log("Fetching Topics is taking too long. Please check your internet connection and try again");

    }
  }, 10000);
  let currentSubject = sessionStorage.getItem("currentSubject");
  let currentUserName = sessionStorage.getItem("currentUserName");
  let userTopicData = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/" + currentSubject + "/Topics");
  userTopicData.once('value')
    .then(function (data) {
      topicFetched = true;
      clearTimeout(timeout);
      var topicsObject = data.val();
      callback(topicsObject);
    })
    .catch(function (error) {
      console.error("Error getting data:", error);
    });
}

function removeSubject(subCode, callback)
{
  let currentUserName = sessionStorage.getItem("currentUserName");
  let subjectToRemove = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/" + subCode);
  subjectToRemove.remove()
  .then(function() {
    console.log("Subject deleted successfully");
    callback();
  })
  .catch(function(error) {
    console.error("Error deleting subject:", error);
  });
}

function removeTopic(topicCode, callback)
{
  let currentUserName = sessionStorage.getItem("currentUserName");
  let currentSubject = sessionStorage.getItem("currentSubject");
  console.log(currentSubject);
  let topicToRemove = notesDB.ref("ClipNotes/" + currentUserName + "/Subjects/" + currentSubject + "/Topics/" + topicCode);
  topicToRemove.push()
  topicToRemove.remove().then(function() {
    console.log("Topic deleted successfully");
    callback();
  })
  .catch(function(error) {
    console.error("Error deleting topic:", error);
  });
}