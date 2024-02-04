const createFC = document.querySelector('#createFC');
const removeAll = document.querySelector('#removeAll');
const cardContainer = document.querySelector('.card-container');
const closeButton = document.querySelector('#closeButton');
const saveButton = document.querySelector('#saveButton');
const saveEdit = document.querySelector('#saveEdit');
const flashContainer = document.querySelector('.flashcards');
const questionText = document.querySelector('#questionText');
const answerText = document.querySelector('#answerText');
let correspondingQuestion;
let flashcardObjects = [];
let userQuestion;
let userAnswer;
let flashcardIndex = 0;
let isEditMode = false;
const answerContainer = document.createElement('div');


createFC.addEventListener('click', () => {
    cardContainer.style.zIndex = '1000';
    cardContainer.style.display = 'block';
    questionText.value = '';
    answerText.value = '';
});

removeAll.addEventListener('click', () => {
    flashContainer.textContent = '';
    flashcardObjects.splice(0, flashcardIndex);
    flashcardIndex = 0;
});

closeButton.addEventListener('click', () => {
    cardContainer.style.display = 'none';
    if (!isEditMode) {
        questionText.value ='';
        answerText.value = '';
    }
});

questionText.addEventListener('input', () => {
    userQuestion = questionText.value;
});

answerText.addEventListener('input', () => {
    userAnswer = answerText.value;
});

saveButton.addEventListener('click', () => {
    if (flashcardIndex === 11) {
        createFC.disabled = true;
    }

    const individualCard = document.createElement('div');
    const questionContainer = document.createElement('div');
    const flipbuttonContainer = document.createElement('div');
    const optionsContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    const editButton = document.createElement('button');
    const showButton = document.createElement('button');
    let showAnswer = false;

    flashcardObjects.push({ question: userQuestion, answer: userAnswer });
    questionText.value = '';
    answerText.value = '';
    cardContainer.style.display = 'none';

    individualCard.classList.add('front');
    questionContainer.classList.add('displayQuestion');
    showButton.classList.add('showButton');
    answerContainer.classList.add('showingAnswer');
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
    individualCard.append(answerContainer);
    individualCard.append(optionsContainer);
    flashContainer.append(individualCard);

    showButton.addEventListener('click', () => {
        showAnswer = !showAnswer;

        if (showAnswer) {
            correspondingQuestion = questionContainer.textContent;

            answerContainer.style.display ='block';

            flashcardObjects.forEach(item => {
                if (item.question == correspondingQuestion) {
                    answerContainer.textContent = item.answer;
                }
            });
        } else {
            answerContainer.removeAttribute('style');
        }
        correspondingQuestion = '';
    });

    removeButton.addEventListener('click', () => {
        correspondingQuestion = questionContainer.textContent;
        const cardsInDOM = document.querySelectorAll('.front');

        flashcardObjects = flashcardObjects.filter(flashCard => flashCard.question !== correspondingQuestion);
        flashcardIndex--;

        cardsInDOM.forEach(card => {
            if (card.firstChild.textContent === correspondingQuestion) {
                card.remove();
            }
        });
        correspondingQuestion = '';
    });

    editButton.addEventListener('click', () => {
        isEditMode = true;
        correspondingQuestion = questionContainer.textContent;
        let correspondingAnswer;
    
        flashcardObjects.forEach(flashCard => {
            if (flashCard.question === correspondingQuestion) {
                correspondingAnswer = flashCard.answer;
            }
        });
    
        cardContainer.style.display = 'block';
        saveButton.style.display = 'none';
        saveEdit.style.display = 'block';
        questionText.value = correspondingQuestion;
        answerText.value = correspondingAnswer;

    });

});

saveEdit.addEventListener('click', ()=>{
    const editedFlashCard = document.querySelectorAll('.front');
    const editObject = flashcardObjects.find(flashcard => flashcard.question === correspondingQuestion);
   
    editObject.question = userQuestion;
    editObject.answer = userAnswer;

    editedFlashCard.forEach(flashcard => {
        if (flashcard.querySelector('.displayQuestion').textContent === correspondingQuestion) {
            flashcard.querySelector('.displayQuestion').textContent = editObject.question;
            flashcard.querySelector('.showingAnswer').textContent = editObject.answer;
        }
    });
   
    cardContainer.style.display = 'none';
    saveEdit.style.display = 'none';
    saveButton.style.display = 'block';
});


