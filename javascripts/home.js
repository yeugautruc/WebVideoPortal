function hideHome(a) {
    document.getElementById('home-id').style.display = "none";
    document.getElementById('video-part').style.display = "block";
    enterPortal(a);
}

function showHome() {
    document.getElementById('home-id').style.display = "block";
    document.getElementById('video-part').style.display = "none";
    document.getElementById('menu-checkbox').checked = false;;
    document.getElementById("slider").pause();
}

function hideClick() {
    if (document.getElementById('menu-checkbox').checked) {
        document.getElementById("click-me").style.display = "none";
    } else {
        document.getElementById("click-me").style.display = "block";
    }
}

function enterPortal(a) {

    switch (a) {
        case 1:
            readJson('json/music.json');
            break;
        case 2:
            readJson('json/music.json');
            break;
        case 3:
            readJson('json/music.json');
            break;
        case 4:
            readJson('json/music.json');
            break;
        case 5:
            readJson('json/music.json');
            break;
        case 6:
            readJson('json/music.json');
            break;
        default:
            // code block
    }
}