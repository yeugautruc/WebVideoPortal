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
        console.log(item);
        item.appendChild(text);
        item.classList.add('navigation-item');
        img.setAttribute('src', i.thumbnail);
        let onClickString = "videoUrl('" + i.source + "')"
        item.setAttribute('onclick', onClickString);
        item.appendChild(img);
        list.appendChild(item);
    }
if (!searching){
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
function endedVideo(){
    let randomSrc = list.children[Math.floor(Math.random() * list.children.length)]
    .getAttribute('onclick');
    randomSrc =  randomSrc.replace("videoUrl('","");
    randomSrc =  randomSrc.replace("')","");
    videoUrl(randomSrc);
}


