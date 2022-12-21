import useMousePosition from "./UseMousePosition";
import "./Cursor.css";

const Cursor = (): JSX.Element => {
    
    const {x, y}:{x:string, y:string} = useMousePosition();    
    
    return (
        <div id="circle" style={{left: `${x}`, top: `${y}`}} ></div>
    )

}

export default Cursor 