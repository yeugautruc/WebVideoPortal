/********************************************************
Home Page
 ********************************************************/
function hideHome(a) {
    document.getElementById('home-id').style.display = "none";
    document.getElementById('video-part').style.display = "block";
    enterPortal(a);
}

function showHome() {
    document.getElementById('home-id').style.display = "block";
    document.getElementById('video-part').style.display = "none";
    document.getElementById('menu-checkbox').checked = false;
    document.getElementById("slider").pause();
    document.getElementById("click-me").style.display = "block";
    document.getElementById('search-input-id').value = "";
    clearListSearch();
}

function hideClick() {
    if (!loggedIn) {
        document.getElementById('menu-checkbox').checked = false;
        alertHome("Please Login To Use !");
    } else {
        if (document.getElementById('menu-checkbox').checked) {
            document.getElementById("click-me").style.display = "none";
        } else {
            document.getElementById("click-me").style.display = "block";
        }
    }
}
window.addEventListener('click', function(e) {
    if (!document.getElementById('menu-checkbox').contains(e.target)) {
        document.getElementById('menu-checkbox').checked = false;
        document.getElementById("click-me").style.display = "block";
    }
});

function enterPortal(a) {

    switch (a) {
        case 1:
            readJson('json/music.json');
            break;
        case 2:
            readJson('json/sport.json');
            break;
        case 3:
            readJson('json/game.json');
            break;
        case 4:
            readJson('json/learn.json');
            break;
        case 5:
            readJson('json/funny.json');
            break;
        case 6:
            readJson('json/news.json');
            break;
        default:
    }
}

function alertHome(s) {
    let alerts = document.getElementById('alert-container');
    while (alerts.hasChildNodes()) {
        alerts.removeChild(alerts.firstChild);
    }
    let newAlert = document.createElement('div');
    let newSpan = document.createElement('span');
    newAlert.setAttribute('class', "alert show");
    newAlert.setAttribute('id', "alert-id");
    0966
    newSpan.setAttribute('class', "msg");
    newSpan.setAttribute('id', "msg-id");
    newAlert.appendChild(newSpan);
    alerts.appendChild(newAlert);
    document.getElementById('msg-id').innerHTML = s;
}
/********************************************************
LogIn
 ********************************************************/
let loggedIn = false;

function login() {
    let usr = document.getElementById('user-log-in').value;
    let pwd = document.getElementById('pwd-log-in').value

    if (usr == "" && pwd == "") {
        alertHome("Please enter Username and Password!");
    } else {
        if (usr == "") {
            alertHome("Please enter Username!");
        } else
        if (pwd == "") {
            alertHome("Please enter Password!");
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
                    document.getElementById('search-id').style.display = "block";
                    document.getElementById('cover-id').style.background = "url('images/cover2.jpg')";
                    document.getElementById('cover-id').style.backgroundSize = "cover";
                    document.getElementById('cover-id').style.animation = "none";
                } else {
                    alertHome("Incorrect Password or Username!");
                }
            }).catch(err => {});
        }
    }
}

function logout() {
    alertHome("Logged Out!");
    document.getElementById('login-form-id').reset();
    document.getElementById('login-form-id').style.display = "block";
    document.getElementById('logOut-btn-id').style.display = "none";
    document.getElementById('search-id').style.display = "none";
    loggedIn = false;
    document.getElementById('menu-checkbox').checked = false;
    document.getElementById('cover-id').style.background = "url('images/cover.jpg')";
    document.getElementById('cover-id').style.backgroundSize = "cover";
    document.getElementById('cover-id').style.animation = "coverAnimation 25s ease infinite";
}

function focusSignin(a) {
    a.elements[0].style.background = "white";
    a.elements[1].style.background = "white";
    a.elements[0].style.opacity = "0.8";
    a.elements[1].style.opacity = "0.8";
}

function focusSigninOut(a) {
    a.elements[0].style.background = "transparent";
    a.elements[1].style.background = "transparent";
}
/********************************************************
Search
 ********************************************************/
const searchInput = document.getElementById('search-input-id');
const listSearch = document.getElementById('search-list-id');
let searching = false;

function createList(objs) {

    for (const obj of objs) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        let inputFS = "itemSearchClick(\"" + obj.source + "\"," + obj.topic + ")";
        item.setAttribute('onclick', inputFS);
        let inputMouseOver = "createImgOnSearch(\"" + obj.thumbnail + "\");";
        item.setAttribute('onmouseover', inputMouseOver);
        item.setAttribute('onmouseout', 'removeImgOnSearch();');
        const text = document.createTextNode(obj.name);
        item.appendChild(text);
        listSearch.appendChild(item);
    }
    let checkNoResult = false;
    for (let i = 0; i < listSearch.children.length; i++) {
        if (listSearch.children[i].innerHTML === "No Result Found!") {
            checkNoResult = true;
        }
    }
    if (objs.length === 0 && !checkNoResult) {
        noResultFound();
        checkNoResult = false;
    }
    if (listSearch.children.length > 1) {
        for (let i = 0; i < listSearch.children.length; i++) {
            if (listSearch.children[i].innerHTML === "No Result Found!") {
                listSearch.removeChild(listSearch.children[i]);
            }
        }
    }
    if (listSearch.children.length > 4) {
        for (let i = 4; i < listSearch.children.length; i++) {
            listSearch.removeChild(listSearch.children[i]);
        }
    }
}

