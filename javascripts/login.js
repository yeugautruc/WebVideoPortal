let loggedIn = false;

function login() {
    let usr = document.getElementById('user-log-in').value;
    let pwd = document.getElementById('pwd-log-in').value
    if (usr == "") {
        alertHome("Please enter Username!");
    } else
    if (pwd == "") {
        alertHome("Please enter Password!");
    } else
    if (usr == "" && pwd == "") {
        alertHome("Please enter Username and Password!");
    } else {
        fetch('json/userData.json').then(response => {
            return response.json();
        }).then(data => {
            for (i in data) {
                if (data[i].username == usr && data[i].password == pwd) {
                    loggedIn = true;
                }
            }
            if (loggedIn == true) {
                alertHome("You Are Logged In!");
                document.getElementById('login-form-id').style.display = "none";
                document.getElementById('logOut-btn-id').style.display = "block";
            } else {
                alertHome("Incorrect Password or Username!");
            }
        }).catch(err => {});
    }
}

function logout() {
    alertHome("Logged Out!");
    document.getElementById('login-form-id').reset();
    document.getElementById('login-form-id').style.display = "block";
    document.getElementById('logOut-btn-id').style.display = "none";
    loggedIn = false;
}