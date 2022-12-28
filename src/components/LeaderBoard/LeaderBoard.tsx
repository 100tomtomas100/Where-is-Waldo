import Header from "../common/Header";
import "./LeaderBoard.css";
import SelectWorld from "./SelectWorld";
import { useEffect, useState } from "react";
import { database } from "../../firebase";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { useContext } from "react";
import Storage from "../common/Storage";

const LeaderBoard = (): JSX.Element => {
  const [allData, SetAllData] = useState<{ [key: string]: any }>({});
  const [sortedIndexes, SetSortedIndexes] = useState<number[]>([]);

  const { selectedMap, SetSelectedMap } = useContext(Storage);

  useEffect(() => {
    const dataRef = ref(database, `leaderboard`);
    onValue(dataRef, (snapshot: DataSnapshot) => {
      const data: { [key: string]: any } = snapshot.val();
      SetAllData(data);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(allData).length > 0) {
      const keys: string[] = Object.keys(allData[selectedMap]);
      let times: number[] = [];
      const sorted = (): number[] => {
        const copy = times.map((time) => time);
        return copy.sort(function (a: number, b: number) {
          return a - b;
        });
      };
      keys.forEach((key) => {
        const time: number = allData[selectedMap][key]["finishTime"];
        times.push(time);
      });
      let indexes: number[] = [];
      sorted().forEach((index) => {
        indexes.push(times.indexOf(index));
      });
      SetSortedIndexes([...indexes]);
    }
  }, [selectedMap, allData]);

  const finishTime = (timePassed: number): string => {
    const hours: number = Math.floor(timePassed / 3600000);
    const minutes: number = Math.floor(timePassed / 60000) % 60;
    const seconds: number = Math.floor(timePassed / 1000) % 60;
    const milSeconds: number = Math.floor(timePassed) % 1000;
    return `${hours <= 9 ? "0" + hours : hours}:${
      minutes <= 9 ? "0" + minutes : minutes
    }:${seconds <= 9 ? "0" + seconds : seconds}.${
      milSeconds <= 9 ? "0" + milSeconds : milSeconds
    }`.toString();
  };

  type headerPropsTypes = {
    buttonTitle: string;
    directTo: string;
  };
  const headerProps: headerPropsTypes = {
    buttonTitle: "NEW GAME",
    directTo: "/choose-map",
  };

  type selectWorldPropsTypes = {
    setSelectedMap: Function;
    selectedMap: string;
  };
  const selectWorldProps: selectWorldPropsTypes = {
    setSelectedMap: (map: string): void => {
      SetSelectedMap(map);
    },
    selectedMap: selectedMap,
  };

  return (
    <>
      <Header {...headerProps} />
      <SelectWorld {...selectWorldProps} />
      <div className="leader-board-table-wrapper">
        <table className="leader-board-table">
          <thead>
            <tr>
              <th className="leader-board-table-header">Place</th>
              <th className="leader-board-table-header">Finish Time</th>
              <th className="leader-board-table-header">Name</th>
              <th className="leader-board-table-header">Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(allData).length > 0 &&
            sortedIndexes.length ===
              Object.keys(allData[selectedMap]).length ? (
              sortedIndexes.map((index) => {
                const player = Object.keys(allData[selectedMap])[index];
                const date = new Date(
                  Number(allData[selectedMap][player]["date"])
                );
                const placeNumber = sortedIndexes.indexOf(index) + 1

                return (
                  <tr
                    key={Object.keys(allData[selectedMap])[index]}
                    className={`leader-board-table-row ${placeNumber < 4? "leader": ""}`}
                  >
                    <td>{placeNumber}</td>
                    <td>
                      {finishTime(allData[selectedMap][player]["finishTime"])}
                    </td>
                    <td>{allData[selectedMap][player]["name"]}</td>
                    <td>{date.toLocaleString("en-GB")}</td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default LeaderBoard;
