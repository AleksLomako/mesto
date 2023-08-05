import { openPopup, closePopup } from "./index.js";

class Card {
    constructor(template, name, link) {
        this._newCard = template.querySelector('.card').cloneNode(true);
        this._name = name;
        this._link = link;
    }
    generateCard() {
        this._setData();
        this._setListeners();
        return this._newCard;
    }
    _setData() {
        const cardTitle = this._newCard.querySelector('.card__title');
        cardTitle.textContent = this._name;
        const cardImage = this._newCard.querySelector('.card__image');
        cardImage.src = this._link;
        cardImage.alt = this._name;
    }
    _handleClickLike() {
        this._newCard.querySelector('.card__like').classList.toggle('card__like_active');
    }

    _handleClickDelete() {
        this._newCard.closest('.card').remove();
    }

    _openPopupImage(){
        const popupPhoto = document.querySelector('.popup__image');
        const popupTitle = document.querySelector('.popup__text');
        popupPhoto.src = this._link;
        popupTitle.textContent = this._name;
        openPopup(popupImage);
    }

    _setListeners() {
        const cardImage = this._newCard.querySelector('.card__image');
        cardImage.addEventListener('click', () => this._openPopupImage());

        const closeButtonImageElement = document.querySelector('.popup__close-button_type_image');
        closeButtonImageElement.addEventListener('click', () => closePopup(popupImage));

        const cardLikeButton = this._newCard.querySelector('.card__like');
        cardLikeButton.addEventListener('click', () => this._handleClickLike());
        
        const deleteCardButton = this._newCard.querySelector('.card__delete');
        deleteCardButton.addEventListener('click', () => this._handleClickDelete());
    };

}
export default Card;