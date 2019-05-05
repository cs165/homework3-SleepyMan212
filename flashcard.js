// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
    constructor(containerElement, frontText, backText,judge,nextCard) {
        this.containerElement = containerElement;
        this.judge = judge;
        this.nextCard = nextCard;
        this.frontText = frontText;
        this.backText = backText;


        this._flipCard = this._flipCard.bind(this);
        this._moveCard = this._moveCard.bind(this);
        this._recCardX = this._recCardX.bind(this);


        this.flashcardElement = this._createFlashcardDOM(frontText, backText);
        this.containerElement.append(this.flashcardElement);

        this.flashcardElement.addEventListener('pointerup', this._flipCard);
        this.flashcardElement.addEventListener('pointerdown',this._recCardX);
        this.flashcardElement.addEventListener('pointermove', this._moveCard);

        this.width = this.flashcardElement.offsetWidth;
        this.height = this.flashcardElement.offsetHeight;
    }

    // Creates the DOM object representing a flashcard with the given
    // |frontText| and |backText| strings to display on the front and
    // back of the card. Returns a reference to root of this DOM
    // snippet. Does not attach this to the page.
    //
    // More specifically, this creates the following HTML snippet in JS
    // as a DOM object:
    // <div class="flashcard-box show-word">
    //   <div class="flashcard word">frontText</div>
    //   <div class="flashcard definition">backText</div>
    // </div>
    // and returns a reference to the root of that snippet, i.e. the
    // <div class="flashcard-box">
    _createFlashcardDOM(frontText, backText) {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('flashcard-box');
        cardContainer.classList.add('show-word');

        const wordSide = document.createElement('div');
        wordSide.classList.add('flashcard');
        wordSide.classList.add('word');
        wordSide.textContent = frontText;

        const definitionSide = document.createElement('div');
        definitionSide.classList.add('flashcard');
        definitionSide.classList.add('definition');
        definitionSide.textContent = backText;

        cardContainer.appendChild(wordSide);
        cardContainer.appendChild(definitionSide);
        return cardContainer;
    }

    _flipCard(event) {
        console.log(event.clientX - this.originX);
        console.log((event.clientX - this.originX)<-150);
        if((event.clientX-this.originX) > 150){
            this.flashcardElement.parentNode.removeChild(this.flashcardElement);
            this.judge("correct",this.frontText,this.backText);
            this.nextCard();
        }else if((event.clientX-this.originX) < -150){
            this.flashcardElement.parentNode.removeChild(this.flashcardElement);
            this.judge("incorrect",this.frontText,this.backText);
            this.nextCard();
        }else if(Math.abs(event.clientX - this.originX) < 50 && Math.abs(event.clientY - this.originY) < 50){
            this.flashcardElement.classList.toggle('show-word');
        }else{
            this.flashcardElement.style.transform = `translateX(0px) translateY(0px) rotate(0deg)`;
            this.flashcardElement.style.transition = '.6s';
        }
        document.body.style.backgroundColor = "#d0e6df";
    }
    _recCardX(event){
        this.originX = event.clientX;
        this.originY = event.clientY;
    }
    _moveCard(event) {
        event.preventDefault();
        this.flashcardElement.style.transition = '';
        this.flashcardElement.style.transform = `translateX(${(event.clientX-this.originX)}px) translateY(${(event.clientY-this.originY)}px) rotate(${(event.clientX-this.originX)*0.2}deg)`;
        if(Math.abs(event.clientX-this.originX) > 150){
            document.body.style.backgroundColor = "#97b7b7";
        }else{
            document.body.style.backgroundColor = "#d0e6df";
        }
    }
}
