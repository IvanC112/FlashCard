const createFC = document.querySelector('#createFC');
const removeAll = document.querySelector('#removeAll');
const cardContainer = document.querySelector('.card-container');
const closeButton = document.querySelector('#closeButton');
const saveButton = document.querySelector('#saveButton');
const saveEdit = document.querySelector('#saveEdit');
const flashContainer = document.querySelector('.flashcards');
const questionText = document.querySelector('#questionText');   //questionText is a reference to the textarea for the user's question
const answerText = document.querySelector('#answerText');       //answerText is a reference to the textarea for the user's answer
let flashcardObjects = [];  //array of objects, each with a question and answer where whenever the user presses save we append the value of questionText and answerText to the array
let userQuestion;
let userAnswer;
let flashcardIndex = 0;

createFC.addEventListener('click', () => {
    cardContainer.style.display = 'block';
});

removeAll.addEventListener('click', ()=> {
    flashContainer.textContent = '';
    flashcardObjects.splice(0, flashcardIndex);
    flashcardIndex = 0;
})

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

    if (flashcardIndex === 11) {
        createFC.disabled = true;
    }

    const individualCard = document.createElement('div');
    const questionContainer = document.createElement('div');
    const answerContainer = document.createElement('div');
    const flipbuttonContainer = document.createElement('div');
    const optionsContainer = document.createElement('div');
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');
    const showButton = document.createElement('button');
    let showAnswer = false;

    flashcardObjects.push({ question: userQuestion, answer: userAnswer});
    questionText.value = '';
    answerText.value = '';
    userQuestion = '';
    userAnswer = '';
    cardContainer.style.display = 'none';

    individualCard.classList.add('front');
    questionContainer.classList.add('displayQuestion');
    answerContainer.classList.add('showingAnswer');
    showButton.classList.add('showButton');
    optionsContainer.classList.add('editORdelete');

    questionContainer.textContent = flashcardObjects[flashcardIndex++].question;
    flipbuttonContainer.style.cssText = 'margin:0 auto; position:absolute; top:50%; left:50%; transform:translate(-50%, -50%)';
    showButton.textContent = 'Show/Hide';
    editButton.textContent = 'Edit';
    removeButton.textContent = 'Remove';

    optionsContainer.append(editButton);
    optionsContainer.append(removeButton);
    flipbuttonContainer.append(showButton);
    individualCard.append(questionContainer);
    individualCard.append(flipbuttonContainer);
    individualCard.append(optionsContainer);
    flashContainer.append(individualCard);

    showButton.addEventListener('click', () => {
        showAnswer = !showAnswer;

        if (showAnswer === true) {
            const correspondingQuestion = questionContainer.textContent;
            flashcardObjects.forEach(item => {
                if (item.question == correspondingQuestion) {
                    answerContainer.textContent = item.answer;
                }
            });

            individualCard.append(answerContainer);        
        }
         else {
            answerContainer.textContent = '';
        }
    });

    removeButton.addEventListener('click', ()=>{
        const correspondingQuestion = questionContainer.textContent;
        const cardsInDOM = document.querySelectorAll('.front');

        flashcardObjects = flashcardObjects.filter(flashCard => flashCard.question !== correspondingQuestion);
        flashcardIndex--;

        cardsInDOM.forEach(card => {
            if (card.firstChild.textContent === correspondingQuestion) {
                card.remove();
            }
        })

    });

});