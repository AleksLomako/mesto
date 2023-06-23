const aboutButtonElement = document.querySelector ('.profile__edit');
const closeButtonElement = document.querySelector ('.popup__close-button');
const popupElement = document.querySelector ('.popup');
const formElement = document.querySelector('.popup__form');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');
let nameInput = formElement.querySelector('input[name="name"]');
let jobInput = formElement.querySelector('input[name="job"]');

function toggle(){
    popupElement.classList.toggle('popup_opened');
}

function handleClick() {
    toggle();
    nameInput.value = profileTitleElement.textContent;
    jobInput.value = profileSubtitleElement.textContent;
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    toggle();
    profileTitleElement.textContent = nameInput.value;
    profileSubtitleElement.textContent = jobInput.value;
}

aboutButtonElement.addEventListener('click', handleClick);
closeButtonElement.addEventListener('click', handleClick);
formElement.addEventListener('submit', formSubmitHandler);