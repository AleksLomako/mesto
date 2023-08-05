import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//Открытие попапа
function openPopup(popup){
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
};

//Закрытие попапа
function closePopup(popup){
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

export {openPopup, closePopup}

//Закрытие попапа по ESC
function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

// Закрытие попапа на оверлей
function closePopupByOverlay(){
    const popupsElements = document.querySelectorAll('.popup');
    popupsElements.forEach((popup) => {
        popup.addEventListener('click', (e) => {
            if (e.target.classList.contains("popup") ){
                closePopup(popup);
            };
        });
    });
};
closePopupByOverlay();

// Сохранение данных в Profile
function handleProfileFormSubmit (evt) {
    evt.preventDefault();
    profileTitleElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(popupEditProfileElement);
};

//Заполнение инпутов Profile
function profileInputInsert(){
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
};
profileInputInsert();

//Обработчик открытия и закрытия попапов
aboutButtonElement.addEventListener('click', () => {
    profileInputInsert();
    openPopup(popupEditProfileElement);
});

// Добавляем карточки при загрузке
initialCards.forEach(function(item) {
    const card = new Card(cardsTemplate, item.name, item.link)
    photoCardsElement.append(card.generateCard())
});

//Сохранение новой карточки
function createCardSubmit (evt) {
    evt.preventDefault();
    const card = new Card(cardsTemplate, placeNameInput.value, placePhotoInput.value)
    photoCardsElement.prepend(card.generateCard());
    cardFormElement.reset();
    cardSubmitButton.classList.add(CONFIG_FORM_VALIDATION.inactiveButtonClass);
    cardSubmitButton.disabled = true;
    closePopup(popupAddPlaceElement);
};

//Обработчики
addButtonElement.addEventListener('click', () => {
    cardFormElement.reset();
    openPopup(popupAddPlaceElement);
});
closeButtonProfileElement.addEventListener('click', () =>  closePopup(popupEditProfileElement));
closeButtonPlaceElement.addEventListener('click', () => closePopup(popupAddPlaceElement));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', createCardSubmit);

//Форма
const formEnableValidation = (config) => {
    const formList =Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((form) => {
        form.addEventListener('submit',(evt) => {
            evt.preventDefault();
        });
        const formValidator = new FormValidator(form, config)
        formValidator.enableValidation();
    });
};

formEnableValidation(CONFIG_FORM_VALIDATION);