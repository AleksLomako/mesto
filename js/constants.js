// Создаем переменные
const photoCardsElement = document.querySelector('.photo-cards');
const cardsTemplate = document.querySelector('.cards-template').content;

const aboutButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupEditProfileElement = document.querySelector('.popup_type_profile');
const popupAddPlaceElement = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image');

const closeButtonProfileElement = document.querySelector ('.popup__close-button_type_profile');
const closeButtonPlaceElement = document.querySelector('.popup__close-button_type_place');
const closeButtonImageElement = document.querySelector('.popup__close-button_type_image');


const profileFormElement = document.querySelector('.popup__form_type_profile');
const cardFormElement = document.querySelector('.popup__form_type_place');
let nameInput = profileFormElement.querySelector('input[name="name"]');
let jobInput = profileFormElement.querySelector('input[name="job"]');
let placeNameInput = cardFormElement.querySelector('input[name="place-name"]');
let placePhotoInput = cardFormElement.querySelector('input[name="place-link"]');