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
 * makeNode makes a nested div
 * create span with each elem tag
 */
function outputPage(data) {
    //console.log(data);
    const elemDisplay = makeNode(output, 'div', '');
    elemDisplay.classList.add('box')
    const titleDisplay = makeNode(elemDisplay, 'div', data.title);
    titleDisplay.classList.add('topTitle');
    const answerCount = makeNode(elemDisplay, 'div', `Answers ${data.answer_count}`);
    answerCount.classList.add('answers')
    titleDisplay.questionID = data.question_id
    titleDisplay.addEventListener('click', getByID) // use getByID function
    data.tags.forEach((tag) => {
        const tags = makeNode(elemDisplay, 'span', tag);
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

/**
 * pass in the event object id from titleDisplay
 */
function getByID(e) {
    // /2.3/questions/25190374?order=desc&sort=activity&site=stackoverflow
    const element = e.target; 
    console.log(element.questionID);// returns the question id from the object clicked
};