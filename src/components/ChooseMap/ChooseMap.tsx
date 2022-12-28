import "./ChooseMap.css"
import Header from "../common/Header"
import map from "../../images/mini-maps/mini-map.jpg"
import map1 from "../../images/mini-maps/mini-map1.jpg"
import map2 from "../../images/mini-maps/mini-map2.jpg"
import map3 from "../../images/mini-maps/mini-map3.jpg"
import map4 from "../../images/mini-maps/mini-map4.jpg"
import  { useContext } from "react";
import Storage from "../common/Storage";
import { useNavigate } from "react-router-dom";


const ChooseMap = (): JSX.Element => {
    const allMaps = [map, map1, map2, map3, map4]
    const navigate = useNavigate()

    const {SetSelectedMap} = useContext(Storage)


    const handleClick = (e: React.MouseEvent<HTMLImageElement>):void => {
        SetSelectedMap((e.target as HTMLInputElement).id)
        navigate("/game")
    }

    const getImgId = (imgName: string): string => {
        let name = imgName.split(/[/.]+/)[3]
        name = name.split(/[-]+/)[1]
        return name
    }

    type headerPropsTypes = {
        buttonTitle: string,
        text: string
    }
    const headerProps: headerPropsTypes ={
        buttonTitle: "RANDOM",
        text: "CHOOSE THE GAME"
    }

    return (
        <>
            <Header {...headerProps} />    
            <div className="all-maps">                
                {allMaps.map(map => {
                    return(
                        <img src={map} alt="map" id={getImgId(map)} key={map} onClick={handleClick}/>
                    )
                })}
            </div>           
        </>
    )
}

export default ChooseMap