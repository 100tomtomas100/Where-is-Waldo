import { useEffect, useState } from "react";

const useMousePosition = () => {
    const [mousePosition, SetMousePosition] = useState({x: "", y: ""});

    useEffect(() => {
        const mouseMoveHandler = (e: MouseEvent): void =>{
            SetMousePosition({
            x: e.clientX + "px",
            y: e.clientY + "px"
            })   
        } 
        document.addEventListener("mousemove", mouseMoveHandler)
        
        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler)
        }
    },[])
    return mousePosition;
}


export default useMousePosition;