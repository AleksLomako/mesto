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

//Закрытие попапа по ESC
function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    };
};

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

//Создание карточки
function createCard(name, link) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    //Лайк карточки
    const cardLikeElement = cardElement.querySelector('.card__like');
    cardLikeElement.addEventListener('click', () => {
    cardLikeElement.classList.toggle('card__like_active');
    });
    //Удаление карточки
    const deleteCardButton = cardElement.querySelector('.card__delete');
        deleteCardButton.addEventListener('click', () => {
            const cardItem = deleteCardButton.closest('.card');
            cardItem.remove();
        });
    // Попап карточки
    cardImage.addEventListener('click', () => {
        popupPhoto.src = cardImage.src;
        popupTitle.textContent = cardImage.alt;
        popupPhoto.alt = cardImage.alt;
        openPopup(popupImage);
    })
    return cardElement;
};

// Добавляем карточки при загрузке
initialCards.forEach(function(item) {
    const cardElement = createCard(item.name, item.link)
    photoCardsElement.append(cardElement);
});

//Сохранение новой карточки
function createCardSubmit (evt) {
    evt.preventDefault();
    const cardElement = createCard(placeNameInput.value, placePhotoInput.value);
    photoCardsElement.prepend(cardElement);
    cardFormElement.reset();
    cardSubmitButton.classList.add(CONFIG_FORM_VALIDATION.inactiveButtonClass);
    cardSubmitButton.disabled = true;
    closePopup(popupAddPlaceElement);
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

//Обработчики
addButtonElement.addEventListener('click', () => {
    cardFormElement.reset();
    openPopup(popupAddPlaceElement);
});
closeButtonProfileElement.addEventListener('click', () =>  closePopup(popupEditProfileElement));
closeButtonPlaceElement.addEventListener('click', () => closePopup(popupAddPlaceElement));
closeButtonImageElement.addEventListener('click', () => closePopup(popupImage));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', createCardSubmit);


enableValidation(CONFIG_FORM_VALIDATION);