let startBtn = document.getElementById("start-button");
startBtn.addEventListener("click",()=>{
    let username = localStorage.getItem("currentUserName");
    if (username==null)
    {
        window.location.href = "SignUp.html";
    }
    else
    {
        localStorage.setItem("currentUserName", username);
        window.location.href = "subjects.html"
    }
})