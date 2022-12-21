import "./Start.css";
import ButtonChoice from "./components/ButtonChoice";
import startImgBackground from "../../images/start.png";
import LeaderBoardImgBackground from "../../images/leader-board.png";

const Start = (): JSX.Element => {
  type Props = {
    link: string;
    title: string;
    image: string
  };
  
  const startGameProps: Props = {
    link: "/game",
    title: "START GAME",
    image: startImgBackground
  };
  const leaderBoardProps: Props = {
    link: "/leader-board",
    title: "LEADER BOARD",
    image: LeaderBoardImgBackground
  };

  const Header = (): JSX.Element => {
    return (
      <div className="start-header">
        <h1>Where Is Waldo?</h1>
      </div>
    );
  };

  return (
    <>
      <Header></Header>
      <div className="start-page">
        <ButtonChoice {...startGameProps} />
        <ButtonChoice {...leaderBoardProps} />
      </div>
    </>
  );
};

export default Start;
