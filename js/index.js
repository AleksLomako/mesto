const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
// Создаем переменные
const photoCardsElement = document.querySelector('.photo-cards');
const cardsTemplate = document.querySelector('.cards-template').content;

const aboutButtonElement = document.querySelector('.profile__edit-button');
const addButtonElement = document.querySelector('.profile__add-button');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

const popupEditProfileElement = document.querySelector('.popup');
const popupAddPlaceElement = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image');

const closeButtonProfileElement = document.querySelector ('.popup__close-button');
const closeButtonPlaceElement = document.querySelector('.popup__close-button_type_place');
const closeButtonImageElement = document.querySelector('.popup__close-button_image')

const profileFormElement = document.querySelector('.popup__form');
const cardFormElement = document.querySelector('.popup__form_type_place');
let nameInput = profileFormElement.querySelector('input[name="name"]');
let jobInput = profileFormElement.querySelector('input[name="job"]');
let placeNameInput = cardFormElement.querySelector('input[name="place-name"]');
let placePhotoInput = cardFormElement.querySelector('input[name="place-link"]');

//Открытие и закрытие попапа
function openPopup(popup){
    popup.classList.toggle('popup_opened');
};

// Сохранение данных в Profile
function handleFormSubmit (evt) {
    evt.preventDefault();
    openPopup(popupEditProfileElement);
    profileTitleElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
};

//Обработчик открытия и закрытия попапов, заполнения инпутов в Profile
aboutButtonElement.addEventListener('click', () => {
    openPopup(popupEditProfileElement);
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
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
        const popupImageSrc = document.querySelector('.popup__image');
        const popupTitle = document.querySelector('.popup__text');
        popupImageSrc.src = cardImage.src;
        popupTitle.textContent = cardImage.alt;
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
    const cardElement = createCard(placeNameInput.value, placePhotoInput.value)
    photoCardsElement.prepend(cardElement);
    placeNameInput.value = '';
    placePhotoInput.value = '';
};

//Обработчики
addButtonElement.addEventListener('click', () => openPopup(popupAddPlaceElement));
closeButtonProfileElement.addEventListener('click', () => openPopup(popupEditProfileElement));
closeButtonPlaceElement.addEventListener('click', () => openPopup(popupAddPlaceElement));
closeButtonImageElement.addEventListener('click', () => openPopup(popupImage));
profileFormElement.addEventListener('submit', handleFormSubmit);
cardFormElement.addEventListener('submit', createCardSubmit);