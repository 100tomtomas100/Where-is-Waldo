import { useEffect, useState } from "react"
import "./GameOver.css"


const GameOver = ({...props}: {victory: boolean, timeStart: Date}): JSX.Element => {
    const [timeFinish, SetTimeFinish] = useState<Date>(new Date(0))

    useEffect(()=>{
        if(props.victory){
           SetTimeFinish(new Date()) 
        }        
    }, [props.victory])

    const finishTime = () => {
        const timePassed: number = timeFinish.getTime() - props.timeStart.getTime();
        const hours: number = Math.floor(timePassed / 3600000);
        const minutes: number = Math.floor(timePassed / 60000) % 60;
        const seconds: number = Math.floor(timePassed / 1000) % 60;
        return (
            `${hours <= 9 ? "0" + hours : hours}:${
                minutes <= 9 ? "0" + minutes : minutes
              }:${seconds <= 9 ? "0" + seconds : seconds}`.toString()
        )
    }

    return (
        <div className="game-over" style={{display: `${props.victory? "block": "none"}`}}>
            <div className="game-over-wrapper">
                <p className="finished">Your Time</p>
                <p className="finished">{finishTime()}</p>
                <input type="text" name="name" id="name-input" placeholder="Please write your name"/><br />
                <button type="submit" className="name-submit">Submit</button>
            </div>
        </div>
    )
}

export default GameOver