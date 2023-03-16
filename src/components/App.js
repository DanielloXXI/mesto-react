
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setIsSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  function handleCardClick(props) {
    setIsImagePopupOpen(true);
    setIsSelectedCard(props);
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

  return (
    <>
      <Header />

      <Main onEditAvatar={showPopupAvatar} onEditProfile={showPopupEdit} onAddPlace={showPopupAdd} onImagePopup={handleCardClick} />

      <Footer />

      <PopupWithForm name={"add"} title={"Новое место"} isOpened={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <label className="popup__fieldset">
          <input type="text" name="title" className="popup__input popup__input_title" placeholder="Название"
            id="title" minLength="2" maxLength="30" required />
          <span className="popup__input-error title-error"></span>
        </label>
        <label className="popup__fieldset">
          <input type="url" name="link" className="popup__input popup__input_link"
            placeholder="Ссылка на картинку" id="link" required />
          <span className="popup__input-error link-error"></span>
        </label>
        <button type="submit" className="popup__submit-button">Создать</button>
      </PopupWithForm>

      <PopupWithForm name={"edit"} title={"Редактировать профиль"} isOpened={isEditProfilePopupOpen} onClose={closeAllPopups}>
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
        <button type="submit" className="popup__submit-button">Сохранить</button>
      </PopupWithForm>

      <ImagePopup name={"photo"} card={selectedCard} onClose={closeAllPopups} isOpened={isImagePopupOpen} />

      <PopupWithForm name={"avatar"} title={"Обновить аватар"} isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <label className="popup__fieldset">
          <input type="url" name="image" className="popup__input popup__input_avatar_name" id="image" required
            placeholder="Ссылка на аватар" />
          <span className="popup__input-error image-error"></span>
        </label>
        <button type="submit" className="popup__submit-button">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm name={"delete"} title={"Вы уверены?"}>
        <button type="submit" className="popup__submit-button">Да</button>
      </PopupWithForm>

      <template id="element">

      </template>
    </>
  );
}

export default App;
