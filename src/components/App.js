import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardContext } from "../contexts/CardContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getInfoAboutUser(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setIsSelectedCard(card);
  }

  function showPopupEdit() {
    setIsEditProfilePopupOpen(true);
  }

  function showPopupAdd() {
    setIsAddPlacePopupOpen(true);
  }

  function showPopupAvatar() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    } else {
      api.setLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    }
  }

  return (
    <CardContext.Provider value={cards}>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Main onEditAvatar={showPopupAvatar} onEditProfile={showPopupEdit} onAddPlace={showPopupAdd} onImagePopup={handleCardClick} onCardLike={handleCardLike}/>

        <Footer />

        <PopupWithForm name={"add"} title={"Новое место"} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText={"Создать"}>
          <label className="popup__fieldset">
            <input type="text" name="title" className="popup__input popup__input_title" placeholder="Названиеее"
              id="title" minLength="2" maxLength="30" required />
            <span className="popup__input-error title-error"></span>
          </label>
          <label className="popup__fieldset">
            <input type="url" name="link" className="popup__input popup__input_link"
              placeholder="Ссылка на картинку" id="link" required />
            <span className="popup__input-error link-error"></span>
          </label>

        </PopupWithForm>

        <PopupWithForm name={"edit"} title={"Редактировать профиль"} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"}>
          <label className="popup__fieldset">
            <input type="text" name="name" className="popup__input popup__input_edit_name" id="name" minLength="2"
              maxLength="40" required placeholder='Имя' />
            <span className="popup__input-error name-error"></span>
          </label>
          <label className="popup__fieldset">
            <input type="text" name="description" className="popup__input popup__input_edit_description"
              id="description" minLength="2" maxLength="200" required placeholder='Занятие' />
            <span className="popup__input-error description-error"></span>
          </label>
        </PopupWithForm>

        <ImagePopup name={"photo"} card={selectedCard} onClose={closeAllPopups} isOpened={isImagePopupOpen} />

        <PopupWithForm name={"avatar"} title={"Обновить аватар"} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText={"Сохранить"}>
          <label className="popup__fieldset">
            <input type="url" name="image" className="popup__input popup__input_avatar_name" id="image" required
              placeholder="Ссылка на аватар" />
            <span className="popup__input-error image-error"></span>
          </label>
        </PopupWithForm>

        <PopupWithForm name={"delete"} title={"Вы уверены?"} buttonText={"Да"}>
        </PopupWithForm>

        <template id="element">

        </template>
      </CurrentUserContext.Provider>
    </CardContext.Provider>
  );
}

export default App;
