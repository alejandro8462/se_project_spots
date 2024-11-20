const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const profileEditButton = document.querySelector(".profile__edit-button");
const profileName = document.querySelector(".profile__name");
const descriptionName = document.querySelector(".profile__description");

const editProfileModal = document.querySelector("#edit-profile-modal");
const editFormElement = editProfileModal.querySelector(".modal__form");
const editModalCloseButton = editProfileModal.querySelector(
  ".modal__close-button"
);
const editModalNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card__template");
const cardsList = document.querySelector(".cards__list");

const cardModal = document.querySelector("#new-card-modal");
const cardModalCloseButton = cardModal.querySelector(".modal__close-button");
const newCardButton = document.querySelector(".profile__post-button");
const cardForm = cardModal.querySelector(".modal__form");
const cardLinkInput = cardModal.querySelector("#new-card-link-input");
const cardNameInput = cardModal.querySelector("#new-card-name-input");
const previewModal = document.querySelector("#preview-modal");
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(
  ".modal__close-button_preview"
);
const cardSubmitButton = cardModal.querySelector(".modal__submit-button");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__button");
  const deleteButton = cardElement.querySelector(".delete__button");

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button_liked");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImage.src = data.link;
    previewModalCaption.textContent = data.name;
    previewModalImage.alt = data.name;
  });

  return cardElement;
}

previewModalCloseButton.addEventListener("click", () => {
  closeModal(previewModal);
});

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  resetValidation(editFormElement, settings);
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = descriptionName.textContent;
  openModal(editProfileModal);
});

editModalCloseButton.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newCardButton.addEventListener("click", () => {
  resetValidation(cardForm, settings);
  openModal(cardModal);
});

cardModalCloseButton.addEventListener("click", () => {
  closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleNewCardSubmit);

function handleNewCardSubmit(evt) {
  evt.preventDefault();
  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardEl = getCardElement(inputValues);
  cardsList.prepend(cardEl);

  evt.target.reset();
  disableButton(cardSubmitButton, settings);

  closeModal(cardModal);
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  descriptionName.textContent = editModalDescriptionInput.value;

  closeModal(editProfileModal);
}

initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
