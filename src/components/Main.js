import api from "../utils/Api";
import React from "react";
import Card from "./Card";

function Main(props) {

    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
            Promise.all([api.getInfoAboutUser(), api.getInitialCards()])
                .then((res) => {
                    setUserName(res[0].name);
                    setUserDescription(res[0].about);
                    setUserAvatar(res[0].avatar);
                    setCards(res[1]);
                })
                .catch((err) => {
                    console.log(`Ошибка ${err}`);
                });
    }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__person">
                    <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }} >
                    </div>
                    <div className="profile__info">
                        <div className="profile__text">
                            <h1 className="profile__name">{userName}</h1>
                            <p className="profile__status">{userDescription}</p>
                        </div>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card card={card} onCardClick={props.onImagePopup} key={card._id}/>
                ))}
            </section>
        </main>
    );
};

export default Main;