import "./AnnouncementBox.css";
import  Transition  from 'react-transition-group/Transition';
import { useState } from "react";

type propsTypes = {
  charClicked: string;
  rightGuess: Boolean;
};

const AnnouncementBox = ({ ...props }: propsTypes): JSX.Element => {
  const [startAnimation, SetStartAnimation] = useState(false)
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const notFound: string = `${capitalize(
    props.charClicked
  )} is not not there!\n Keep looking!`;
  const found: string = `You found ${capitalize(
    props.charClicked
  )}!\n Great job!`;
  return (
  <Transition in={startAnimation === true}>
    <div className="announcement-box">
        
      <p
        className={`announcement-text ${props.rightGuess ? "right" : "wrong"}`}
        // style={}
      >
        {props.rightGuess ? found : notFound}
      </p>
    </div>
    </Transition>
  );
};

export default AnnouncementBox;
