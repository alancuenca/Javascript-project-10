const btn1 = document.querySelector('.btn');
const h1 = document.querySelector('h1');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
const baseURL = 'https://api.stackexchange.com/'

window.addEventListener('DOMContentLoaded', (e) => {
    pageLoad()
});

btn1.addEventListener('click', (e) => {
    console.log('ready');
});

function pageLoad() {
    const url = baseURL + '2.2/questions?order=desc&sort=activity&site=stackoverflow'
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            outputItems(data.items)
            })
        .catch((err) => {
            console.log(err);
        })
};

/**
 * Fetch all the data.items from the api
 * use outputPage to display them
 */
function outputItems(data) {
    output.innerHTML = '';
    data.forEach(item => {
        outputPage(item);
    })
};

/**
 * display forEach item's title on the page.
 * make a div with every items title.
 * two makeNode makes a nested div
 */
function outputPage(data) {
    console.log(data);
    const titleDisplay = makeNode(output, 'div', '');
    const elemDisplay = makeNode(titleDisplay, 'div', data.title);
    data.tags.forEach((tag) => {
        const tags = makeNode(titleDisplay, 'span', tag);
        tags.classList.add('tag')
    })
};

/**
 * make the node object to display on the page
 * @param {*} parent 
 * @param {*} typeElement 
 * @param {*} html 
 */
function makeNode(parent, typeElement, html) {
    const element = document.createElement(typeElement);
    element.innerHTML = html;
    return parent.appendChild(element);
};