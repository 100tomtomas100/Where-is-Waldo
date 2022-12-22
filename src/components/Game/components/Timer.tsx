import { useEffect, useState } from "react";
import "./Timer.css";

type timerProps ={
  timeStart: Date,
  stopTimer: boolean
}
const Timer = ({...props}:timerProps): JSX.Element => {
  const [counter, SetCounter] = useState<string>("00:00:00");

  useEffect(() => {
    setTimeout(() => {
      const timeNow: Date = new Date();
      const timePassed: number = timeNow.getTime() - props.timeStart.getTime();
      const hours: number = Math.floor(timePassed / 3600000);
      const minutes: number = Math.floor(timePassed / 60000) % 60;
      const seconds: number = Math.floor(timePassed / 1000) % 60;

      SetCounter(
        `${hours <= 9 ? "0" + hours : hours}:${
          minutes <= 9 ? "0" + minutes : minutes
        }:${seconds <= 9 ? "0" + seconds : seconds}`.toString()
      );
    }, 1000);
  }, [counter, props.timeStart]);

  return <div className="time-counter">{props.stopTimer? "": counter}</div>;
};

export default Timer;