function clearListSearch() {
    while (listSearch.hasChildNodes()) {
        listSearch.removeChild(listSearch.firstChild);
    }
}

function noResultFound() {
    const item = document.createElement('li');
    item.classList.add('list-group-item');
    item.setAttribute('style', 'pointer-events: none;');
    const text = document.createTextNode("No Result Found!");
    item.appendChild(text);
    listSearch.appendChild(item);
}
searchInput.addEventListener('input', (event) => {

    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();

        searchInJSon("json/sport.json", value);
        searchInJSon("json/music.json", value);
        searchInJSon("json/funny.json", value);
        searchInJSon("json/game.json", value);
        searchInJSon("json/news.json", value);
        searchInJSon("json/learn.json", value);
        clearListSearch();
    } else {
        clearListSearch();
    }

});

function itemSearchClick(src, value) {
    searching = true;
    videoUrl(src);
    hideHome(value);
}

function createImgOnSearch(src) {
    const img = document.createElement('img');
    img.classList.add('preview-search');
    img.setAttribute('src', src);
    let div = document.getElementById('video-search-img-container');
    div.appendChild(img);
}

function removeImgOnSearch() {
    let item = document.getElementsByClassName('preview-search');
    let div = document.getElementById('video-search-img-container');
    while (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
}

function searchInJSon(url, value) {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        createList(data.filter(a => {
            return a.name.toLowerCase().includes(value);
        }));
    }).catch(err => {});
}

function focusOutSearch() {
    document.getElementById('search-list-id').style.visibility = "hidden";
}

function focusSearch() {
    document.getElementById('search-list-id').style.visibility = "visible";
}

/********************************************************
VideoPlay
 ********************************************************/
function videoUrl(take) {
    document.getElementById("slider").src = take;
    document.getElementById("slider").play();
}

function readJson(url) {
    return fetch(url).then(function(response) {
        return response.json();
    }).then(function(result) {
        createPlaylist(result);
        /*work with promise only in then, else will return undefined*/
    });
}

const list = document.getElementById('playlist-id');

function createPlaylist(input) {
    clearList();
    for (i in input) {
        createItem(input[i]);
    }

    function createItem(i) {
        const item = document.createElement('li');
        const img = document.createElement('img');
        const text = document.createTextNode(i.name);
        item.appendChild(text);
        item.classList.add('navigation-item');
        img.setAttribute('src', i.thumbnail);
        let onClickString = "videoUrl('" + i.source + "')"
        item.setAttribute('onclick', onClickString);
        item.appendChild(img);
        list.appendChild(item);
    }
    if (!searching) {
        document.getElementById('slider')
            .setAttribute('src', input[Math.floor(Math.random() * 3)].source);
    }
    document.getElementById("slider").play();
    searching = false;
}

function clearList() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}

function endedVideo() {
    let randomSrc = list.children[Math.floor(Math.random() * list.children.length)]
        .getAttribute('onclick');
    randomSrc = randomSrc.replace("videoUrl('", "");
    randomSrc = randomSrc.replace("')", "");
    videoUrl(randomSrc);
}
var timeout;
document.onmousemove = function() {
    document.getElementById('playlist-id').style.display = "flex";
    document.getElementById('menu-playlist-id').style.display = "inherit";
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        document.getElementById('playlist-id').style.display = "none";
        document.getElementById('menu-playlist-id').style.display = "none";
    }, 2000);
}
window.addEventListener('touchstart', function() {
    document.getElementById('playlist-id').style.display = "flex";
    document.getElementById('menu-playlist-id').style.display = "inherit";
    clearTimeout(timeout);
    timeout = setTimeout(function() {
        document.getElementById('playlist-id').style.display = "none";
        document.getElementById('menu-playlist-id').style.display = "none";
    }, 2000);
});
/********************************************************
ContactForm
 ********************************************************/
function showContactForm() {
    document.getElementById('undercover-form-id').style.display = 'block';
    document.getElementById('contact-form-id').style.display = 'block';
    document.getElementById('form-input-id').reset();
}
window.addEventListener('click', function(e) {
    if (document.getElementById('undercover-form-id').contains(e.target)) {
         document.getElementById('undercover-form-id').style.display = 'none';
    document.getElementById('contact-form-id').style.display = 'none';
    }
});

