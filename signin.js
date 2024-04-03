const signinBtn = document.getElementById("signin-btn");
signinBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let remember = document.getElementById("remember");
    if (username.trim()=="" || password.trim()=="")
    {
        errorNotification("All the fields are mandatory");
    }
    else
    {
        if (remember.checked)
        {
            localStorage.setItem("ClipNotesUserName", username);
        }
        userSignIn(username, password);
    }
    
});
