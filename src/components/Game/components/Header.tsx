import Timer from "./Timer";
import Button from "./Button";
import ToFind from "./ToFind";
import "./Header.css";
import StickyBox from "react-sticky-box";

const Header = (): JSX.Element => {
  type ReturnButton = {
    to: string;
    title: string;
  };
  const returnButton: ReturnButton = {
    to: "/",
    title: "RETURN",
  };

  const timeStart: Date = new Date();

  return (
    <StickyBox>
      <div className="game-header">
        <ToFind />
        <Timer timeStart={timeStart} />
        <Button {...returnButton} />
      </div>
    </StickyBox>
  );
};

export default Header;
