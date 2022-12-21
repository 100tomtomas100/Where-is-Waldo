import { useRef, useState } from "react";
import FindBox from "./FindBox";

type propsTypes = {
    img: string,
    getChosenChar: Function,
    cursorClass: Function,
    cursorWidth: Number
}

const MainImage = ({...props}: propsTypes): JSX.Element => {
  const [hideFindBox, SetHideFindBox] = useState<string>("none");
  const [coo, SetCoo] = useState<{ x: Number; y: Number }>({ x: 0, y: 0 });
  const [ratioClickImage, SetRatioClickImage] = useState<{
    min: { x: Number; y: Number };
    max: { x: Number; y: Number };
  }>({
    min: { x: 0, y: 0 },
    max: { x: 0, y: 0 },
  });
  
  const imageRef = useRef<HTMLImageElement | null>(null);  
  const imgName: string = props.img.split(/[/.]+/)[3];

  const handleMouseOver = (): void => {
    props.cursorClass()
  };

  const handleMouseOut = (): void => {
    props.cursorClass()
  };

  const handleClick = (e: React.MouseEvent): void => {

    SetHideFindBox((prevClicked) =>
      prevClicked === "none" ? "block" : "none"
    );
    SetCoo({
      x: e.clientX,
      y: e.clientY,
    });

    // calculate the square of the circle size ratio range
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
    imgName: string;
    show: string;
    coo: { x: Number; y: Number };
    ratio: { [key: string]: any };
    hideBox: Function;
    getChosenChar: Function
  }

  const findBoxProps: findBoxPropsTypes= {
    imgName: imgName,
    show: hideFindBox,
    coo: coo,
    ratio: ratioClickImage,
    hideBox: ():void => {
      SetHideFindBox("none");
    },
    getChosenChar: props.getChosenChar
  };

  return (
    <>
      <img
        ref={imageRef}
        src={props.img}
        alt="game map"
        className="game-map"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      <FindBox {...findBoxProps} />
    </>
  );
};

export default MainImage;
