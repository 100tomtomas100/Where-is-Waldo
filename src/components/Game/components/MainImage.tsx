import { useEffect, useRef, useState } from "react";
import FindBox from "./FindBox";


const MainImage = (img: { img: string }): JSX.Element => {
  const [cursorClass, SetCursorClass] = useState<string>("");
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

  const circle: HTMLElement | null = document.getElementById("circle");
  const imgName: string = img.img.split(/[/.]+/)[3];

  // add and remove circle depending if the mouse pointer is over the picture
  useEffect(() => {
    cursorClass
      ? circle?.classList.add(cursorClass)
      : circle?.removeAttribute("class");
  }, [cursorClass, circle]);

  const handleMouseOver = (): void => {
    SetCursorClass("circle");
  };
  const handleMouseOut = (): void => {
    SetCursorClass("");
  };

  const handleClick = (e: React.MouseEvent): void => {
    const circleWidth = circle?.clientWidth;

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
          ? (e.nativeEvent.offsetX - (circleWidth ? circleWidth / 2 : 1)) /
            imageRef.current?.width
          : 1,
        y: imageRef.current
          ? (e.nativeEvent.offsetY - (circleWidth ? circleWidth / 2 : 1)) /
            imageRef.current?.height
          : 1,
      },
      max: {
        x: imageRef.current
          ? (e.nativeEvent.offsetX + (circleWidth ? circleWidth / 2 : 1)) /
            imageRef.current?.width
          : 1,
        y: imageRef.current
          ? (e.nativeEvent.offsetY + (circleWidth ? circleWidth / 2 : 1)) /
            imageRef.current?.height
          : 1,
      },
    });
  };

  const findBoxProps = {
    imgName: imgName,
    show: hideFindBox,
    coo: coo,
    ratio: ratioClickImage,
    hideBox: ():void => {
      SetHideFindBox("none");
    },
  };

  return (
    <>
      <img
        ref={imageRef}
        src={img.img}
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
