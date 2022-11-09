import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const CardDetails = () => {
    const { store, actions } = useContext(Context);
    const [itemDetails, setItemDetails] = useState();
    const params = useParams();
    const properties = ["birth_year", "gender", "height", "skin_color", "eye_color", "climate", "population", "orbital_period", "rotation_period", "diameter"];
    const img_character = `https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`
    const img_planet = `https://starwars-visualguide.com/assets/img/planets/${params.id}.jpg`
    async function details(id, type) {
        const data = await actions.getCardDetails(id, type);
        setItemDetails(data);
    };

    useEffect(() => {
        details(params.id, params.type);
    }, []);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between">
                {
                    itemDetails === undefined ? <div>Loading...</div> :
                        <>
                            {
                                params.type === "people" ?
                                    <img src={img_character}
                                        height="auto"
                                        width="400px"
                                        alt="..-" />
                                    : <img src={img_planet}
                                        height="auto"
                                        width="400px"
                                        alt="..." />
                            }
                            <div className="ms-5">
                                <h1>{itemDetails.name}</h1>
                                <hr></hr>
                                <div className="d-flex flex-wrap mt-5">
                                    {Object.keys(itemDetails).map((key) => {
                                        if (properties.includes(key)) {
                                            return <div className="mx-4">
                                                <h3 className="text-danger">{key}</h3>
                                                <p className="text-center">{itemDetails[key]}</p>
                                            </div>
                                        }
                                    })}
                                </div>
                            </div>
                        </>
                }
            </div>
            <Link to="/"
                className="mt-4 btn btn-warning btn-lg">
                Back Home
            </Link>
        </div>
    );
}