// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
    constructor(containerElement, choicesElemnt,flashcardShow) {
        this.containerElement = containerElement;
        this.choicesElement = choicesElemnt;
        this.flashcardShow = flashcardShow;
        this.showDeck(this.flashcardShow);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.showDeck = this.showDeck.bind(this);

    }

    show() {
        this.containerElement.classList.remove('inactive');
        // this.showDeck(this.flashcardShow);
    }

    hide() {
        this.containerElement.classList.add('inactive');
    }
    showDeck(flashcardShow) {
        FLASHCARD_DECKS.forEach((FLASHCARD_DECK)=>{
            const div = document.createElement("h2");
            div.classList.add('choices');
            const title = document.createTextNode(FLASHCARD_DECK.title);
            div.appendChild(title);
            this.choicesElement.appendChild(div);
            div.addEventListener('click',(e)=>{
                console.log(FLASHCARD_DECK.words);
                this.hide();
                flashcardShow(FLASHCARD_DECK.words,this.show);
            });
        })
    }
}
