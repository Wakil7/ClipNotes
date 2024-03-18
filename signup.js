const signupBtn = document.getElementById("signup-btn");
signupBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    // Username check
    if (username.length<3)
    {
        console.log("Username must be atleast 3 characters long");
    }
    // Email check

    // Password Criteria Check
    else if (password!=confirmPassword)
    {
        console.log("Password does not match");
    }
    else if (password.includes(" "))
    {
        console.log("Password cannot contain space");
    }
    else if (password.length<8 || password.length>24)
    {
        console.log("Password length must be between 8 and 24 characters")
    }
    else
    {
        userSignUp(username, email, password);
    }
});

