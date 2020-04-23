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
        item.classList.add('navigation-item');
        img.setAttribute('src', i.thumbnail);
        let onClickString = "videoUrl('" + i.source + "')"
        item.setAttribute('onclick', onClickString);
        item.appendChild(img);
        list.appendChild(item);
    }

    document.getElementById('slider')
        .setAttribute('src', input[Math.floor(Math.random() * 3)].source);
    document.getElementById("slider").play();
}

function clearList() {
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}


