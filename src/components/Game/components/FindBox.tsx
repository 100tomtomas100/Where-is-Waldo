import { useEffect, useState } from "react";
import { database } from "../../../firebase";
import { DataSnapshot, onValue, ref } from "firebase/database";

import "./FindBox.css";

const FindBox = ({
  ...findBoxProps
}: {
  imgName: string;
  show: string;
  coo: { x: Number; y: Number };
  ratio: { [key: string]: any };
  hideBox: Function;
  getChosenChar: Function,
  charClicked: Function,
  rightGuess: Function,
  animateChoice: Function,
  victory: Function
}): JSX.Element => {
  const [allData, SetAllData] = useState<{ [key: string]: any }>({});
  const [counter, SetCounter] = useState<string[] | []>([""]);

  //get data from database
  useEffect(() => {
    const dataRef = ref(database, `to-find/${findBoxProps.imgName}`);
    onValue(dataRef, (snapshot: DataSnapshot) => {
      const data: { [key: string]: any } = snapshot.val();
      SetAllData(data);
      SetCounter(Object.keys(data))
    })       
  }, [findBoxProps.imgName]);

  useEffect(() => {
    if (counter.length === 0) {
      findBoxProps.victory(true)
    }
  },[counter])

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  const handleClick = (e: React.MouseEvent) => {
    //check if chosen character is the same as in the image
    const choice: string = (e.target as HTMLInputElement).id;
    findBoxProps.charClicked(choice)
    //ratios of coordinates for the chosen character
    const coo1: {[key: string]: any} = allData[choice].coor1;
    const coo2: {[key: string]: any} = allData[choice].coor2;
    //ratios of coordinates for the area of clicked circle
    const clickMin: {[key: string]: any} = findBoxProps.ratio.min;
    const clickMax: {[key: string]: any} = findBoxProps.ratio.max;
    //compare the clicked area and the character area
    if (
      (clickMin.x <= coo1.x &&
        clickMin.y <= coo1.y &&
        clickMax.x >= coo1.x &&
        clickMax.y >= coo1.y) ||
      (clickMin.x <= coo2.x &&
        clickMin.y <= coo2.y &&
        clickMax.x >= coo2.x &&
        clickMax.y >= coo2.y)
    ) {
      findBoxProps.rightGuess(true)
      // switch found character image to grayscale        
      findBoxProps.getChosenChar(choice) 
      SetCounter(prevCounter=>(prevCounter.filter(c => c!== choice)))
      //animate if the choice ir right
      if (counter.length > 1) {
        findBoxProps.animateChoice(true)
      }    
    } else {
      //animate if the choice is wrong
      findBoxProps.animateChoice(true)      
      findBoxProps.rightGuess(false)
    }
      // hide the box for choices
    findBoxProps.hideBox();
  };
  
  return (
    <div
      className="find-box"
      style={{
        display: `${findBoxProps.show}`,
        left: `${findBoxProps.coo.x}px`,
        top: `${findBoxProps.coo.y}px`,
      }}
    >
      <div className="find-box-wrapper">
        {counter.map((name) => {
          return (
            <div
              className="find-box-name"
              key={name}
              id={name}
              onClick={handleClick}
            >
              {capitalize(name)}
            </div>
          );
        })}
      </div>
      <div className="pop-up-found-not-found"></div>
    </div>
  );
};

export default FindBox;
