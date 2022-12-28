import Timer from "../Game/components/Timer";
import Button from "../Game/components/Button";
import ToFind from "../Game/components/ToFind";
import "./Header.css";
import StickyBox from "react-sticky-box";
import { useNavigate } from "react-router-dom";

type headerProps = {
  chosenChar?: { [key: string]: any };
  timeStart?: Date;
  stopTimer?: boolean;
  buttonTitle?: string
  directTo?: string
  text?: string
};

const Header = ({ ...props }: headerProps): JSX.Element => {

  const navigate = useNavigate()

  type ReturnButton = {
    to: string;
    title: string;
  };
  const returnButton: ReturnButton = {
    to: "/",
    title: "RETURN",
  };

  const gamePage = (): JSX.Element => {
    if (props.timeStart && typeof props.stopTimer === "boolean" && props.chosenChar) {
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
      )
    } else {
      return (
        <></>
      )
    }    
  }
  const handleClick =(): void => {
    if(props.directTo) {
      navigate(props.directTo)
    }    
  }
  
  return (
    <StickyBox>
      <div className="game-header">
        {
          props.timeStart && typeof props.stopTimer === "boolean" && props.chosenChar?      
          gamePage():   
          props.buttonTitle?         
          <button className="header-button" onClick={handleClick}>{props.buttonTitle}</button>:
          <></>               
        }
        {
          props.text? <h2>{props.text}</h2>: <></> 
        }
        <Button {...returnButton} />
      </div>
    </StickyBox>
  );
};

export default Header;
