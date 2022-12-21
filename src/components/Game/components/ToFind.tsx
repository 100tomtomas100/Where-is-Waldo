import waldo from "../../../images/waldo.png";
import wilma from "../../../images/wilma.png";
import wizard from "../../../images/wizard.png";

import "./ToFind.css";

const ToFind = (): JSX.Element => {
    return (
        <div className="searching">
        <div>Searching for!</div>
        <div className="to-find">
            <img src={waldo} id="wally" alt="waldo" className="to-find-img" />
            <img src={wilma} id="wilma" alt="wilma" className="to-find-img" />
            <img src={wizard} id="wizard" alt="wizard" className="to-find-img" />
        </div>
        </div>
    )
}

export default ToFind