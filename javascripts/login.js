let loggedIn = false;




function login() {
    let usr = document.getElementById('user-log-in').value;
    let pwd = document.getElementById('pwd-log-in').value
    console.log(document.getElementById('user-log-in').value);
    console.log(document.getElementById('pwd-log-in').value);

    fetch('json/userData.json').then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        for (i in data) {
        	console.log(data[i].username);
        	console.log(data[i].password);
            if (data[i].username == usr && data[i].password == pwd) {
                loggedIn = true;
            }
        }
    }).catch(err => {
    });
}