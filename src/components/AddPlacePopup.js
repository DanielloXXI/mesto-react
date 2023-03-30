import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup(props) {
    const namePlaceRef = React.useRef();
    const linkPlaceRef = React.useRef();

    function handleSubmit (e) {
        e.preventDefault();

        props.onAddPlace({
            name: namePlaceRef.current.value,
            link: linkPlaceRef.current.value,
          });

    }


    return (
        <PopupWithForm name={"add"} title={"Новое место"} isOpened={props.isOpen} onClose={props.onClose} buttonText={"Создать"} onSubmit={handleSubmit}>
            <label className="popup__fieldset">
                <input type="text" name="title" className="popup__input popup__input_title" placeholder="Название"
                    id="title" minLength="2" maxLength="30" required ref={namePlaceRef} />
                <span className="popup__input-error title-error"></span>
            </label>
            <label className="popup__fieldset">
                <input type="url" name="link" className="popup__input popup__input_link"
                    placeholder="Ссылка на картинку" id="link" required ref={linkPlaceRef}/>
                <span className="popup__input-error link-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;