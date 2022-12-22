import Timer from "./Timer";
import Button from "./Button";
import ToFind from "./ToFind";
import "./Header.css";
import StickyBox from "react-sticky-box";

type headerProps = {
  chosenChar: {[key: string]: any},
  timeStart: Date,
  stopTimer: boolean
}

const Header = ({...props}: headerProps): JSX.Element => {

  type ReturnButton = {
    to: string;
    title: string;
  };
  const returnButton: ReturnButton = {
    to: "/",
    title: "RETURN",
  };

  type timerPropsTypes = {
    timeStart: Date,
    stopTimer: boolean
  }

  const timerProps: timerPropsTypes = {
    timeStart: props.timeStart,
    stopTimer: props.stopTimer
  }

  return (
    <StickyBox>
      <div className="game-header">
        <ToFind chosenChar={props.chosenChar} />
        <Timer {...timerProps} />
        <Button {...returnButton} />
      </div>
    </StickyBox>
  );
};

export default Header;
