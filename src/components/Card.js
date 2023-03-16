import trash from "../images/trash.svg";
import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="element">
            <img src={trash} className="element__delete" alt="удалить" />
            <img src={props.card.link} onClick={handleClick} alt={props.name} className="element__image" />
            <div className="element__description">
                <h2 className="element__name">{props.card.name}</h2>
                <div className="element__like">
                    <button className="element__like-icon" type="button"></button>
                    <p className="element__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;