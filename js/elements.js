const photoCardsElement = document.querySelector('.photo-cards');
const cardsTemplate = document.querySelector('.cards-template').content;

const aboutButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupEditProfileElement = document.querySelector('.popup_type_profile');
const popupAddPlaceElement = document.querySelector('.popup_type_place');

const closeButtonProfileElement = document.querySelector ('.popup__close-button_type_profile');
const closeButtonPlaceElement = document.querySelector('.popup__close-button_type_place');

const profileFormElement = document.querySelector('.popup__form_type_profile');
const cardFormElement = document.querySelector('.popup__form_type_place');
const nameInput = profileFormElement.querySelector('input[name="name"]');
const jobInput = profileFormElement.querySelector('input[name="job"]');
const placeNameInput = cardFormElement.querySelector('input[name="place-name"]');
const placePhotoInput = cardFormElement.querySelector('input[name="place-link"]');

const cardSubmitButton = document.querySelector('.popup__save-button_type_place');

export {photoCardsElement, cardsTemplate, aboutButtonElement, addButtonElement, profileTitleElement,
    profileSubtitleElement, popupEditProfileElement, popupAddPlaceElement, closeButtonProfileElement,
    closeButtonPlaceElement, profileFormElement, cardFormElement, nameInput, jobInput, placeNameInput,
    placePhotoInput, cardSubmitButton};