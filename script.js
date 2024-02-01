const createFC = document.querySelector('#createFC');
const cardContainer = document.querySelector('.card-container');
const closeButton = document.querySelector('#closeButton');
const saveButton = document.querySelector('#saveButton');
const flashContainer = document.querySelector('.flashcards');
const questionText = document.querySelector('#questionText');   //questionText is a reference to the textarea for the user's question
const answerText = document.querySelector('#answerText');       //answerText is a reference to the textarea for the user's answer
const flashcardObjects = [];  //array of objects, each with a question and answer where whenever the user presses save we append the value of questionText and answerText to the array
let userQuestion;
let userAnswer;
let flashcardIndex = 0;


createFC.addEventListener('click', () => {
    cardContainer.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    cardContainer.style.display = 'none';
});

questionText.addEventListener('input', ()=>{
    userQuestion = questionText.value;
})

answerText.addEventListener('input', ()=>{
    userAnswer = answerText.value;
})

saveButton.addEventListener('click', () => {

});