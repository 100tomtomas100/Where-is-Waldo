import "./SelectWorld.css";
import map from "../../images/mini-maps/mini-map.jpg";
import map1 from "../../images/mini-maps/mini-map1.jpg";
import map2 from "../../images/mini-maps/mini-map2.jpg";
import map3 from "../../images/mini-maps/mini-map3.jpg";
import map4 from "../../images/mini-maps/mini-map4.jpg";

type props = {
  setSelectedMap: Function;
  selectedMap: string;
};
const SelectWorld = ({ ...props }: props): JSX.Element => {
  const allMaps = [map, map1, map2, map3, map4];

  const handleClick = (e: React.MouseEvent<HTMLImageElement>): void => {
    props.setSelectedMap((e.target as HTMLInputElement).id);
  };

  const getImgId = (imgName: string): string => {
    let name = imgName.split(/[/.]+/)[3];
    name = name.split(/[-]+/)[1];
    return name;
  };

  return (
    <div className="leader-board-maps">
      {allMaps.map((map) => {
        return (
          <img
            src={map}
            alt="map"
            className={`leader-board-img ${
              getImgId(map) === props.selectedMap ? "chosen" : ""
            }`}
            id={getImgId(map)}
            key={map}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};

export default SelectWorld;
