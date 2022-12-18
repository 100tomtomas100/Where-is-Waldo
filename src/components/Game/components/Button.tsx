import "./Button.css";

import { Link } from "react-router-dom";

type Props ={
    to: string,
    title: string
}
const Button = ({...props}: Props) => {

    return (
        <Link to={props.to}>
            <button className="return-button">{props.title}</button>
        </Link>
    )
}

export default Button;