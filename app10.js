const btn1 = document.querySelector('.btn');
const h1 = document.querySelector('h1');
const output = document.querySelector('.output');
const inputVal = document.querySelector('.val');
const baseURL = 'https://api.stackexchange.com/'

window.addEventListener('DOMContentLoaded', (e) => {
    pageLoad()
    e.preventDefault();
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
    titleDisplay.answerCount = data.answer_count
    elemDisplay.addEventListener('click', getByID) // use getByID function
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
    if (element.answerCount > 0) {
    const questionURL = baseURL + '2.3/questions/'+element.questionID+'?order=desc&sort=activity&site=stackoverflow';
    const answerURL = baseURL + '2.3/questions/'+element.questionID+'/answers?order=desc&sort=activity&site=stackoverflow';
    let questionData = {};
    fetch(questionURL)
    .then(res => res.json())
    .then((data) => {
        questionData = data
        return fetch(answerURL)
    })
        .then(res => res.json())
        .then((answers) => {
            //console.log(questionData);
            console.log(answers);
            buildPageData(questionData.items[0],answers.items)
        })
    .catch((err) => {
        console.log(err);
    })
    } else {
        e.preventDefault()
}
};

/**
 * 
 * @param {*} question 
 * @param {*} answers 
 * 
 * build a display of question with the answers
 */
function buildPageData(question, answers) {
    console.log(question);
    console.log(answers);
    output.innerHTML = '';

    const questionTitle = makeNode(output, 'div', `<h2>${question.title}</h2>`);
    //elemDisplay.classList.add('box');
    const questionID = makeNode(output, 'div', `<div>Question ID : ${question.question_id}</div>`);
    //elemDisplay.classList.add('box');
    const totalAnswers = makeNode(output, 'div', `<div>Answers : ${question.answer_count}</div>`);
    //elemDisplay.classList.add('box');
    //elemDisplay.classList.add('box');
    const questionLink = makeNode(output, 'a', `${question.link}`);
    questionLink.setAttribute('href', question.link);
    questionLink.setAttribute('target', '_blank');
    //elemDisplay.classList.add('box');
    const answerDiv = makeNode(output, 'div', '');
    answerDiv.classList.add('info');
    answers.forEach((answer, index) => {
       // outputPage(answer);
        console.log(answer);
        const rating = answer.owner.accept_rate || '0';
        const html = `
        <hr>
        Answer #${index + 1}<br>
        Owner : ${answer.owner.display_name} (Reputation: ${answer.owner.reputation}, Accept Rate: ${rating})
        `;
        const answerHTML = makeNode(answerDiv, 'div', html)
    })
};