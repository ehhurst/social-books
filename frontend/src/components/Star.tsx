import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Star = ({filled} : {filled:boolean}) => {
    return(   
        <span>
            {filled ? <FontAwesomeIcon icon={"star"} /> : <FontAwesomeIcon icon={'star'}/> }
        </span>);
};

export default Star;