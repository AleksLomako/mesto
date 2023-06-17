const aboutButtonElement = document.querySelector ('.profile__edit');
const closeButtonElement = document.querySelector ('.popup__close-button');
const popupElement = document.querySelector ('.popup');
const formElement = document.querySelector('.popup__form');
const profileTitleElement = document.querySelector('.profile__title');
const profileSubtitleElement = document.querySelector('.profile__subtitle');

function handleClick() {
    popupElement.classList.toggle('popup_opened');
    let nameInput = formElement.querySelector('input[name="name"]');
    nameInput.value = profileTitleElement.textContent;
    let jobInput = formElement.querySelector('input[name="job"]');
    jobInput.value = profileSubtitleElement.textContent;
}

function formSubmitHandler (evt) {
    let nameInput = formElement.querySelector('input[name="name"]').value;
    profileTitleElement.textContent = nameInput;
    let jobInput = formElement.querySelector('input[name="job"]').value;
    profileSubtitleElement.textContent = jobInput;
    popupElement.classList.toggle('popup_opened');
	evt.preventDefault();
}

aboutButtonElement.addEventListener('click', handleClick);
closeButtonElement.addEventListener('click', handleClick);
formElement.addEventListener('submit', formSubmitHandler);