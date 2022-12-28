import { useEffect, useState } from "react"
import "./GameOver.css"

import {ref, set} from "firebase/database"
import { database } from "../../../firebase";
import { useNavigate } from "react-router-dom";

type gameOverProps = {
    victory: boolean,
    timeStart: Date,
    mapName: string
}

const GameOver = ({...props}: gameOverProps): JSX.Element => {
    const [timeFinish, SetTimeFinish] = useState<Date>(new Date(0))
    const [inputText, SetInputText] = useState<string>("")
    const [finishTime, SetFinishTime] = useState<string>("")
    const [finishTimeMil, SetFinishTimeMil] = useState<number>(0)

    const navigate = useNavigate()

    useEffect(()=>{
        if(props.victory){
           SetTimeFinish(new Date()) 
        }        
    }, [props.victory])

    useEffect(() => {
        SetFinishTime(()=> {
            const timePassed: number = timeFinish.getTime() - props.timeStart.getTime();
            SetFinishTimeMil(timePassed)
            const hours: number = Math.floor(timePassed / 3600000);
            const minutes: number = Math.floor(timePassed / 60000) % 60;
            const seconds: number = Math.floor(timePassed / 1000) % 60;
            return (
                `${hours <= 9 ? "0" + hours : hours}:${
                    minutes <= 9 ? "0" + minutes : minutes
                }:${seconds <= 9 ? "0" + seconds : seconds}`.toString()
            ) 
        })
    }, [timeFinish])

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        SetInputText((e.target as HTMLInputElement).value)
    }

    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        const date = new Date
        const id = date.getTime()
        set(ref(database, `leaderboard/${props.mapName}/${id}`), {
            id: `${id}`,
            name: inputText,
            finishTime: finishTimeMil,
            date: `${id}`
        })
        navigate("/leader-board")
    }

    return (
        <div className="game-over" style={{display: `${props.victory? "block": "none"}`}}>
           <form action=""className="game-over-wrapper" onSubmit={handleSubmit}>
                <p className="finished">Your Time</p>
                <p className="finished">{finishTime}</p>                
                <input type="text" name="name" id="name-input" placeholder="Please write your name"
                 value={inputText} onChange={handleInputChange} required/><br />
                <button type="submit" className="name-submit">Submit</button>
            </form>            
        </div>
    )
}

export default GameOver