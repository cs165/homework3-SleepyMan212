// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
    constructor(containerElement) {
        this.containerElement = containerElement;

        this.percentElement = document.querySelector('#results .percent');
        this.correctElement = document.querySelector('#results .correct');
        this.incorrectElement = document.querySelector('#results .incorrect');
        this.continueElement = document.querySelector('.menu-buttons .continue');
        this.gobackElement = document.querySelector('.menu-buttons .to-menu');

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.gobackElement.addEventListener('click',()=>{
            this.hide();
            this.menuShow();
        });
        this.continueElement.addEventListener('click',()=>{
            this.hide();
            this.cardShow(null,this.menuShow)
        });
    }

    show(numberCorrect, numberWrong,menuShow,cardShow) {
        this.menuShow = menuShow;
        this.cardShow = cardShow;
        this.containerElement.classList.remove('inactive');
        this.percentElement.textContent = numberCorrect/(numberCorrect+numberWrong)*100;
        this.correctElement.textContent = numberCorrect;
        this.incorrectElement.textContent = numberWrong;
        if(numberCorrect === (numberWrong+numberCorrect)){
            this.continueElement.textContent = "Start over?";
        }else{
            this.continueElement.textContent = "Continue";
        }
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
}
