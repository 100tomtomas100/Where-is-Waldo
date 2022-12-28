import AnnouncementBox from "./AnnouncementBox";
import FindBox from "./FindBox";
import { useEffect, useRef, useState } from "react";
import GameOver from "./GameOver";
import Storage from "../../common/Storage";
import { useContext } from "react";

type propsTypes = {
    // img: string,
    getChosenChar: Function,
    cursorClass: Function,
    cursorWidth: Number,
    timeStart: Date,
    stopTimer: Function
}

const MainImage = ({...props}: propsTypes): JSX.Element => {
  const [hideFindBox, SetHideFindBox] = useState<string>("none");
  const [charClicked, SetCharClicked] = useState<string>("")
  const [animateChoice, SetAnimateChoice] = useState<boolean>(false)
  const [victory, SetVictory] = useState<boolean>(false)
  const [mapName, SetMapName] = useState<string>("")
  const [rightGuess, SetRightGuess] = useState<Boolean>(false)
  const [coo, SetCoo] = useState<{ x: Number; y: Number }>({ x: 0, y: 0 });
  const [ratioClickImage, SetRatioClickImage] = useState<{
    min: { x: Number; y: Number };
    max: { x: Number; y: Number };
  }>({
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 },
  });

  const {selectedMap} = useContext(Storage)

  //after all characters are found scroll to the top of the screen
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    if(victory){
      props.stopTimer(true)
    }
  },[victory])
  
  //get the name of the world map to use for correct data get in FindBox and submit data to the correct leader board
  useEffect(() => {
    SetMapName(selectedMap)
  },[selectedMap])

  //for getting the height and with of the image to calculate the ratios of the of the click, later compered to character position ratios
  const imageRef = useRef<HTMLImageElement | null>(null);   

  //circle instead  of a pointer when a mouse is over the image
  const handleMouseOver = (): void => {
    props.cursorClass()
  };

  //pointer instead of circle when the mouse is outside the image
  const handleMouseOut = (): void => {
    props.cursorClass()
  };

  const handleClick = (e: React.MouseEvent): void => {

    //reset animation class to none before the character choice is made used in Announcement box
    SetAnimateChoice(false)

    //show/hide the box with character choices
    SetHideFindBox((prevClicked) =>
      prevClicked === "none" ? "block" : "none"
    );
    // set click coordinates used in FindBox
    SetCoo({
      x: e.clientX,
      y: e.clientY,
    });

    // calculate the area of the mouse circle size ratio range
    SetRatioClickImage({
      min: {
        x: imageRef.current
          ? (e.nativeEvent.offsetX - (Number(props.cursorWidth) / 2)) /
            imageRef.current?.width
          : 1,
        y: imageRef.current
          ? (e.nativeEvent.offsetY - (Number(props.cursorWidth) / 2)) /
            imageRef.current?.height
          : 1,
      },
      max: {
        x: imageRef.current
          ? (e.nativeEvent.offsetX + (Number(props.cursorWidth) / 2)) /
            imageRef.current?.width
          : 1,
        y: imageRef.current
          ? (e.nativeEvent.offsetY + (Number(props.cursorWidth) / 2)) /
            imageRef.current?.height
          : 1,
      },
    });
  };

  type findBoxPropsTypes = {
    mapName: string;
    show: string;
    coo: { x: Number; y: Number };
    ratio: { [key: string]: any };
    hideBox: Function;
    getChosenChar: Function,
    charClicked: Function,
    rightGuess: Function,
    animateChoice: Function,
    victory: Function
  }

  const findBoxProps: findBoxPropsTypes= {
    mapName: mapName,
    show: hideFindBox,
    coo: coo,
    ratio: ratioClickImage,
    hideBox: ():void => {
      SetHideFindBox("none");
    },
    getChosenChar: props.getChosenChar,
    charClicked: (name: string): void => {
        SetCharClicked(name)
    },
    rightGuess: (wasRight: Boolean): void => {
        SetRightGuess(wasRight)
    },
    animateChoice: (animate: boolean):void => {
      SetAnimateChoice(animate)
    },
    victory: (ifWon: boolean): void => {
      SetVictory(ifWon)
    }
  };

  type announcementBoxPropsTypes ={
    charClicked: string,
    rightGuess: Boolean,
    animateChoice: boolean
  }

  const announcementBoxProps : announcementBoxPropsTypes = {
    charClicked: charClicked,
    rightGuess: rightGuess,
    animateChoice: animateChoice
  }

  type gameOverPropsTypes = {
    victory: boolean,
    timeStart: Date,
    mapName: string
  }

  const gameOverProps: gameOverPropsTypes = {
    victory: victory,
    timeStart: props.timeStart,
    mapName: mapName
  }


  return (
    <>
      <img
        ref={imageRef}
        src={require(`../../../images/${selectedMap}.jpg`)}
        alt="game map"
        className="game-map"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <FindBox {...findBoxProps} />
      <AnnouncementBox {...announcementBoxProps}/>
      <GameOver {...gameOverProps}/>
    </>
  );
};

export default MainImage;
