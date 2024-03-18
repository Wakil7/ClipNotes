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


let currentUserName = null;


function setSubject(userName, subName) {
  let newSubRef = notesDB.child(userName).child(subName);
  newSubRef.update({ subjectId: subName }).then(() => {
    console.log("Subject set successfully!");
  })
    .catch((error) => {
      console.error("Error setting subject:", error);
    });
}



function setTopic(userName, subName, topicName, description) {
  let topicId = "topicId2";

  let topicRef = notesDB.child(userName).child(subName).child(topicId);
  let topicData = {
    topicName: topicName,
    description: description
  }
  topicRef.update(topicData).then(() => {
    console.log("Topic set successfully!");
  })
    .catch((error) => {
      console.error("Error setting topic:", error);
    });
}

function userSignUp(username, email, password) {
  let encryptedPassword = encryptPassword(password);
  let userData = {
    password: encryptedPassword,
    email: email
  }

  notesDB.child(username).set(userData).then(() => {
    currentUserName = username;
    window.location.href = "index.html";
  })
    .catch((error) => {
      console.log("An error has occurred", error);
    });
}

function userSignIn(username, password) {
  getUserData(function(data)
  {
    let userFound = false;
    for (uname in data)
    {
      if (uname==username)
      {
        userFound = true;
        let passwd = decryptPassword(data[username].password);
        if (password == passwd)
        {
          currentUserName = username;
          window.location.href = "index.html"
        }
        else
        {
          alert("Invalid Username or Password");
        }
      }
    }
    console.log(userFound);
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


function getUserData(callback)
{
  let dataFetched = false;
  var timeout = setTimeout(function() {
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

