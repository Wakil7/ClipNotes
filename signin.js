const signinBtn = document.getElementById("signin-btn");
signinBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username.trim()=="" || password.trim()=="")
    {
        errorNotification("All the fields are mandatory");
    }
    else
    {
        userSignIn(username, password);
    }
    
});
