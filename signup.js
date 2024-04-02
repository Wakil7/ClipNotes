const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username.trim()=="" || email.trim()=="" || password.trim()=="" || confirmPassword.trim()=="")
    {
        errorNotification("All the fields are mandatory");
    }
    else if (username.includes(" "))
    {
        errorNotification("Username cannot contain space");
    }
    else if (username.length<3)
    {
        errorNotification("Username must be atleast 3 characters long");
    }
    else if (!emailRegex.test(email)) 
    {
        errorNotification("Please enter a valid email address");
    }
    else if (password!=confirmPassword)
    {
        errorNotification("Password does not match");
    }
    else if (password.includes(" "))
    {
        errorNotification("Password cannot contain space");
    }
    else if (password.length<8 || password.length>24)
    {
        errorNotification("Password length must be between 8 and 24 characters")
    }
    else
    {
        userSignUp(username, email, password);
    }
});

