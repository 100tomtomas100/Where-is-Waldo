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
  rightGuess: Function
}): JSX.Element => {
  const [allData, SetAllData] = useState<{ [key: string]: any }>({});

  //get data from database
  useEffect(() => {
    const dataRef = ref(database, `to-find/${findBoxProps.imgName}`);
    onValue(dataRef, (snapshot: DataSnapshot) => {
      const data: { [key: string]: any } = snapshot.val();
      SetAllData(data);
    });
  }, [findBoxProps.imgName]);

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //check if chosen character is the same as in the image
  const handleClick = (e: React.MouseEvent) => {
    const choice: string = (e.target as HTMLInputElement).id;
    findBoxProps.charClicked(choice)
    const coo1: {[key: string]: any} = allData[choice].coor1;
    const coo2: {[key: string]: any} = allData[choice].coor2;

    const clickMin: {[key: string]: any} = findBoxProps.ratio.min;
    const clickMax: {[key: string]: any} = findBoxProps.ratio.max;

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
      console.log("found");
      findBoxProps.rightGuess(true)
      // switch found character image to grayscale        
      findBoxProps.getChosenChar(choice)
          
    } else {
      console.log("not found");
      findBoxProps.rightGuess(false)
    }
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
        {Object.keys(allData).map((name) => {
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
