class Card {
    constructor(templateSelector, name, link, handleOpenPopup) {
        this._templateSelector = templateSelector;
        this._name = name;
        this._link = link;
        this._newCard = this._getTemplate();
        this._cardImage = this._newCard.querySelector('.card__image');
        this._cardLike = this._newCard.querySelector('.card__like');
        this._handleOpenPopup = handleOpenPopup;
}

    _getTemplate() {
        const cardTemplate = document
        .querySelector('.cards-template')
        .content
        .querySelector('.card')
        .cloneNode(true);

        return cardTemplate;
    }
    generateCard() {
        this._setData();
        this._setListeners();
        return this._newCard;
    }

    _setData() {
        const cardTitle = this._newCard.querySelector('.card__title');
        cardTitle.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
    }
    _handleClickLike() {
        this._cardLike.classList.toggle('card__like_active');
    }

    _handleClickDelete() {
        this._newCard.closest('.card').remove();
    }

    _setListeners() {
        this._cardImage.addEventListener('click', () => {
            this._handleOpenPopup(this._name, this._link)
        });    
        this._cardLike.addEventListener('click', () => this._handleClickLike());
        
        const deleteCardButton = this._newCard.querySelector('.card__delete');
        deleteCardButton.addEventListener('click', () => this._handleClickDelete());
    };

}
export default Card;