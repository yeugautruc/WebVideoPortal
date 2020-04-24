const target = [{
    "name": "Can't Take My Eye Off You",
    "source": "videos/CTOMEOY.mp4",
    "thumbnail": "images/thumbnail/thumbnail-CTOMEDY.PNG"
}, {
    "name": "Can We Kiss Forever",
    "source": "videos/CWKF.mp4",
    "thumbnail": "images/thumbnail/thumbnail-CWKF.PNG"
}, {
    "name": "Love Me 3000",
    "source": "videos/LM3000.mp4",
    "thumbnail": "images/thumbnail/thumbnail-LM3000.PNG"
}, {
    "name": "Wonderful World",
    "source": "videos/WAWW.mp4",
    "thumbnail": "images/thumbnail/thumbnail-WWAW.PNG"
}];
const searchInput = document.getElementById('search-input-id');
const listSearch = document.getElementById('search-list-id');
let searching = false;

function createList(objs) {
    clearListSearch();
    for (const obj of objs) {
        const item = document.createElement('li');
        item.classList.add('list-group-item');
        let inputFS = "itemSearchClick(\"" + obj.source + "\")";
        item.setAttribute('onclick', inputFS);
        const text = document.createTextNode(obj.name);
        item.appendChild(text);
        listSearch.appendChild(item);;
    }
    if (objs.length === 0) {
        noResultFound();
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
    const text = document.createTextNode("No Result Found!");
    item.appendChild(text);
    listSearch.appendChild(item);
}
searchInput.addEventListener('input', (event) => {
    let value = event.target.value;
    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase();

        createList(target.filter(a => {
            return a.name.toLowerCase().includes(value);
        }));
    } else {
        clearList();
    }

});

function itemSearchClick(src) {
    searching = true;
    videoUrl(src);
    console.log(document.getElementById('slider'));
    hideHome(1);
}