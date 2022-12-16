import "./ButtonChoice.css";

import { Link } from "react-router-dom";

interface Props {
  link: string;
  title: string;
  image: string;
}

const ButtonChoice = ({ ...props }: Props): JSX.Element => {
  return (
  <Link to={props.link} className="start-button-link">
    <button className="start-button" style={{background: `url(${props.image})`, backgroundSize: "cover"}}>      
      {props.title}
    </button>
    </Link>
  );
};

export default ButtonChoice;
