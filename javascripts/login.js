let loggedIn = false;

function login() {
    let usr = document.getElementById('user-log-in').value;
    let pwd = document.getElementById('pwd-log-in').value

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
        }
    }).catch(err => {});
}

function logout() {
    document.getElementById('login-form-id').style.display = "block";
    document.getElementById('logOut-btn-id').style.display = "none";
    loggedIn = false;
}