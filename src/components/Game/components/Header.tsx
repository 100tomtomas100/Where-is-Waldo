import Timer from "./Timer";
import Button from "./Button";
import ToFind from "./ToFind";
import "./Header.css";
import StickyBox from "react-sticky-box";
import { useState } from "react";


const Header = ({chosenChar}: {chosenChar: {[key: string]: any}}): JSX.Element => {
  const [timeStart] = useState<Date>(new Date())
  type ReturnButton = {
    to: string;
    title: string;
  };
  const returnButton: ReturnButton = {
    to: "/",
    title: "RETURN",
  };

  return (
    <StickyBox>
      <div className="game-header">
        <ToFind chosenChar={chosenChar} />
        <Timer timeStart={timeStart} />
        <Button {...returnButton} />
      </div>
    </StickyBox>
  );
};

export default Header;
