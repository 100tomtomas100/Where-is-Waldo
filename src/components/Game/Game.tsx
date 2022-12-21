import "./Game.css";
import Header from "./components/Header";
import MainImage from "./components/MainImage";
import Cursor from "./components/Cursor";
import map from "../../images/map.jpg";

const Game = (): JSX.Element => {

  return (
    <>
      <Header />      
      <Cursor />
      <MainImage img={map} />
    </>
  );
};

export default Game;
