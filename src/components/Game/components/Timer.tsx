import { useEffect, useState } from "react";
import "./Timer.css";

const Timer = (timeStart: { timeStart: Date }): JSX.Element => {
  const [counter, SetCounter] = useState<string>("00:00:00");

  useEffect(() => {
    setTimeout(() => {
      const timeNow: Date = new Date();
      const timePassed: number = timeNow.getTime() - timeStart.timeStart.getTime();
      const hours: number = Math.floor(timePassed / 3600000);
      const minutes: number = Math.floor(timePassed / 60000) % 60;
      const seconds: number = Math.floor(timePassed / 1000) % 60;

      SetCounter(
        `${hours <= 9 ? "0" + hours : hours}:${
          minutes <= 9 ? "0" + minutes : minutes
        }:${seconds <= 9 ? "0" + seconds : seconds}`.toString()
      );
    }, 1000);
  }, [counter, timeStart.timeStart]);

  return <div className="time-counter">{counter}</div>;
};

export default Timer;
