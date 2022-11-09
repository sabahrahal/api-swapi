import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Card } from "../component/Card.jsx";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  let count_characters = 0;
  let count_planets = 0;
  let img = "";

  useEffect(() => {
    actions.getCharacters();
    actions.getPlanets();
  }, []);

  return (
    <div className="container">
      <div>
        <h1 className="title">Characters</h1>
      </div>
      <div className="d-flex flex-row char-container">
        {
          store.characters.length <= 0 ? <div>Loading...</div> :
            <> {store.characters.map((character, index) => {
              count_characters = count_characters + 1;
              let name_characters = "people"
              img = `https://starwars-visualguide.com/assets/img/characters/${count_characters}.jpg`
              return <Card item={character} key={index} picture={img} id={count_characters} type={name_characters} />;
            })}
            </>
        }
      </div>

      <div>
        <h1 className="title">Planets</h1>
      </div>
      <div className="d-flex flex-row char-container">
        {store.planets.length <= 0 ? <div>Loading...</div> :
          <>
            {store.planets.map((planet, index) => {
              count_planets = count_planets + 1;
              let name_planets = "planets"
              img = `https://starwars-visualguide.com/assets/img/planets/${count_planets}.jpg`
              return <Card item={planet} key={`${index}a`} picture={img} id={count_planets} type={name_planets} />;
            })}
          </>
        }

      </div>
    </div>
  );
};
