// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
    constructor(containerElement,resultsShow) {
        this.flashcardContainer = document.querySelector('#flashcard-container');
        this.containerElement = containerElement;
        this.resultsShow = resultsShow;

        this.correct = 0;
        this.incorrect = 0;
        this.originCorrect = 0;
        this.failQues = [];
        this.ques = [];
        this.words = null;
        this.words_key = null;

        this.correctElement = document.querySelector('.status .correct');
        this.incorrectElement = document.querySelector('.status .incorrect');

        this.correctElement.textContent = this.correct;
        this.incorrectElement.textContent = this.incorrect;

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.judge = this.judge.bind(this);
        this.nextCard = this.nextCard.bind(this);

    }

    show(words,menuShow) {
        if(this.correct === 5){
            this.failQues = this.words;
            this.correct = 0;
            this.incorrect = 0;
            this.originCorrect = 0;
        }else{
            this.incorrect = 0;
            this.originCorrect = this.correct;
        }

        this.containerElement.classList.remove('inactive');
        if(words!==null){
            this.menuShow = menuShow;
            this.words = words;
            this.failQues = this.words;
            this.correct = 0;
            this.incorrect = 0;
            this.originCorrect = 0;
        }
        this.words_key = Object.keys(this.failQues);
        this.ques = this.failQues;
        console.log(this.failQues);
        this.failQues = {};
        // this.words_value = Object.values(words);
        // console.log(this.words_key);
        // console.log(this.words_value);
        // console.log(this.right);
        // console.log(this.incorrect);
        const idx = this.correct + this.incorrect - this.originCorrect;
        const card = new Flashcard(this.flashcardContainer, this.words_key[idx], this.ques[this.words_key[idx]],this.judge,this.nextCard);
        
        this.correctElement.textContent = this.correct;
        this.incorrectElement.textContent = this.incorrect;

    }

    hide() {
        console.log("main hide");
        this.containerElement.classList.add('inactive');
        // this.containerElement.classList.add('inactive');
    }

    judge(status,frontText,backText){
        if(status == 'correct'){
            this.correct++;
            this.correctElement.textContent = this.correct;
        }else if(status == "incorrect"){
            this.incorrect++;
            this.incorrectElement.textContent = this.incorrect;
            this.failQues[frontText] = backText;
        }
    }
    nextCard(){
        // console.log("this wors = " + Object.keys(this.words).length);
        const idx = this.correct + this.incorrect - this.originCorrect;
        if(idx + this.originCorrect < Object.keys(this.words).length){
            new Flashcard(this.flashcardContainer,this.words_key[idx], this.ques[this.words_key[idx]],this.judge,this.nextCard);
        }else{
            console.log("finish");
            this.hide();
            console.log(this.resultsShow);
            this.resultsShow(this.correct,this.incorrect,this.menuShow,this.show);
        }
    }
}
