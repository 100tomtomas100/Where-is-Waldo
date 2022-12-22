import "./Game.css";
import Header from "./components/Header";
import MainImage from "./components/MainImage";
import Cursor from "./components/Cursor";
import map from "../../images/map.jpg";
import { useState } from "react";

const Game = (): JSX.Element => {
  const [chosenChar, SetChosenChar] = useState<{ [key: string]: any }>({});
  const [cursorClass, SetCursorClass] = useState<string>("");
  const [cursorWidth, SetCursorWidth] = useState<Number>(1)
  const [timeStart] = useState<Date>(new Date())
  const [stopTimer, SetStopTimer] = useState<boolean>(false)
  
  type mainImageTypes = {
    img: string,
    getChosenChar: Function,
    cursorClass: Function,
    cursorWidth: Number,
    timeStart: Date,
    stopTimer: Function
  }
  
  const mainImageProps: mainImageTypes ={
    img: map,
    getChosenChar: (char: string): void => {
      SetChosenChar(prevChosenChar => ({
        ...prevChosenChar,
        [char]: "grayscale",
      }))
    },
    cursorClass: ():void => {
      SetCursorClass(prevCursorClass => (
        prevCursorClass===""? "circle": ""
      ))
    },
    cursorWidth: cursorWidth,
    timeStart: timeStart,
    stopTimer: (stop: boolean): void => {
      SetStopTimer(stop)
    }
  }

  type cursorPropsTypes = {
    getCursorWidth: Function,
    cursorClass: string
  }

  const cursorProps: cursorPropsTypes = {
    getCursorWidth: (number: Number): void => {
      SetCursorWidth(number)
    },
    cursorClass: cursorClass
  }

  type headerPropsTypes = {
    chosenChar: {[key: string]: any},
    timeStart: Date,
    stopTimer: boolean
  }

  const headerProps: headerPropsTypes = {
    chosenChar: chosenChar,
    timeStart: timeStart,
    stopTimer: stopTimer
  }

  return (
    <>
      <Header {...headerProps} />
      <Cursor {...cursorProps} />
      <MainImage {...mainImageProps}
      />
    </>
  );
};

export default Game;
