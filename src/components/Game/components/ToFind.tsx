import waldo from "../../../images/waldo.png";
import wilma from "../../../images/wilma.png";
import wizard from "../../../images/wizard.png";
import odlaw from "../../../images/odlaw.png";

import "./ToFind.css";
import { useState } from "react";
const ToFind = ({
  chosenChar,
}: {
  chosenChar: { [key: string]: any };
}): JSX.Element => {
    const [charName, SetCharName] = useState<string>("")

  const handleMouseEnter = (e: React.MouseEvent): void => {
    SetCharName((e.target as HTMLImageElement).id)
  };

  const handleMouseLeave = (): void => {
    SetCharName("")
  }

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="searching">
      <div className="searching-text">Searching for!</div>
      <div className="to-find">
        <img
          src={odlaw}
          id="odlaw"
          alt="odlaw"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`to-find-img ${chosenChar["odlaw"]} `}
        />
        <img
          src={waldo}
          id="wally"
          alt="waldo"
          className={`to-find-img ${chosenChar["wally"]}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src={wilma}
          id="wilma"
          alt="wilma"
          className={`to-find-img ${chosenChar["wilma"]}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <img
          src={wizard}
          id="wizard"
          alt="wizard"
          className={`to-find-img ${chosenChar["wizard"]}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div className={` ${charName !== ""? "to-find-name": "hide-box"}`}>{capitalize(charName)}</div>
    </div>
  );
};

export default ToFind;
