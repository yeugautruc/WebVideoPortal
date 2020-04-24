const searchInput = document.getElementById('search-input-id');
const listSearch = document.getElementById('search-list-id');
let searching = false;

function createList(objs) {
    for (const obj of objs) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        let inputFS = "itemSearchClick(\"" + obj.source + "\"," + obj.topic + ")";
        item.setAttribute('onclick', inputFS);
        const text = document.createTextNode(obj.name);
        item.appendChild(text);
        listSearch.appendChild(item);;
    }
    console.log("fuck");
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

function searchInJSon(url, value) {
    fetch(url).then(response => {
        return response.json();
    }).then(data => {
        createList(data.filter(a => {
            return a.name.toLowerCase().includes(value);
        }));
    }).catch(err => {});
}