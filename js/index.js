//Открытие попапа
function openPopup(popup){
    enableValidation(CONFIG_FORM_VALIDATION);
    popup.classList.add('popup_opened');
};

//Закрытие попапа
function closePopup(popup){
    popup.classList.remove('popup_opened');
    cardFormElement.reset();
};

// Сохранение данных в Profile
function handleFormSubmit (evt) {
    evt.preventDefault();
    openPopup(popupEditProfileElement);
    profileTitleElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
    closePopup(popupEditProfileElement);
};

//Обработчик открытия и закрытия попапов, заполнения инпутов в Profile
aboutButtonElement.addEventListener('click', () => {
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
    enableValidation(CONFIG_FORM_VALIDATION);
    openPopup(popupEditProfileElement);
});

//Создание карточки
function createCard(name, link) {
    const cardElement = cardsTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
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
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        const popupPhoto = document.querySelector('.popup__image');
        const popupTitle = document.querySelector('.popup__text');
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
    openPopup(popupAddPlaceElement);
    const cardElement = createCard(placeNameInput.value, placePhotoInput.value);
    photoCardsElement.prepend(cardElement);
    cardFormElement.reset();
    closePopup(popupAddPlaceElement);
};
// Закрытие Попапов на оверлей и Esc
function closePopups(){
    const popupsElements = document.querySelectorAll('.popup');
    popupsElements.forEach((popup) => {
        popup.addEventListener('click', (e) => {
            if (e.target.classList[0] === "popup" ){
                closePopup(popup);
            };
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                closePopup(popup);
            };
        });
    });
};
closePopups();

//Обработчики
addButtonElement.addEventListener('click', () => openPopup(popupAddPlaceElement));
closeButtonProfileElement.addEventListener('click', () => closePopup(popupEditProfileElement));
closeButtonPlaceElement.addEventListener('click', () => closePopup(popupAddPlaceElement));
closeButtonImageElement.addEventListener('click', () => closePopup(popupImage));
profileFormElement.addEventListener('submit', handleFormSubmit);
cardFormElement.addEventListener('submit', createCardSubmit);


