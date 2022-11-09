import React, { useContext } from "react";
import PropTypes from "prop-types"
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Card = (props) => {
    const properties = ["gender", "eye_color", "hair_color", "population", "terrain"];
    const { store, actions } = useContext(Context);

    return (
        <div className="card col-4 mx-2" style={{ width: "18rem" }}>
            <img src={props.picture} className="card-img-top" alt="..." />
            <div className="card-header">
                <h2 className="card-title">{props.item.name}</h2>
            </div>
            <div className="card-body">
                {
                    Object.keys(props.item).map((key) => {
                        if (properties.includes(key)) {
                            return <p className="card-text m-0">
                                <b className="text-danger">{key}</b>
                                :   {props.item[key]}</p>
                        }
                    })
                }
            </div>
            <div className="card-footer d-flex justify-content-between bg-white mt-1">
                <Link
                    to={`/${props.type}/${props.id}`}
                    className="btn btn-primary"
                >
                    Learn more!
                </Link>
                <button
                    className={
                        actions.isFavorite(props.item) ? "btn btn-danger fas fa-heart"
                            : "btn btn-outline-danger far fa-heart"
                    }
                    onClick={(event) => actions.toggleFavorites(props.item)}
                >
                </button>
            </div>
        </div>
    )
}

Card.propTypes = {
    item: PropTypes.object
};