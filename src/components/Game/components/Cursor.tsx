import useMousePosition from "./UseMousePosition";
import "./Cursor.css";
import { useEffect, useRef} from "react";

type propsTypes = {
    cursorClass: string,
    getCursorWidth: Function
}

const Cursor = ({...props}: propsTypes): JSX.Element => {
    const cursorRef = useRef<HTMLImageElement | null>(null);
    const {x, y}:{x:string, y:string} = useMousePosition();   
    
    useEffect(()=> {
         props.getCursorWidth(cursorRef.current?.clientWidth)
    },[cursorRef.current?.clientWidth, props])
   
    return (
        <div id="circle" style={{left: `${x}`, top: `${y}`}} ref={cursorRef} className={props.cursorClass}></div>
    )

}

export default Cursor 