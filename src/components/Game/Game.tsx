import "./Game.css";
import Header from "./components/Header";
import map from "../../images/map.jpg";

import { MouseEvent } from "react";

const Game = (): JSX.Element => {
  const hoverHandler = (e: MouseEvent): void => {
    console.log(e.screenX);
    console.log(e.screenY);
  };

  return (
    <>
      <Header />

      <img
        src={map}
        alt="game map"
        className="game-map"
        onMouseMove={hoverHandler}
      />
    </>
  );
};

export default Game;
