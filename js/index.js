// Импорты
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {photoCardsElement, cardsTemplate, aboutButtonElement, addButtonElement, profileTitleElement,
    profileSubtitleElement, popupEditProfileElement, popupAddPlaceElement, closeButtonProfileElement,
    closeButtonPlaceElement,profileFormElement, cardFormElement, nameInput, jobInput, placeNameInput,
    placePhotoInput, cardSubmitButton} from "./elements.js";
import {initialCards,CONFIG_FORM_VALIDATION} from "./constants.js";

//Открытие попапов
function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Закрытие попапов
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

//Закрытие попапов по ESC
function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

// Закрытие попапов на оверлей
function initClosePopupsByOverlay(){
    const popupsElements = document.querySelectorAll('.popup');
    popupsElements.forEach((popup) => {
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains("popup") ){
                closePopup(popup);
            };
        });
    });
};
initClosePopupsByOverlay();

// Обработка Попапа-картинки
const handleOpenPopup = (name, link) => {
    const popupPhoto = document.querySelector('.popup__image');
    const popupTitle = document.querySelector('.popup__text');
    const popupImage = document.querySelector('.popup_type_image');
    popupPhoto.src = link;
    popupTitle.textContent = name;
    popupPhoto.alt = name;
    openPopup(popupImage);
    const closeButtonImageElement = document.querySelector('.popup__close-button_type_image');
    closeButtonImageElement.addEventListener('click', () => closePopup(popupImage));
}

// Сохранение данных в Profile
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitleElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(popupEditProfileElement);
};

//Заполнение инпутов Profile
function fillProfileInputs(){
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
};
fillProfileInputs();

// Создание карточки 
function createCard(name, link) {
    const card = new Card(cardsTemplate, name, link, handleOpenPopup);
    return card;
}

// Добавляем карточки при загрузке
initialCards.forEach(function(item) {
    photoCardsElement.append(createCard(item.name, item.link).generateCard());
});

//Сохранение новой карточки
function createCardSubmit (evt) {
    evt.preventDefault();
    photoCardsElement.prepend(createCard(placeNameInput.value, placePhotoInput.value).generateCard());
    cardFormElement.reset();
    validators[cardFormElement.getAttribute('name')].toggleButtonState();
    closePopup(popupAddPlaceElement);
};

//Обработчики
// открытия профайла и карточки
aboutButtonElement.addEventListener('click', () => {
    fillProfileInputs();
    openPopup(popupEditProfileElement);
});
addButtonElement.addEventListener('click', () => {
    cardFormElement.reset();
    openPopup(popupAddPlaceElement);
});
// закрытия профайла и карточки
closeButtonProfileElement.addEventListener('click', () =>  closePopup(popupEditProfileElement));
closeButtonPlaceElement.addEventListener('click', () => closePopup(popupAddPlaceElement));
// сохранения профайла и карточки
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', createCardSubmit);

//Валидация форм
const validators = {};
const formEnableValidation = (config) => {
    const formList =Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit',(evt) => {
            evt.preventDefault();
        });
        const formValidator = new FormValidator(form, config)
        formValidator.enableValidation();
        validators[form.getAttribute('name')] = formValidator;
    });
};
formEnableValidation(CONFIG_FORM_VALIDATION);