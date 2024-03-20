const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;


    if (username.length<3)
    {
        alert("Username must be atleast 3 characters long");
    }
    else if (password!=confirmPassword)
    {
        alert("Password does not match");
    }
    else if (password.includes(" "))
    {
        alert("Password cannot contain space");
    }
    else if (password.length<8 || password.length>24)
    {
        alert("Password length must be between 8 and 24 characters")
    }
    else
    {
        userSignUp(username, email, password);
    }
});

