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

let notesDB = firebase.database().ref("ClipNotes");


//let currentUserName = null;




function setSubject(subName) {
  //let newSubRef = notesDB.child(userName).child(subName);
  let currentUserName = sessionStorage.getItem("currentUserName");
  let newSubRef = notesDB.child(currentUserName).child("Subjects").child(subName);
  newSubRef.update({ subjectId: subName }).then(() => {
    console.log("Subject set successfully!");
  })
    .catch((error) => {
      console.error("Error setting subject:", error);
    });
}
//currentUserName = "Wakil";
//setSubject("Maths");

function setTopic(topicName, description, date) {
  let currentUserName = sessionStorage.getItem("currentUserName");
  let currentSubject = sessionStorage.getItem("currentSubject");
  let topicRef = notesDB.child(currentUserName).child("Subjects").child(currentSubject).child("Topics").child(topicName);
  let topicData = {
    description: description,
    date: date
  }
  topicRef.update(topicData).then(() => {
    console.log("Topic set successfully!");
  })
    .catch((error) => {
      console.error("Error setting topic:", error);
    });
}


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

    notesDB.child(username).set(userData).then(() => {
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
//userSignIn("Wakil", "gas");
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

  notesDB.once('value', function (data) {
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
  let userSubjectData = firebase.database().ref("ClipNotes/" + currentUserName + "/Subjects");

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
  let userTopicData = firebase.database().ref("ClipNotes/" + currentUserName + "/Subjects/" + currentSubject + "/Topics");
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

function removeSubject(subjectName, callback)
{
  let currentUserName = sessionStorage.getItem("currentUserName");
  let subjectToRemove = firebase.database().ref("ClipNotes/" + currentUserName + "/Subjects/" + subjectName);
  subjectToRemove.remove()
  .then(function() {
    console.log("Subject deleted successfully");
    callback();
  })
  .catch(function(error) {
    console.error("Error deleting subject:", error);
  });
}

function removeTopic(topicName, callback)
{
  let currentUserName = sessionStorage.getItem("currentUserName");
  let currentSubject = sessionStorage.getItem("currentSubject");
  let topicToRemove = firebase.database().ref("ClipNotes/" + currentUserName + "/Subjects/" + currentSubject + "/Topics/" + topicName);
  topicToRemove.remove().then(function() {
    console.log("Topic deleted successfully");
    callback();
  })
  .catch(function(error) {
    console.error("Error deleting topic:", error);
  });
}