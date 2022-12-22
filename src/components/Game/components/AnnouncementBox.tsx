import "./AnnouncementBox.css";

type propsTypes = {
  charClicked: string;
  rightGuess: Boolean;
  animateChoice: boolean
};

const AnnouncementBox = ({ ...props }: propsTypes): JSX.Element => {
 
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  //message for a wrong choice
  const notFound: string = `${capitalize(
    props.charClicked
  )} is not not there!\n Keep looking!`;
  //message for a write choice
  const found: string = `You found ${capitalize(
    props.charClicked
  )}!\n Great job!`;
  return (
 
    <div className={`announcement-box ${props.animateChoice? "announcement-box-animate": ""}`} 
    >        
      <p
        className={`announcement-text ${props.rightGuess ? "right" : "wrong"}`}
      >
        {props.rightGuess ? found : notFound}
      </p>
    </div>
 
  );
};

export default AnnouncementBox;
