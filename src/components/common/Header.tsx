import Timer from "../Game/components/Timer";
import Button from "../Game/components/Button";
import ToFind from "../Game/components/ToFind";
import "./Header.css";
import StickyBox from "react-sticky-box";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Storage from "../common/Storage";

type headerProps = {
  chosenChar?: { [key: string]: any };
  timeStart?: Date;
  stopTimer?: boolean;
  buttonTitle?: string;
  directTo?: string;
  text?: string;
  mapCount?: number;
  mapTitle?: string;
};

const Header = ({ ...props }: headerProps): JSX.Element => {
  const { SetSelectedMap } = useContext(Storage);
  const navigate = useNavigate();

  type ReturnButton = {
    to: string;
    title: string;
  };
  const returnButton: ReturnButton = {
    to: "/",
    title: "RETURN",
  };

  //render when the game starts
  const gamePage = (): JSX.Element => {
    if (
      props.timeStart &&
      typeof props.stopTimer === "boolean" &&
      props.chosenChar
    ) {
      type timerPropsTypes = {
        timeStart: Date;
        stopTimer: boolean;
      };

      const timerProps: timerPropsTypes = {
        timeStart: props.timeStart,
        stopTimer: props.stopTimer,
      };
      return (
        <>
          <ToFind chosenChar={props.chosenChar} />
          <Timer {...timerProps} />
        </>
      );
    } else {
      return <></>;
    }
  };
  const handleClick = (): void => {
    //choose map randomly
    if (props.directTo === "/game") {
      const random = Math.floor(
        Math.random() * (props.mapCount ? props.mapCount : 1)
      );
      SetSelectedMap(
        random === 0 && props.mapTitle
          ? props.mapTitle
          : props.mapTitle
          ? props.mapTitle + random
          : ""
      );
    }

    if (props.directTo) {
      navigate(props.directTo);
    }
  };

  return (
    <StickyBox>
      <div className="game-header">
        {props.timeStart &&
        typeof props.stopTimer === "boolean" &&
        props.chosenChar ? (
          gamePage()
        ) : props.buttonTitle ? (
          <button className="header-button" onClick={handleClick}>
            {props.buttonTitle}
          </button>
        ) : (
          <></>
        )}
        {props.text ? <h2>{props.text}</h2> : <></>}
        <Button {...returnButton} />
      </div>
    </StickyBox>
  );
};

export default Header;
