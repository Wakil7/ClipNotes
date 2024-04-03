let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click",()=>{
    let username = localStorage.getItem("ClipNotesUserName");
    if (username==null)
    {
        window.location.href = "SignUp.html";
    }
    else
    {
        sessionStorage.setItem("currentUserName", username);
        window.location.href = "subjects.html"
    }
})